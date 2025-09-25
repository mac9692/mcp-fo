<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 페이지 헤더 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">주문서</h1>
        <p class="mt-2 text-gray-600">결제 정보를 입력해주세요.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 주문 정보 입력 -->
        <div class="lg:col-span-2 space-y-8">
          <!-- 주문 상품 정보 -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">주문 상품</h2>
            <div class="space-y-4">
              <div v-for="item in orderItems" :key="item.id" class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg" />
                <div class="flex-1">
                  <div class="mb-2">
                    <label class="block text-xs font-medium text-gray-700 mb-1">상품명:</label>
                    <input
                      type="text"
                      v-model="item.name"
                      class="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p class="text-sm text-gray-500">{{ item.category }}</p>
                  <div class="flex items-center mt-2">
                    <span class="text-sm text-gray-500 mr-4">수량:</span>
                    <div class="flex items-center space-x-2">
                      <button
                        @click="decreaseQuantity(item)"
                        class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="item.quantity <= 1"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <input
                        type="number"
                        v-model="item.quantity"
                        @blur="validateQuantity(item)"
                        min="1"
                        class="w-16 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        @click="increaseQuantity(item)"
                        class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="mt-2">
                    <span class="text-sm text-gray-500 mr-4">단가:</span>
                    <input
                      type="number"
                      v-model="item.price"
                      @blur="validatePrice(item)"
                      min="0"
                      class="border border-gray-300 rounded px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />원
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">{{ (item.price * item.quantity).toLocaleString() }}원</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 주문자 정보 -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">주문자 정보</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
                <input
                  type="text"
                  v-model="orderForm.orderer.name"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">연락처 *</label>
                <input
                  type="tel"
                  v-model="orderForm.orderer.phone"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                <input
                  type="email"
                  v-model="orderForm.orderer.email"
                  required
                  class="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>


          <!-- 결제 방법 -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">결제 방법</h2>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    v-model="orderForm.payment.method"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-3 text-sm font-medium text-gray-900">신용/체크카드</span>
                </label>
              </div>

            </div>
          </div>

          <!-- 할인 혜택 -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">할인 혜택</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Point</label>
                <div class="flex space-x-2">
                  <input
                    type="number"
                    v-model="orderForm.discount.points"
                    @input="validatePointUsage"
                    placeholder="0"
                    min="0"
                    :max="Math.min(userPoints, finalAmountBeforeDiscount)"
                    class="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    @click="useAllPoints"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    전액사용
                  </button>
                </div>
                <p class="text-sm text-gray-500 mt-1">보유 Point: {{ userPoints.toLocaleString() }}P</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Coin</label>
                <div class="flex space-x-2">
                  <input
                    type="number"
                    v-model="orderForm.discount.coins"
                    @input="validateCoinUsage"
                    placeholder="0"
                    min="0"
                    :max="Math.min(userCoins, finalAmountBeforeDiscount - (orderForm.discount.points || 0))"
                    class="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    @click="useAllCoins"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    전액사용
                  </button>
                </div>
                <p class="text-sm text-gray-500 mt-1">보유 Coin: {{ userCoins.toLocaleString() }}C</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 결제 금액 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6 sticky top-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">결제 금액</h2>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">상품금액</span>
                <span class="font-medium">{{ subtotal.toLocaleString() }}원</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">배송비</span>
                <span class="font-medium">{{ shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원` }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Point</span>
                <span class="font-medium text-red-600">-{{ (orderForm.discount.points || 0).toLocaleString() }}원</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Coin</span>
                <span class="font-medium text-red-600">-{{ (orderForm.discount.coins || 0).toLocaleString() }}원</span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between">
                  <span class="text-lg font-semibold text-gray-900">최종 결제금액</span>
                  <span class="text-lg font-bold text-blue-600">{{ finalAmount.toLocaleString() }}원</span>
                </div>
              </div>
            </div>

            <!-- 적립 예정 포인트 -->
            <div class="mb-6 p-3 bg-blue-50 rounded-lg">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm text-blue-600 font-medium">적립 예정: {{ Math.floor(finalAmount * 0.01).toLocaleString() }}P</span>
              </div>
            </div>

            <!-- 약관 동의 -->
            <div class="space-y-3 mb-6">
              <label class="flex items-start">
                <input
                  type="checkbox"
                  v-model="agreements.terms"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                />
                <span class="ml-2 text-sm text-gray-700">
                  주문 내용을 확인했으며, <a href="#" class="text-blue-600 hover:underline">이용약관</a>에 동의합니다.
                </span>
              </label>
              <label class="flex items-start">
                <input
                  type="checkbox"
                  v-model="agreements.privacy"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                />
                <span class="ml-2 text-sm text-gray-700">
                  <a href="#" class="text-blue-600 hover:underline">개인정보 수집·이용</a>에 동의합니다.
                </span>
              </label>
              <label class="flex items-start">
                <input
                  type="checkbox"
                  v-model="agreements.age"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                />
                <span class="ml-2 text-sm text-gray-700">
                  만 14세 이상입니다.
                </span>
              </label>
            </div>

            <!-- 주문 완료 버튼 -->
            <button
              @click="pay"
              :disabled="!canSubmitOrder"
              :class="[
                'w-full py-3 px-4 rounded-lg font-medium transition-colors duration-300',
                canSubmitOrder
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              {{ finalAmount.toLocaleString() }}원 결제하기
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 결제 검증 실패 다이얼로그 -->
    <div v-if="showPaymentDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">결제 금액 오류</h3>
          <p class="text-sm text-gray-500 mb-6">결제금액은 100원 이상이어야합니다.</p>
          <button
            @click="closePaymentDialog"
            class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 인증 미들웨어 적용
definePageMeta({
  middleware: ['auth']
})

// 주문 상품 데이터 (프리미엄 무선 헤드폰만, 반응형 처리)
const orderItems = ref([
  {
    id: 1,
    name: '프리미엄 무선 헤드폰',
    category: '전자제품',
    price: 1000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
])

// 주문 폼 데이터
const orderForm = ref({
  orderer: {
    name: '',
    phone: '',
    email: ''
  },
  payment: {
    method: 'card'
  },
  discount: {
    points: 0,
    coins: 0
  }
})

// 약관 동의
const agreements = ref({
  terms: false,
  privacy: false,
  age: false
})

// 다이얼로그 상태
const showPaymentDialog = ref(false)

// 사용자 자산 정보
const userPoints = ref(0)
const userCoins = ref(0)
const loading = ref(true)
const error = ref('')

// API 호출 및 인증
const { getUserInfo } = useUserApi()
const { getUserIdFromToken } = useAuth()
const { processPayment } = usePayment()

// 계산된 속성들
const subtotal = computed(() => {
  return orderItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const shippingFee = computed(() => 0)

const finalAmountBeforeDiscount = computed(() => {
  return subtotal.value + shippingFee.value
})

const finalAmount = computed(() => {
  return Math.max(0, finalAmountBeforeDiscount.value - (orderForm.value.discount.points || 0) - (orderForm.value.discount.coins || 0))
})

const canSubmitOrder = computed(() => {
  return (
    orderForm.value.orderer.name &&
    orderForm.value.orderer.phone &&
    orderForm.value.orderer.email &&
    orderForm.value.payment.method &&
    agreements.value.terms &&
    agreements.value.privacy &&
    agreements.value.age
  )
})

// 사용자 정보 로드 함수
const loadUserInfo = async () => {
  try {
    loading.value = true
    error.value = ''

    const userId = getUserIdFromToken()
    if (!userId) {
      error.value = '로그인 정보를 찾을 수 없습니다.'
      return
    }

    const response = await getUserInfo(userId)

    if (response.error) {
      error.value = response.error
      return
    }

    if (response.data) {
      const userInfo = response.data
      // 주문자 정보 기본값 설정
      orderForm.value.orderer = {
        name: userInfo.userNm,
        email: userInfo.userEmail,
        phone: userInfo.userPhone
      }

      // 사용자 자산 정보 설정
      userPoints.value = userInfo.pointBalance || 0
      userCoins.value = userInfo.coinBalance || 0
    }
  } catch (err) {
    error.value = '사용자 정보를 불러오는데 실패했습니다.'
  } finally {
    loading.value = false
  }
}

// 메서드들
const increaseQuantity = (item) => {
  item.quantity++
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  }
}

const validateQuantity = (item) => {
  if (item.quantity < 1) {
    item.quantity = 1
  }
}

const validatePrice = (item) => {
  if (item.price < 0) {
    item.price = 0
  }
}

const validatePointUsage = () => {
  const maxPoints = Math.min(userPoints.value, finalAmountBeforeDiscount.value - (orderForm.value.discount.coins || 0))
  if (orderForm.value.discount.points > maxPoints) {
    orderForm.value.discount.points = maxPoints
  }
  if (orderForm.value.discount.points < 0) {
    orderForm.value.discount.points = 0
  }
}

const validateCoinUsage = () => {
  const maxCoins = Math.min(userCoins.value, finalAmountBeforeDiscount.value - (orderForm.value.discount.points || 0))
  if (orderForm.value.discount.coins > maxCoins) {
    orderForm.value.discount.coins = maxCoins
  }
  if (orderForm.value.discount.coins < 0) {
    orderForm.value.discount.coins = 0
  }
}

const useAllPoints = () => {
  orderForm.value.discount.points = Math.min(userPoints.value, finalAmountBeforeDiscount.value - (orderForm.value.discount.coins || 0))
}

const useAllCoins = () => {
  orderForm.value.discount.coins = Math.min(userCoins.value, finalAmountBeforeDiscount.value - (orderForm.value.discount.points || 0))
}

// 결제 검증 함수
const paymentValidate = () => {
  if (finalAmount.value < 100) {
    showPaymentDialog.value = true
    return false
  }
  return true
}

// 결제 함수
const pay = () => {
  if (!canSubmitOrder.value) {
    return
  }

  if (!paymentValidate()) {
    return
  }

  // 결제 검증 통과 시 실제 결제 로직 실행
  submitOrder()
}

// 다이얼로그 닫기 함수
const closePaymentDialog = () => {
  showPaymentDialog.value = false
}

const submitOrder = async () => {
  try {
    // 결제 요청 데이터 구성
    const paymentRequest = {
      amount: finalAmount.value,
      productName: orderItems.value.map(item => item.name).join(', '),
      buyerName: orderForm.value.orderer.name,
      buyerEmail: orderForm.value.orderer.email,
      buyerTel: orderForm.value.orderer.phone,
      merchantUid: '', // usePayment에서 생성
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`
    }

    // 결제 처리
    await processPayment(paymentRequest)

  } catch (error) {
    console.error('주문 처리 중 오류:', error)
    alert('주문 처리 중 오류가 발생했습니다.')
  }
}

// 컴포넌트 마운트 시 사용자 정보 로드
onMounted(() => {
  loadUserInfo()
})
</script>