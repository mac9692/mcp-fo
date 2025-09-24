<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 페이지 헤더 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">마이페이지</h1>
        <p class="mt-2 text-gray-600">회원정보 및 주문내역을 확인하실 수 있습니다.</p>
      </div>

      <!-- 탭 네비게이션 -->
      <div class="mb-8">
        <nav class="flex space-x-8">
          <button
            @click="activeTab = 'profile'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            프로필 관리
          </button>
          <button
            @click="activeTab = 'orders'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'orders'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            주문내역
          </button>
        </nav>
      </div>

      <!-- 프로필 관리 탭 -->
      <div v-if="activeTab === 'profile'" class="space-y-6">
        <!-- 자산 정보 섹션 -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">자산 정보</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 포인트 카드 -->
            <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-blue-900">포인트</h3>
                  <p class="text-2xl font-bold text-blue-600 mt-2">{{ pointBalance.toLocaleString() }}P</p>
                </div>
                <div class="bg-blue-200 p-3 rounded-full">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- 코인 카드 -->
            <div class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-amber-900">코인</h3>
                  <p class="text-2xl font-bold text-amber-600 mt-2">{{ coinBalance.toLocaleString() }}C</p>
                </div>
                <div class="bg-amber-200 p-3 rounded-full">
                  <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 프로필 정보 섹션 -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">프로필 정보</h2>

          <!-- 로딩 상태 -->
          <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="ml-2 text-gray-600">사용자 정보를 불러오는 중...</span>
          </div>

          <!-- 에러 상태 -->
          <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">오류 발생</h3>
                <div class="mt-2 text-sm text-red-700">
                  <p>{{ error }}</p>
                </div>
                <div class="mt-4">
                  <button @click="loadUserInfo()" class="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200">
                    다시 시도
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 프로필 폼 -->
          <form v-else class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">이름</label>
                <input
                  type="text"
                  v-model="profile.name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <input
                  type="email"
                  v-model="profile.email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                <input
                  type="tel"
                  v-model="profile.phone"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">생년월일</label>
                <input
                  type="text"
                  v-model="profile.birthDate"
                  readonly
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">주소</label>
              <input
                type="text"
                v-model="profile.address"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="기본 배송지를 입력하세요"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">첫 로그인 일시</label>
              <input
                type="text"
                v-model="profile.firstLoginDate"
                readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
              />
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                정보 수정
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- 주문내역 탭 -->
      <div v-if="activeTab === 'orders'" class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">주문내역</h2>
        </div>

        <div class="p-6">
          <!-- 주문 목록 -->
          <div v-for="order in orders" :key="order.id" class="border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:mb-0">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900">주문번호: {{ order.orderNumber }}</h3>
                <p class="text-sm text-gray-500">{{ order.date }}</p>
              </div>
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                order.status === '배송완료'
                  ? 'bg-green-100 text-green-800'
                  : order.status === '배송중'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
              ]">
                {{ order.status }}
              </span>
            </div>

            <div class="space-y-3">
              <div v-for="item in order.items" :key="item.id" class="flex items-center space-x-4">
                <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg" />
                <div class="flex-1">
                  <h4 class="text-sm font-medium text-gray-900">{{ item.name }}</h4>
                  <p class="text-sm text-gray-500">수량: {{ item.quantity }}개</p>
                </div>
                <div class="text-sm font-medium text-gray-900">
                  ₩{{ item.price.toLocaleString() }}
                </div>
              </div>
            </div>

            <div class="mt-4 flex justify-between items-center">
              <span class="text-lg font-semibold text-gray-900">
                총 결제금액: ₩{{ order.total.toLocaleString() }}
              </span>
              <div class="space-x-2">
                <button class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  주문상세
                </button>
                <button v-if="order.status === '배송완료'" class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  후기작성
                </button>
              </div>
            </div>
          </div>

          <!-- 주문내역이 없는 경우 -->
          <div v-if="orders.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">주문내역이 없습니다</h3>
            <p class="mt-1 text-sm text-gray-500">첫 주문을 시작해보세요!</p>
            <div class="mt-6">
              <NuxtLink to="/" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                쇼핑하러 가기
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 인증 미들웨어 적용
definePageMeta({
  middleware: ['auth']
})

// 활성 탭 상태
const activeTab = ref('profile')

// 프로필 정보
const profile = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  birthDate: '',
  firstLoginDate: ''
})

// 자산 정보
const pointBalance = ref(0)
const coinBalance = ref(0)

// 로딩 상태
const loading = ref(true)
const error = ref('')

// API 호출 및 인증
const { getUserInfo } = useUserApi()
const { getUserIdFromToken } = useAuth()

// 사용자 정보 로드
const loadUserInfo = async () => {
  try {
    loading.value = true
    error.value = ''

    // JWT 토큰에서 userId 추출
    const userId = getUserIdFromToken()
    if (!userId) {
      error.value = '로그인 정보를 찾을 수 없습니다. 다시 로그인해주세요.'
      return
    }

    console.log('API 호출 시작: getUserInfo with userId=', userId)

    const response = await getUserInfo(userId)

    console.log('API 응답:', response)

    if (response.error) {
      error.value = response.error
      console.error('API 에러:', response.error)
      return
    }

    if (response.data) {
      const userInfo = response.data
      console.log('사용자 정보:', userInfo)

      profile.value = {
        name: userInfo.userNm,
        email: userInfo.userEmail,
        phone: userInfo.userPhone,
        address: '', // 주소는 아직 API에 없으므로 빈값
        birthDate: userInfo.userBirthDt,
        firstLoginDate: userInfo.userFirstLoginDtm || '로그인 이력 없음'
      }

      // 자산 정보 설정 (0이면 0으로 표시)
      pointBalance.value = userInfo.userPoint || 0
      coinBalance.value = userInfo.userCoin || 0

      console.log('프로필 설정 완료:', profile.value)
      console.log('자산 정보 설정 완료 - 포인트:', pointBalance.value, '코인:', coinBalance.value)
    } else {
      error.value = 'API에서 데이터를 받지 못했습니다.'
    }
  } catch (err) {
    error.value = '사용자 정보를 불러오는데 실패했습니다.'
    console.error('Error loading user info:', err)
  } finally {
    loading.value = false
  }
}

// 컴포넌트 마운트 시 사용자 정보 로드
onMounted(() => {
  loadUserInfo()
})

// 주문내역 샘플 데이터
const orders = ref([
  {
    id: 1,
    orderNumber: 'ORD20241201001',
    date: '2024년 12월 1일',
    status: '배송완료',
    total: 288000,
    items: [
      {
        id: 1,
        name: '프리미엄 무선 헤드폰',
        quantity: 1,
        price: 159000,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 2,
        name: '스마트 워치',
        quantity: 1,
        price: 129000,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 2,
    orderNumber: 'ORD20241125001',
    date: '2024년 11월 25일',
    status: '배송중',
    total: 89000,
    items: [
      {
        id: 3,
        name: '노트북 백팩',
        quantity: 1,
        price: 89000,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
])
</script>