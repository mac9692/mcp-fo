import type { PaymentRequest, PaymentParameterResponse } from '~/types/payment'

export const usePaymentApi = () => {
  const config = useRuntimeConfig()

  const getPaymentParameters = async (paymentRequest: PaymentRequest): Promise<PaymentParameterResponse> => {
    try {
      console.log('결제 파라미터 API 호출 시작:', {
        baseURL: config.public.apiBaseUrl,
        endpoint: '/api/payment/parameters',
        request: paymentRequest
      })

      const data = await $fetch<PaymentParameterResponse>('/api/payment/parameters', {
        method: 'POST',
        baseURL: config.public.apiBaseUrl || 'http://localhost:8080',
        body: paymentRequest,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('결제 파라미터 API 응답 성공:', data)
      return data
    } catch (error: any) {
      console.error('결제 파라미터 조회 실패:', error)

      let errorMessage = '결제 파라미터 조회에 실패했습니다.'

      if (error?.response?.status === 404) {
        errorMessage = '결제 서비스를 찾을 수 없습니다.'
      } else if (error?.response?.status === 500) {
        errorMessage = '결제 서버 오류가 발생했습니다.'
      } else if (error?.message) {
        errorMessage = `결제 파라미터 조회 실패: ${error.message}`
      }

      throw new Error(errorMessage)
    }
  }

  return {
    getPaymentParameters
  }
}