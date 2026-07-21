<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isVisible = ref(false)
const sectionRef = ref(null)
let observer = null

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
    class="w-full py-24 bg-white relative overflow-hidden flex flex-col items-center justify-center font-jost select-none">

    <div class="max-w-6xl w-full px-6 flex flex-col relative z-20 pointer-events-none">

      <!-- Верхний заголовок -->
      <div class="flex flex-col gap-4 items-start mb-24 pointer-events-auto animate-title" :style="{
        opacity: isVisible ? '1' : '0',
        transform: isVisible ? 'translateX(0)' : 'translateX(-60px)',
        transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: '0s'
      }">
        <div
          class="font-deg text-sm font-medium text-gray-600 uppercase mb-4 w-fit border border-black rounded-full px-6 py-4 mx-auto">
          {{ t('pureSection.title') }}
        </div>
        <h2
          class="font-heading text-5xl sm:text-6xl lg:text-[70px] font-light text-[#1a2b4c] leading-[1.05] uppercase tracking-tight"
          v-html="t('pureSection.subtitle')">
        </h2>
      </div>

      <!-- Центральная сетка -->
      <div
        class="grid grid-cols-1 md:grid-cols-12 gap-x-8 lg:gap-x-12 gap-y-16 w-full items-center min-h-[550px] relative">

        <!-- ЛЕВЫЙ ТЕКСТОВЫЙ БЛОК -->
        <div
          class="md:col-span-4 gap-4 pt-6 lg:pt-0 flex flex-col items-start pr-4 pointer-events-auto md:translate-y-8 animate-leftText"
          :style="{
            opacity: isVisible ? '1' : '0',
            transform: isVisible ? 'translateX(0)' : 'translateX(-60px)',
            transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: '0.2s'
          }">
          <h3 class="font-heading text-2xl lg:text-[40px] font-light text-[#1a2b4c] leading-[1.2] mb-3"
            v-html="t('pureSection.leftTitle')">
          </h3>
          <p class="text-gray-400 text-[16px] leading-relaxed mb-6 max-w-[260px]">
            {{ t('pureSection.leftText') }}
          </p>
          <RouterLink to="/category/fruits"
            class="w-fit px-10 py-4 border border-black bg-transparent text-black text-[14px] uppercase tracking-[0.2em] font-medium hover:bg-black hover:text-white transition-all duration-300 rounded-none">
            {{ t('pureSection.fruits') }}
          </RouterLink>
        </div>

        <!-- ЦЕНТРАЛЬНАЯ КОЛОНКА -->
        <div class="md:col-span-4 flex justify-center items-center py-6 pointer-events-auto relative min-h-[500px]">

          <div
            class="w-full max-w-[320px] aspect-[1/1.6] rounded-t-full rounded-b-full bg-[#f3eae1] shadow-sm absolute z-0 animate-ellipse"
            :style="{
              opacity: isVisible ? '1' : '0',
              transform: isVisible ? 'translateY(0)' : 'translateY(-80px)',
              transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transitionDelay: '0.6s'
            }"></div>

          <div
            class="relative z-10 w-full max-w-[340px] aspect-[1/1.6] flex items-center justify-center group animate-image"
            :style="{
              opacity: isVisible ? '1' : '0',
              transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
              transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transitionDelay: '0.8s'
            }">
            <img src="/images/333.webp" alt="Premium Fruit Harvest"
              class="w-full h-full object-contain transform scale-110 transition-transform duration-700 group-hover:scale-115" />
          </div>

        </div>

        <!-- ПРАВЫЙ ТЕКСТОВЫЙ БЛОК -->
        <div
          class="md:col-span-4 gap-4 flex flex-col items-start pb-6 lg:pb-0 pl-4 pointer-events-auto md:translate-y-8 animate-rightText"
          :style="{
            opacity: isVisible ? '1' : '0',
            transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
            transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: '0.4s'
          }">
          <h3 class="font-heading text-2xl lg:text-[40px] font-light text-[#1a2b4c] leading-[1.2] mb-3"
            v-html="t('pureSection.rightTitle')">
          </h3>
          <p class="text-gray-400 text-[16px] leading-relaxed mb-6 max-w-[260px]">
            {{ t('pureSection.rightText') }}
          </p>
          <RouterLink to="/category/vegetables"
            class="w-fit px-10 py-4 border border-black bg-transparent text-black text-[14px] uppercase tracking-[0.2em] font-medium hover:bg-black hover:text-white transition-all duration-300 rounded-none">
            {{ t('pureSection.vegetables') }}
          </RouterLink>
        </div>

      </div>
    </div>

    <!-- СЛОЙ ИЗОБРАЖЕНИЙ -->
    <div class="absolute inset-0 w-full h-full z-10 pointer-events-none hidden md:block">
      <div class="w-full h-full relative max-w-[1920px] mx-auto">
        <div
          class="absolute top-[28%] left-0 w-[17vw] max-w-[260px] aspect-square bg-gray-50 overflow-hidden shadow-sm pointer-events-auto group">
          <img src="/images/trendy/1-1.webp" alt="Organic Apples"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
        </div>
        <div
          class="absolute bottom-[2%] left-0 w-[17vw] max-w-[260px] aspect-[3/4] bg-gray-50 overflow-hidden shadow-sm pointer-events-auto group">
          <img src="/images/trendy/1-3.webp" alt="Fresh Berries"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
        </div>
        <div
          class="absolute top-[28%] right-0 w-[17vw] max-w-[260px] aspect-[3/4] bg-gray-50 overflow-hidden shadow-sm pointer-events-auto group">
          <img src="/images/trendy/4.webp" alt="Organic Oranges"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
        </div>
        <div
          class="absolute bottom-[2%] right-0 w-[17vw] max-w-[260px] aspect-square bg-gray-50 overflow-hidden shadow-sm pointer-events-auto group">
          <img src="/images/trendy/1-2.webp" alt="Exotic Pineapple"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
        </div>
      </div>
    </div>

    <!-- Мобильная верстка -->
    <div class="w-full px-6 flex flex-col gap-10 md:hidden mt-12 relative z-20">
      <div class="w-full aspect-square bg-gray-50 overflow-hidden"><img src="/images/trendy/1-1.webp"
          class="w-full h-full object-cover" /></div>
      <div class="w-full aspect-[3/4] bg-gray-50 overflow-hidden"><img src="/images/trendy/1-3.webp"
          class="w-full h-full object-cover" /></div>
      <div class="w-full aspect-[3/4] bg-gray-50 overflow-hidden"><img src="/images/trendy/4.webp"
          class="w-full h-full object-cover" /></div>
      <div class="w-full aspect-square bg-gray-50 overflow-hidden"><img src="/images/trendy/1-2.webp"
          class="w-full h-full object-cover" /></div>
    </div>

  </section>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>