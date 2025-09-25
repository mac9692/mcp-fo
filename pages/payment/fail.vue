<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <!-- 실패 아이콘 -->
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <svg class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <!-- 실패 메시지 -->
        <h1 class="text-2xl font-bold text-gray-900 mb-4">결제에 실패했습니다</h1>
        <p class="text-gray-600 mb-8">결제 처리 중 문제가 발생했습니다. 다시 시도해주세요.</p>

        <!-- 실패 정보 표시 -->
        <div v-if="failureInfo" class="bg-red-50 rounded-lg p-6 mb-8 text-left">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">실패 정보</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">주문번호:</span>
              <span class="font-medium">{{ failureInfo.orderId }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">실패 사유:</span>
              <span class="font-medium text-red-600">{{ failureInfo.message }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">오류 코드:</span>
              <span class="font-medium">{{ failureInfo.code }}</span>
            </div>
          </div>
        </div>

        <!-- 버튼 그룹 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/order/sheet"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            다시 결제하기
          </NuxtLink>
          <NuxtLink
            to="/"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            홈으로 돌아가기
          </NuxtLink>
        </div>

        <!-- 고객센터 안내 -->
        <div class="mt-8 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600">
            문제가 지속될 경우 고객센터로 문의해주세요.
          </p>
          <p class="text-sm text-blue-600 font-medium mt-1">
            전화: 1588-1234 | 이메일: support@mcp.com
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 결제 실패 페이지
definePageMeta({
  middleware: ['auth']
})

const route = useRoute()

// URL 파라미터에서 실패 정보 추출
const failureInfo = computed(() => {
  const query = route.query
  if (!query.orderId && !query.message) return null

  return {
    orderId: query.orderId as string || 'N/A',
    message: query.message as string || '알 수 없는 오류가 발생했습니다.',
    code: query.code as string || 'UNKNOWN_ERROR'
  }
})

// 페이지 제목 설정
useHead({
  title: '결제 실패 - MCP'
})
</script>