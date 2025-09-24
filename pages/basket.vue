<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 페이지 헤더 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">장바구니</h1>
        <p class="mt-2 text-gray-600">선택하신 상품들을 확인하고 주문을 진행하세요.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 장바구니 아이템 목록 -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900">상품 목록</h2>
                <button
                  @click="selectAll"
                  class="text-sm text-blue-600 hover:text-blue-700"
                >
                  {{ allSelected ? '전체 해제' : '전체 선택' }}
                </button>
              </div>
            </div>

            <div class="p-6">
              <!-- 장바구니가 비어있는 경우 -->
              <div v-if="basketItems.length === 0" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5-5M17 16a2 2 0 100 4 2 2 0 000-4zM9 16a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">장바구니가 비어있습니다</h3>
                <p class="mt-1 text-sm text-gray-500">마음에 드는 상품을 담아보세요!</p>
                <div class="mt-6">
                  <NuxtLink to="/" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    쇼핑 계속하기
                  </NuxtLink>
                </div>
              </div>

              <!-- 장바구니 아이템들 -->
              <div v-else class="space-y-6">
                <div
                  v-for="item in basketItems"
                  :key="item.id"
                  class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                >
                  <!-- 체크박스 -->
                  <input
                    type="checkbox"
                    v-model="item.selected"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />

                  <!-- 상품 이미지 -->
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-20 h-20 object-cover rounded-lg"
                  />

                  <!-- 상품 정보 -->
                  <div class="flex-1">
                    <h3 class="text-lg font-medium text-gray-900">{{ item.name }}</h3>
                    <p class="text-sm text-gray-500">{{ item.category }}</p>
                    <div class="mt-2">
                      <span v-if="item.originalPrice" class="text-sm text-gray-500 line-through mr-2">
                        ₩{{ item.originalPrice.toLocaleString() }}
                      </span>
                      <span class="text-lg font-bold text-gray-900">
                        ₩{{ item.price.toLocaleString() }}
                      </span>
                    </div>
                  </div>

                  <!-- 수량 조절 -->
                  <div class="flex items-center space-x-2">
                    <button
                      @click="decreaseQuantity(item)"
                      class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span class="w-12 text-center font-medium">{{ item.quantity }}</span>
                    <button
                      @click="increaseQuantity(item)"
                      class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>

                  <!-- 개별 총 가격 -->
                  <div class="text-right">
                    <p class="text-lg font-bold text-gray-900">
                      ₩{{ (item.price * item.quantity).toLocaleString() }}
                    </p>
                  </div>

                  <!-- 삭제 버튼 -->
                  <button
                    @click="removeItem(item.id)"
                    class="p-2 text-gray-400 hover:text-red-500"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 주문 요약 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6 sticky top-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">주문 요약</h2>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">상품금액</span>
                <span class="font-medium">₩{{ subtotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">할인금액</span>
                <span class="font-medium text-red-600">-₩{{ discount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">배송비</span>
                <span class="font-medium">{{ shippingFee === 0 ? '무료' : `₩${shippingFee.toLocaleString()}` }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between">
                  <span class="text-lg font-semibold text-gray-900">총 결제금액</span>
                  <span class="text-lg font-bold text-blue-600">₩{{ total.toLocaleString() }}</span>
                </div>
              </div>
            </div>

            <!-- 쿠폰 할인 -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">쿠폰 적용</label>
              <div class="flex space-x-2">
                <input
                  type="text"
                  placeholder="쿠폰번호를 입력하세요"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  적용
                </button>
              </div>
            </div>

            <!-- 주문 버튼들 -->
            <div class="space-y-3">
              <NuxtLink
                to="/order/sheet"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                :class="{ 'opacity-50 cursor-not-allowed': selectedItems.length === 0 }"
              >
                결제하기 ({{ selectedItems.length }}개 상품)
              </NuxtLink>
              <NuxtLink
                to="/"
                class="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
              >
                쇼핑 계속하기
              </NuxtLink>
            </div>

            <!-- 적립금 안내 -->
            <div class="mt-6 p-3 bg-blue-50 rounded-lg">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm text-blue-600 font-medium">적립 예정 포인트: {{ Math.floor(total * 0.01).toLocaleString() }}P</span>
              </div>
            </div>
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

// 장바구니 아이템 데이터
const basketItems = ref([
  {
    id: 1,
    name: '프리미엄 무선 헤드폰',
    category: '전자제품',
    price: 159000,
    originalPrice: 199000,
    quantity: 1,
    selected: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: '스마트 워치',
    category: '웨어러블',
    price: 299000,
    originalPrice: null,
    quantity: 1,
    selected: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: '노트북 백팩',
    category: '가방',
    price: 89000,
    originalPrice: 129000,
    quantity: 2,
    selected: false,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
])

// 계산된 속성들
const selectedItems = computed(() => basketItems.value.filter(item => item.selected))

const subtotal = computed(() => {
  return selectedItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const discount = computed(() => {
  return selectedItems.value.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity)
    }
    return sum
  }, 0)
})

const shippingFee = computed(() => subtotal.value >= 50000 ? 0 : 3000)

const total = computed(() => subtotal.value + shippingFee.value)

const allSelected = computed(() => {
  return basketItems.value.length > 0 && basketItems.value.every(item => item.selected)
})

// 메서드들
const selectAll = () => {
  const newState = !allSelected.value
  basketItems.value.forEach(item => {
    item.selected = newState
  })
}

const increaseQuantity = (item) => {
  item.quantity++
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  }
}

const removeItem = (itemId) => {
  basketItems.value = basketItems.value.filter(item => item.id !== itemId)
}
</script>