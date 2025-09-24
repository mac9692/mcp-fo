export default defineNuxtRouteMiddleware((to, from) => {
  // 인증이 필요 없는 페이지들
  const publicPages = [
    '/',
    '/member/login',
    '/member/register'
  ]

  // 현재 페이지가 공개 페이지인지 확인
  const isPublicPage = publicPages.includes(to.path)

  // 공개 페이지라면 인증 확인 없이 통과
  if (isPublicPage) {
    return
  }

  // 토큰 확인
  const token = useCookie('auth-token')

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token.value) {
    return navigateTo('/member/login')
  }

  // TODO: 토큰 유효성 검사 (추후 API 연동 시 구현)
  // 현재는 토큰 존재 여부만 확인
})