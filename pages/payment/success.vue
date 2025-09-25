<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <!-- 성공 아이콘 -->
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <!-- 성공 메시지 -->
        <h1 class="text-2xl font-bold text-gray-900 mb-4">결제가 완료되었습니다!</h1>
        <p class="text-gray-600 mb-8">주문이 성공적으로 처리되었습니다. 결제 내역을 확인해주세요.</p>

        <!-- 결제 정보 표시 (URL 파라미터에서 가져옴) -->
        <div v-if="paymentInfo" class="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">결제 정보</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">주문번호:</span>
              <span class="font-medium">{{ paymentInfo.orderId }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">결제금액:</span>
              <span class="font-medium">{{ paymentInfo.amount?.toLocaleString() }}원</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">결제방법:</span>
              <span class="font-medium">{{ paymentInfo.paymentMethod }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">결제일시:</span>
              <span class="font-medium">{{ formatDate(paymentInfo.approvedAt) }}</span>
            </div>
          </div>
        </div>

        <!-- 버튼 그룹 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/order/history"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            주문내역 확인
          </NuxtLink>
          <NuxtLink
            to="/"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            쇼핑 계속하기
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 결제 성공 페이지
definePageMeta({
  middleware: ['auth']
})

const route = useRoute()

// URL 파라미터에서 결제 정보 추출
const paymentInfo = computed(() => {
  const query = route.query
  if (!query.orderId) return null

  return {
    orderId: query.orderId as string,
    amount: Number(query.amount) || 0,
    paymentMethod: query.paymentMethod as string || '카드',
    approvedAt: query.approvedAt as string || new Date().toISOString()
  }
})

// 날짜 포맷팅
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 페이지 제목 설정
useHead({
  title: '결제 완료 - MCP'
})
</script>