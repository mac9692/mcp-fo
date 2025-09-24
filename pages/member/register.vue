<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          회원가입
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?
          <NuxtLink to="/member/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            로그인하기
          </NuxtLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div>
            <label for="userLoginId" class="block text-sm font-medium text-gray-700">사용자 ID *</label>
            <input
              id="userLoginId"
              v-model="registerForm.userLoginId"
              name="userLoginId"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="사용자 ID를 입력하세요"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">비밀번호 *</label>
            <input
              id="password"
              v-model="registerForm.password"
              name="password"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="비밀번호를 입력하세요"
            >
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">비밀번호 확인 *</label>
            <input
              id="confirmPassword"
              v-model="registerForm.confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="비밀번호를 다시 입력하세요"
            >
          </div>

          <div>
            <label for="userNm" class="block text-sm font-medium text-gray-700">이름 *</label>
            <input
              id="userNm"
              v-model="registerForm.userNm"
              name="userNm"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="이름을 입력하세요"
            >
          </div>

          <div>
            <label for="userEmail" class="block text-sm font-medium text-gray-700">이메일 *</label>
            <input
              id="userEmail"
              v-model="registerForm.userEmail"
              name="userEmail"
              type="email"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="이메일을 입력하세요"
            >
          </div>

          <div>
            <label for="userPhone" class="block text-sm font-medium text-gray-700">전화번호 *</label>
            <input
              id="userPhone"
              v-model="registerForm.userPhone"
              name="userPhone"
              type="tel"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="전화번호를 입력하세요 (예: 01012345678)"
            >
          </div>

          <div>
            <label for="userBirthDt" class="block text-sm font-medium text-gray-700">생년월일 *</label>
            <input
              id="userBirthDt"
              v-model="registerForm.userBirthDt"
              name="userBirthDt"
              type="date"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">회원가입 중...</span>
            <span v-else>회원가입</span>
          </button>
        </div>

        <div v-if="errorMessage" class="text-red-600 text-sm text-center">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="text-green-600 text-sm text-center">
          {{ successMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface RegisterForm {
  userLoginId: string
  password: string
  confirmPassword: string
  userNm: string
  userEmail: string
  userPhone: string
  userBirthDt: string
}

const registerForm = ref<RegisterForm>({
  userLoginId: '',
  password: '',
  confirmPassword: '',
  userNm: '',
  userEmail: '',
  userPhone: '',
  userBirthDt: ''
})

const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const validateForm = (): boolean => {
  if (!registerForm.value.userLoginId || !registerForm.value.password ||
      !registerForm.value.userNm || !registerForm.value.userEmail ||
      !registerForm.value.userPhone || !registerForm.value.userBirthDt) {
    errorMessage.value = '모든 필수 항목을 입력해주세요.'
    return false
  }

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    errorMessage.value = '비밀번호가 일치하지 않습니다.'
    return false
  }

  if (registerForm.value.password.length < 6) {
    errorMessage.value = '비밀번호는 6자 이상이어야 합니다.'
    return false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(registerForm.value.userEmail)) {
    errorMessage.value = '올바른 이메일 형식을 입력해주세요.'
    return false
  }

  const phoneRegex = /^01[0-9]{8,9}$/
  if (!phoneRegex.test(registerForm.value.userPhone)) {
    errorMessage.value = '올바른 전화번호 형식을 입력해주세요. (예: 01012345678)'
    return false
  }

  return true
}

const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    // mcp-api 호출
    const response = await $fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      body: {
        userLoginId: registerForm.value.userLoginId,
        password: registerForm.value.password,
        userNm: registerForm.value.userNm,
        userEmail: registerForm.value.userEmail,
        userPhone: registerForm.value.userPhone,
        userBirthDt: registerForm.value.userBirthDt
      }
    })

    if (response.success) {
      successMessage.value = '회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.'

      // 3초 후 로그인 페이지로 리다이렉트
      setTimeout(() => {
        navigateTo('/member/login')
      }, 3000)
    } else {
      errorMessage.value = response.message || '회원가입에 실패했습니다.'
    }
  } catch (error) {
    console.error('Register error:', error)
    errorMessage.value = '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.'
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