import type { UserInfo, UserRequest, ApiResponse } from '~/types/user'

export const useUserApi = () => {
  const config = useRuntimeConfig()

  const getUserInfo = async (userId: string): Promise<ApiResponse<UserInfo>> => {
    try {
      const requestBody: UserRequest = { userId }

      console.log('API 호출 시작:', {
        userId,
        baseURL: config.public.apiBaseUrl,
        endpoint: '/api/user/getUserInfo'
      })

      const data = await $fetch<UserInfo>('/api/user/getUserInfo', {
        method: 'POST',
        baseURL: config.public.apiBaseUrl || 'http://localhost:8080',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      })

      console.log('API 응답 성공:', data)
      return { data }
    } catch (error: any) {
      console.error('API 호출 실패:', error)

      let errorMessage = '알 수 없는 오류가 발생했습니다'

      if (error?.response?.status === 404) {
        errorMessage = '사용자 정보를 찾을 수 없습니다'
      } else if (error?.response?.status === 500) {
        errorMessage = '서버 내부 오류가 발생했습니다'
      } else if (error?.response?.status === 400) {
        errorMessage = '잘못된 요청입니다'
      } else if (error?.data?.message) {
        errorMessage = error.data.message
      } else if (error?.message) {
        errorMessage = error.message
      } else if (error?.statusText) {
        errorMessage = error.statusText
      } else if (typeof error === 'string') {
        errorMessage = error
      }

      return {
        error: `API 호출 실패: ${errorMessage}`
      }
    }
  }

  return {
    getUserInfo
  }
}