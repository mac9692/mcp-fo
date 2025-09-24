<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          로그인
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          또는
          <NuxtLink to="/member/register" class="font-medium text-indigo-600 hover:text-indigo-500">
            회원가입하기
          </NuxtLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="userLoginId" class="sr-only">사용자 ID</label>
            <input
              id="userLoginId"
              v-model="loginForm.userLoginId"
              name="userLoginId"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="사용자 ID"
            >
          </div>
          <div>
            <label for="password" class="sr-only">비밀번호</label>
            <input
              id="password"
              v-model="loginForm.password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="비밀번호"
            >
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="loginForm.rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            >
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              로그인 상태 유지
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">로그인 중...</span>
            <span v-else>로그인</span>
          </button>
        </div>

        <div v-if="errorMessage" class="text-red-600 text-sm text-center">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface LoginForm {
  userLoginId: string
  password: string
  rememberMe: boolean
}

const loginForm = ref<LoginForm>({
  userLoginId: '',
  password: '',
  rememberMe: false
})

const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!loginForm.value.userLoginId || !loginForm.value.password) {
    errorMessage.value = 'ID와 비밀번호를 모두 입력해주세요.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    // mcp-api 호출
    const response = await $fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      body: {
        userLoginId: loginForm.value.userLoginId,
        password: loginForm.value.password
      }
    })

    // 로그인 성공 시 토큰 저장 및 리다이렉트
    if (response.success) {
      const token = response.token
      // 토큰을 쿠키에 저장
      const tokenCookie = useCookie('auth-token')
      tokenCookie.value = token

      // 메인 페이지로 리다이렉트
      await navigateTo('/')
    } else {
      errorMessage.value = response.message || '로그인에 실패했습니다.'
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.'
  } finally {
    isLoading.value = false
  }
}

// 로그인된 사용자는 메인 페이지로 리다이렉트
onMounted(() => {
  const token = useCookie('auth-token')
  if (token.value) {
    navigateTo('/')
  }
})
</script>