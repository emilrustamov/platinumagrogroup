<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Текущий индекс для первого изображения (карусель)
const currentImageIndex = ref(0)
const isVisible = ref(false)
const sectionRef = ref(null)
let observer = null

// Массив изображений для первого блока
const carouselImages = [
  '/images/trendy/1-1.webp',
  '/images/trendy/1-2.webp',
  '/images/trendy/1-3.webp'
]

// Функция переключения на предыдущее
const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

// Функция переключения на следующее
const nextImage = () => {
  if (currentImageIndex.value < carouselImages.length - 1) {
    currentImageIndex.value++
  }
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (observer && sectionRef.value) {
          observer.unobserve(sectionRef.value)
        }
      }
    })
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  })

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <section ref="sectionRef"
    class="w-full py-20 bg-white relative overflow-hidden flex items-center justify-center select-none">

    <!-- ФОНОВЫЙ ТЕКСТ "PLATINUM" -->
    <div
      class="absolute inset-x-0 top-[60%] -translate-y-1/2 flex justify-center pointer-events-none z-0 overflow-hidden hidden md:flex">
      <svg viewBox="0 0 1000 200" class="w-[85vw] h-auto opacity-10">
        <text x="50%" y="70%" text-anchor="middle" class="font-heading text-9xl font-bold uppercase tracking-[0.1em]"
          fill="none" stroke="#000" stroke-width="1" stroke-dasharray="3 3">
          {{ t('trendy.watermark') }}
        </text>
      </svg>
    </div>

    <!-- ОСНОВНОЙ КОНТЕЙНЕР-СЕТКА -->
    <div class="max-w-6xl w-full px-6 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 relative z-10 items-start">

      <!-- 1. ЛЕВАЯ КОЛОНКА: ТЕКСТОВЫЙ БЛОК (появляется от левого края) -->
      <div class="md:col-span-4 flex flex-col pt-6 font-jost gap-6" :style="{
        opacity: isVisible ? '1' : '0',
        transform: isVisible ? 'translateX(0)' : 'translateX(-60px)',
        transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: '0s'
      }">
        <h2 class="font-heading text-4xl lg:text-[42px] font-light text-secondary leading-[1.2] mb-5">
          {{ t('trendy.titleLine1') }}<br />{{ t('trendy.titleLine2') }}
        </h2>
        <p class="text-[16px] text-secondary leading-relaxed mb-8 max-w-[280px]">
          {{ t('trendy.description') }}
        </p>

        <RouterLink to="/category/fruits"
          class="w-fit px-10 py-4 border border-secondary bg-transparent text-secondary text-[14px] uppercase tracking-[0.2em] font-medium hover:bg-secondary hover:text-white transition-all duration-300 rounded-none">
          {{ t('trendy.fruitsButton') }}
        </RouterLink>
        <RouterLink to="/category/vegetables"
          class="w-fit px-10 py-4 border border-secondary bg-transparent text-secondary text-[14px] uppercase tracking-[0.2em] font-medium hover:bg-secondary hover:text-white transition-all duration-300 rounded-none">
          {{ t('trendy.vegetablesButton') }}
        </RouterLink>

      </div>

      <!-- 2. ЦЕНТРАЛЬНАЯ КОЛОНКА: ДВА ИЗОБРАЖЕНИЯ (появляются от правого края) -->
      <div class="md:col-span-4 flex flex-col gap-6 lg:gap-8" :style="{
        opacity: isVisible ? '1' : '0',
        transform: isVisible ? 'translateX(0)' : 'translateX(60px)',
        transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: '0.2s'
      }">
        <!-- Верхнее изображение с КАРУСЕЛЬЮ -->
        <div class="relative w-full aspect-[1.35/1] bg-gray-50 overflow-hidden group">
          <img :src="carouselImages[currentImageIndex]" alt=""
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />

          <!-- Кнопка PREV (только если НЕ первое изображение) -->
          <button v-if="currentImageIndex > 0" @click="prevImage"
            class="absolute top-1/2 -translate-y-1/2 left-0 bg-secondary text-white text-[10px] uppercase tracking-[0.2em] font-medium px-5 py-2.5 font-syncopate hover:bg-prime transition-colors duration-300 rounded-none">
            {{ t('trendy.prevButton') }}
          </button>

          <!-- Кнопка NEXT (только если НЕ последнее изображение) -->
          <button v-if="currentImageIndex < carouselImages.length - 1" @click="nextImage"
            class="absolute top-1/2 -translate-y-1/2 right-0 bg-secondary text-white text-[10px] uppercase tracking-[0.2em] font-medium px-5 py-2.5 font-syncopate hover:bg-prime transition-colors duration-300 rounded-none">
            {{ t('trendy.nextButton') }}
          </button>
        </div>

        <!-- Нижнее изображение (шляпа) - БЕЗ КНОПОК -->
        <div class="relative w-full bg-gray-50 overflow-hidden group flex flex-col">
          <div class="relative aspect-[1/1.45] w-full">
            <img src="/images/trendy/3.webp" alt=""
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
            <div class="relative z-10 p-4 font-jost">
              <!-- <span class="text-xs font-medium text-gray-700">$50.00</span> -->
            </div>
          </div>
          <div
            class="bg-secondary text-white text-center py-3 px-6 text-[10px] uppercase tracking-[0.2em] font-medium font-syncopate w-fit">
            {{ t('trendy.pureFreshBadge') }}
          </div>
        </div>
      </div>

      <!-- 3. ПРАВАЯ КОЛОНКА: ДВА ИЗОБРАЖЕНИЯ (появляются от правого края с задержкой) -->
      <div class="md:col-span-4 flex flex-col gap-6 lg:gap-8" :style="{
        opacity: isVisible ? '1' : '0',
        transform: isVisible ? 'translateX(0)' : 'translateX(60px)',
        transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: '0.4s'
      }">
        <div class="relative w-full aspect-[1/1.25] bg-gray-50 overflow-hidden group p-4 flex flex-col items-end">
          <img src="/images/trendy/2.webp" alt=""
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
          <div class="relative z-10 font-jost pt-2 pr-2">
            <!-- <span class="text-xs font-medium text-gray-700">$50.00</span> -->
          </div>
        </div>

        <div class="relative w-full aspect-[2/1.2] bg-gray-50 overflow-hidden group">
          <img src="/images/trendy/4.webp" alt=""
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>