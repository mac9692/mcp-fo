import type { UserInfo, UserRequest, ApiResponse } from '~/types/user'

export const useUserApi = () => {
  const getUserInfo = async (userId: string): Promise<ApiResponse<UserInfo>> => {
    try {
      const requestBody: UserRequest = { userId }

      const data = await $fetch<UserInfo>('/api/user/getUserInfo', {
        method: 'POST',
        baseURL: 'http://localhost:8080',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      })

      return { data }
    } catch (error: any) {
      console.error('Failed to fetch user info:', error)

      let errorMessage = 'Unknown error occurred'

      if (error?.data?.message) {
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