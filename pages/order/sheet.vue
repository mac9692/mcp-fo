<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 페이지 헤더 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">주문서 작성</h1>
        <p class="mt-2 text-gray-600">배송지 정보와 결제 방법을 입력해주세요.</p>
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
                  <h3 class="text-sm font-medium text-gray-900">{{ item.name }}</h3>
                  <p class="text-sm text-gray-500">{{ item.category }}</p>
                  <p class="text-sm text-gray-500">수량: {{ item.quantity }}개</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">₩{{ (item.price * item.quantity).toLocaleString() }}</p>
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <!-- 배송지 정보 -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900">배송지 정보</h2>
              <button
                @click="copyOrdererInfo"
                class="text-sm text-blue-600 hover:text-blue-700"
              >
                주문자 정보와 동일
              </button>
            </div>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">수령인 *</label>
                  <input
                    type="text"
                    v-model="orderForm.shipping.name"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">연락처 *</label>
                  <input
                    type="tel"
                    v-model="orderForm.shipping.phone"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div class="flex space-x-2">
                <input
                  type="text"
                  v-model="orderForm.shipping.zipcode"
                  placeholder="우편번호"
                  readonly
                  class="w-32 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
                <button class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  우편번호 검색
                </button>
              </div>
              <input
                type="text"
                v-model="orderForm.shipping.address"
                placeholder="기본주소"
                readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <input
                type="text"
                v-model="orderForm.shipping.detailAddress"
                placeholder="상세주소를 입력해주세요"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                v-model="orderForm.shipping.message"
                placeholder="배송 요청사항을 입력해주세요 (선택)"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>
          </div>

          <!-- 결제 방법 -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">결제 방법</h2>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    v-model="orderForm.payment.method"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-3 text-sm font-medium text-gray-900">무통장입금</span>
                </label>
                <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="kakaopay"
                    v-model="orderForm.payment.method"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-3 text-sm font-medium text-gray-900">카카오페이</span>
                </label>
              </div>

              <!-- 무통장입금 정보 -->
              <div v-if="orderForm.payment.method === 'transfer'" class="p-4 bg-gray-50 rounded-lg">
                <h3 class="text-sm font-medium text-gray-900 mb-2">입금 계좌 정보</h3>
                <p class="text-sm text-gray-600">국민은행 123-456-789012 (주)MCP</p>
                <p class="text-sm text-gray-500 mt-1">* 주문 후 3일 이내 입금해주세요.</p>
              </div>
            </div>
          </div>

          <!-- 쿠폰 및 적립금 -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">할인 혜택</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">쿠폰 적용</label>
                <div class="flex space-x-2">
                  <select class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">쿠폰을 선택해주세요</option>
                    <option value="welcome">신규회원 10% 할인 쿠폰</option>
                    <option value="birthday">생일 축하 5,000원 할인 쿠폰</option>
                  </select>
                  <button class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    적용
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">적립금 사용</label>
                <div class="flex space-x-2">
                  <input
                    type="number"
                    v-model="orderForm.discount.points"
                    placeholder="0"
                    min="0"
                    :max="availablePoints"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    @click="useAllPoints"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    전액사용
                  </button>
                </div>
                <p class="text-sm text-gray-500 mt-1">사용 가능한 적립금: {{ availablePoints.toLocaleString() }}P</p>
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
                <span class="font-medium">₩{{ subtotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">배송비</span>
                <span class="font-medium">{{ shippingFee === 0 ? '무료' : `₩${shippingFee.toLocaleString()}` }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">쿠폰할인</span>
                <span class="font-medium text-red-600">-₩{{ couponDiscount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">적립금 사용</span>
                <span class="font-medium text-red-600">-₩{{ (orderForm.discount.points || 0).toLocaleString() }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between">
                  <span class="text-lg font-semibold text-gray-900">최종 결제금액</span>
                  <span class="text-lg font-bold text-blue-600">₩{{ finalAmount.toLocaleString() }}</span>
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
              @click="submitOrder"
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 인증 미들웨어 적용
definePageMeta({
  middleware: ['auth']
})

// 주문 상품 데이터 (장바구니에서 전달받은 데이터)
const orderItems = ref([
  {
    id: 1,
    name: '프리미엄 무선 헤드폰',
    category: '전자제품',
    price: 159000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: '스마트 워치',
    category: '웨어러블',
    price: 299000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
])

// 주문 폼 데이터
const orderForm = ref({
  orderer: {
    name: '',
    phone: '',
    email: ''
  },
  shipping: {
    name: '',
    phone: '',
    zipcode: '',
    address: '',
    detailAddress: '',
    message: ''
  },
  payment: {
    method: 'card'
  },
  discount: {
    coupon: '',
    points: 0
  }
})

// 약관 동의
const agreements = ref({
  terms: false,
  privacy: false,
  age: false
})

// 사용 가능한 적립금
const availablePoints = ref(15000)
const couponDiscount = ref(0)

// 계산된 속성들
const subtotal = computed(() => {
  return orderItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const shippingFee = computed(() => subtotal.value >= 50000 ? 0 : 3000)

const finalAmount = computed(() => {
  return Math.max(0, subtotal.value + shippingFee.value - couponDiscount.value - (orderForm.value.discount.points || 0))
})

const canSubmitOrder = computed(() => {
  return (
    orderForm.value.orderer.name &&
    orderForm.value.orderer.phone &&
    orderForm.value.orderer.email &&
    orderForm.value.shipping.name &&
    orderForm.value.shipping.phone &&
    orderForm.value.shipping.detailAddress &&
    orderForm.value.payment.method &&
    agreements.value.terms &&
    agreements.value.privacy &&
    agreements.value.age
  )
})

// 메서드들
const copyOrdererInfo = () => {
  orderForm.value.shipping.name = orderForm.value.orderer.name
  orderForm.value.shipping.phone = orderForm.value.orderer.phone
}

const useAllPoints = () => {
  orderForm.value.discount.points = Math.min(availablePoints.value, finalAmount.value)
}

const submitOrder = () => {
  if (canSubmitOrder.value) {
    alert('주문이 완료되었습니다!')
    // 여기서 실제 주문 처리 로직을 구현
  }
}
</script>