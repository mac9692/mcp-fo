import type {
  PaymentRequest,
  PaymentParameterResponse,
  InicisPaymentData,
  TossPaymentData,
  NicePaymentData
} from '~/types/payment'

export const usePayment = () => {
  const { getPaymentParameters } = usePaymentApi()

  // 결제 요청 검증
  const validatePaymentRequest = (request: PaymentRequest): boolean => {
    if (!request.amount || request.amount <= 0) {
      alert('결제 금액이 올바르지 않습니다.')
      return false
    }

    if (!request.productName?.trim()) {
      alert('상품명을 입력해주세요.')
      return false
    }

    if (!request.buyerName?.trim()) {
      alert('주문자 이름을 입력해주세요.')
      return false
    }

    if (!request.buyerEmail?.trim() || !isValidEmail(request.buyerEmail)) {
      alert('올바른 이메일 주소를 입력해주세요.')
      return false
    }

    if (!request.buyerTel?.trim()) {
      alert('연락처를 입력해주세요.')
      return false
    }

    return true
  }

  // 이메일 유효성 검증
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // 고유 주문번호 생성
  const generateMerchantUid = (): string => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `ORDER_${timestamp}_${random}`
  }

  // 이니시스 결제 처리
  const processInicisPayment = async (params: PaymentParameterResponse, request: PaymentRequest) => {
    const paymentData: InicisPaymentData = {
      version: '1.0',
      gopaymethod: 'Card',
      mid: params.mid,
      oid: request.merchantUid,
      price: request.amount,
      timestamp: params.timestamp,
      signature: params.signature,
      verification: params.verification,
      mKey: params.mKey,
      currency: 'WON',
      goodname: request.productName,
      buyername: request.buyerName,
      buyertel: request.buyerTel,
      buyeremail: request.buyerEmail,
      returnUrl: request.successUrl,
      closeUrl: request.failUrl,
      acceptmethod: 'below1000:no' // 1000원 이하 결제 불가
    }

    // 이니시스 결제 페이지로 이동
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = params.paymentUrl
    form.target = '_blank'

    Object.entries(paymentData).forEach(([key, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = String(value)
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }

  // 토스 결제 처리
  const processTossPayment = async (params: PaymentParameterResponse, request: PaymentRequest) => {
    const paymentData: TossPaymentData = {
      clientKey: params.mid,
      amount: request.amount,
      orderId: request.merchantUid,
      orderName: request.productName,
      customerName: request.buyerName,
      customerEmail: request.buyerEmail,
      customerMobilePhone: request.buyerTel,
      successUrl: request.successUrl,
      failUrl: request.failUrl,
      timestamp: params.timestamp,
      signature: params.signature
    }

    // 토스페이먼츠 SDK 로드 및 결제 호출
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://js.tosspayments.com/v1/payment'
      script.onload = () => {
        // @ts-ignore
        const tossPayments = TossPayments(paymentData.clientKey)
        tossPayments.requestPayment('카드', {
          amount: paymentData.amount,
          orderId: paymentData.orderId,
          orderName: paymentData.orderName,
          customerName: paymentData.customerName,
          customerEmail: paymentData.customerEmail,
          customerMobilePhone: paymentData.customerMobilePhone,
          successUrl: paymentData.successUrl,
          failUrl: paymentData.failUrl
        })
      }
      document.head.appendChild(script)
    }
  }

  // 나이스페이 결제 처리
  const processNicePayment = async (params: PaymentParameterResponse, request: PaymentRequest) => {
    const paymentData: NicePaymentData = {
      PayMethod: 'CARD',
      GoodsName: request.productName,
      Amt: request.amount,
      MID: params.mid,
      Moid: request.merchantUid,
      BuyerName: request.buyerName,
      BuyerTel: request.buyerTel,
      BuyerEmail: request.buyerEmail,
      ReturnURL: request.successUrl,
      VbankExpDate: '',
      MallUserID: 'guest',
      timestamp: params.timestamp,
      signature: params.signature,
      verification: params.verification
    }

    // 나이스페이 결제 페이지로 이동
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = params.paymentUrl
    form.target = '_blank'

    Object.entries(paymentData).forEach(([key, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = String(value)
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }

  // 메인 결제 처리 함수
  const processPayment = async (request: PaymentRequest) => {
    try {
      // 1. 결제 요청 검증
      if (!validatePaymentRequest(request)) {
        return
      }

      // 2. 고유 주문번호 생성
      request.merchantUid = generateMerchantUid()

      // 3. 결제 파라미터 조회 API 호출
      const paymentParams = await getPaymentParameters(request)

      // 4. PG사별 결제 처리
      switch (paymentParams.pgCode) {
        case '10': // 이니시스
          await processInicisPayment(paymentParams, request)
          break
        case '20': // 나이스페이
          await processNicePayment(paymentParams, request)
          break
        case '30': // 토스페이
          await processTossPayment(paymentParams, request)
          break
        default:
          throw new Error('지원하지 않는 PG사입니다.')
      }

    } catch (error) {
      console.error('결제 처리 중 오류:', error)
      alert('결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  return {
    processPayment,
    validatePaymentRequest,
    generateMerchantUid
  }
}