<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-900">MCP</NuxtLink>
        </div>
        <nav class="hidden md:flex space-x-8">
          <NuxtLink to="/" class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">홈</NuxtLink>
          <a href="#" class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">카테고리</a>
          <a href="#" class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">신상품</a>
          <a href="#" class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">세일</a>
          <a href="#" class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">이벤트</a>
        </nav>
        <div class="flex-1 max-w-lg mx-8 hidden md:block">
          <div class="relative">
            <input
              type="text"
              placeholder="상품을 검색해보세요"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button class="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <NuxtLink to="/basket" class="relative p-2 text-gray-700 hover:text-gray-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5-5M17 16a2 2 0 100 4 2 2 0 000-4zM9 16a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </NuxtLink>


          <!-- 로그아웃 버튼 (로그인 상태일 때만 표시) -->
          <button
            v-if="isLoggedIn"
            @click="handleLogout"
            class="p-2 text-gray-700 hover:text-red-600 transition-colors duration-200"
            title="로그아웃"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>

          <!-- 마이페이지 버튼 (항상 표시, 비로그인시 클릭하면 로그인 페이지로) -->
          <button
            @click="handleMyPage"
            class="p-2 text-gray-700 hover:text-gray-900"
            :title="isLoggedIn ? '마이페이지' : '로그인 후 이용 가능'"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface LogoutResponse {
  success: boolean
  message: string
}

// 로그인 상태 확인
const isLoggedIn = ref(false)

// 로그인 상태 확인 함수
const checkLoginStatus = () => {
  const token = useCookie('auth-token')
  isLoggedIn.value = !!token.value
}

// 마이페이지 버튼 클릭 처리 함수
const handleMyPage = async () => {
  if (isLoggedIn.value) {
    // 로그인 상태면 마이페이지로 이동
    await navigateTo('/mypage')
  } else {
    // 비로그인 상태면 로그인 페이지로 이동
    await navigateTo('/member/login')
  }
}

// 로그아웃 처리 함수
const handleLogout = async () => {
  try {
    const response = await $fetch<LogoutResponse>('http://localhost:8080/api/auth/logout', {
      method: 'POST'
    })

    if (response.success) {
      // 토큰 쿠키 삭제
      const tokenCookie = useCookie('auth-token')
      tokenCookie.value = null

      // 로그인 상태 업데이트
      isLoggedIn.value = false

      // 홈페이지로 리다이렉트
      await navigateTo('/')

      // 성공 메시지 (선택사항)
      console.log('로그아웃 완료')
    } else {
      console.error('로그아웃 실패:', response.message)
    }
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error)
  }
}

// 컴포넌트 마운트 시 로그인 상태 확인
onMounted(() => {
  checkLoginStatus()

  // 토큰 변경 감지를 위한 watcher
  watch(() => useCookie('auth-token').value, () => {
    checkLoginStatus()
  })
})
</script>