<template>
  <section class="bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- 섹션 헤더 -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-4">인기 상품</h2>
        <p class="text-lg text-gray-600">가장 많이 찾는 상품들을 만나보세요</p>
      </div>

      <!-- 상품 그리드 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- 상품 1 -->
        <div class="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div class="aspect-w-4 aspect-h-3 bg-gray-200 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="프리미엄 무선 헤드폰"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute top-2 left-2">
              <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">20% OFF</span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-1">프리미엄 무선 헤드폰</h3>
            <p class="text-sm text-gray-500 mb-2">전자제품</p>
            <div class="flex items-center mb-2">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="ml-1 text-sm text-gray-600">(128)</span>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <span class="text-sm text-gray-500 line-through mr-2">₩199,000</span>
                <span class="text-lg font-bold text-gray-900">₩159,000</span>
              </div>
            </div>
            <button class="w-full mt-3 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              장바구니 담기
            </button>
          </div>
        </div>

        <!-- 상품 2 -->
        <div class="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div class="aspect-w-4 aspect-h-3 bg-gray-200 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="스마트 워치"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-1">스마트 워치</h3>
            <p class="text-sm text-gray-500 mb-2">웨어러블</p>
            <div class="flex items-center mb-2">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="ml-1 text-sm text-gray-600">(89)</span>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <span class="text-lg font-bold text-gray-900">₩299,000</span>
              </div>
            </div>
            <button class="w-full mt-3 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              장바구니 담기
            </button>
          </div>
        </div>

        <!-- 상품 3 -->
        <div class="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div class="aspect-w-4 aspect-h-3 bg-gray-200 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="노트북 백팩"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute top-2 left-2">
              <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">31% OFF</span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-1">노트북 백팩</h3>
            <p class="text-sm text-gray-500 mb-2">가방</p>
            <div class="flex items-center mb-2">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="ml-1 text-sm text-gray-600">(45)</span>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <span class="text-sm text-gray-500 line-through mr-2">₩129,000</span>
                <span class="text-lg font-bold text-gray-900">₩89,000</span>
              </div>
            </div>
            <button class="w-full mt-3 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              장바구니 담기
            </button>
          </div>
        </div>

        <!-- 상품 4 -->
        <div class="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div class="aspect-w-4 aspect-h-3 bg-gray-200 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="운동화"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-1">운동화</h3>
            <p class="text-sm text-gray-500 mb-2">신발</p>
            <div class="flex items-center mb-2">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="ml-1 text-sm text-gray-600">(203)</span>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <span class="text-lg font-bold text-gray-900">₩129,000</span>
              </div>
            </div>
            <button class="w-full mt-3 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              장바구니 담기
            </button>
          </div>
        </div>
      </div>

      <!-- 더 보기 버튼 -->
      <div class="text-center mt-12">
        <button class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300">
          더 많은 상품 보기
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>