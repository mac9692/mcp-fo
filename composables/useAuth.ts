export const useAuth = () => {
  // JWT 토큰에서 userId를 추출하는 함수
  const getUserIdFromToken = (): string | null => {
    try {
      const token = useCookie('auth-token')

      if (!token.value) {
        console.error('토큰이 존재하지 않습니다.')
        return null
      }

      // JWT 토큰은 header.payload.signature 형식
      const tokenParts = token.value.split('.')
      if (tokenParts.length !== 3) {
        console.error('잘못된 JWT 토큰 형식입니다.')
        return null
      }

      // payload 부분을 Base64 디코딩
      const payload = tokenParts[1]

      try {
        // Base64URL 디코딩을 위해 패딩 추가
        const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4)
        const decodedPayload = atob(paddedPayload.replace(/-/g, '+').replace(/_/g, '/'))
        const parsedPayload = JSON.parse(decodedPayload)

        console.log('JWT 디코딩 결과:', parsedPayload)

        // JWT의 subject(sub) 필드에서 userId 추출
        const userId = parsedPayload.sub

        console.log('추출된 userId:', userId)

        if (!userId) {
          console.error('토큰에서 userId를 찾을 수 없습니다.')
          return null
        }

        return userId
      } catch (decodeError) {
        console.error('토큰 디코딩 중 오류 발생:', decodeError)
        return null
      }
    } catch (error) {
      console.error('getUserIdFromToken 오류:', error)
      return null
    }
  }

  // 로그인 상태 확인
  const isLoggedIn = () => {
    const token = useCookie('auth-token')
    return !!token.value
  }

  // 로그아웃
  const logout = () => {
    const token = useCookie('auth-token')
    token.value = null
  }

  return {
    getUserIdFromToken,
    isLoggedIn,
    logout
  }
}