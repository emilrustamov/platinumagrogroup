<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
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
  <section ref="sectionRef" class="w-full bg-white py-16 lg:py-24 relative select-none overflow-hidden">
    
    <div class="w-full relative overflow-hidden h-[700px] sm:h-[530px] lg:h-[620px] flex items-center justify-center bg-gray-100">
      
      <!-- ФОНОВОЕ ИЗОБРАЖЕНИЕ - БЕЗ АНИМАЦИИ -->
      <img 
        src="/images/f-ter2.png" 
        alt="Premium Fruit Background" 
        class="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div class="absolute inset-0 bg-white/5 pointer-events-none z-10"></div>

      <!-- ТЕКСТОВЫЙ БЛОК - ПОЯВЛЯЕТСЯ КАК ЛИМОНЧИК -->
      <div 
        class="relative z-20 max-w-7xl w-full mx-4 sm:mx-6 bg-white py-20 px-6 sm:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-10 text-center shadow-xl border border-gray-100/50 rounded-none items-start"
        :style="{
          opacity: isVisible ? '1' : '0',
          transform: isVisible ? 'scale(1)' : 'scale(0.2)',
          transition: 'opacity 1s cubic-bezier(0.34, 1.56, 0.64, 1), transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: '0.3s'
        }"
      >
        
        <!-- КОЛОНКА 1: Call Us -->
        <div class="flex flex-col items-center text-center font-jost">
          <div class="text-prime w-11 h-11 mb-5 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.79 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <h4 style="font-weight: 500;" class="text-[30px] font-normal text-secondary tracking-wide mb-3.5">
            {{ t('contactInfo.callUs') }}
          </h4>
          <p class="text-[#133447] text-[16px] leading-relaxed max-w-[240px] mb-5">
            {{ t('contactInfo.callUsText') }}
          </p>
          <span class="text-[20px] font-semibold text-secondary tracking-wider block" style="font-weight: 600;">
            {{ t('contactInfo.phone') }}
          </span>
        </div>

        <!-- КОЛОНКА 2: Email -->
        <div class="flex flex-col items-center text-center font-jost md:px-4">
          <div class="text-prime w-11 h-11 mb-5 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <h4 style="font-weight: 500;" class="text-[30px] font-normal text-secondary tracking-wide mb-3.5">
            {{ t('contactInfo.email') }}
          </h4>
          <p class="text-[#133447] text-[16px] leading-relaxed max-w-[240px] mb-5">
            {{ t('contactInfo.emailText') }}
          </p>
          <span class="text-[20px] font-semibold text-secondary tracking-wider block" style="font-weight: 600;">
            {{ t('contactInfo.emailAddress') }}
          </span>
        </div>

        <!-- КОЛОНКА 3: Location -->
        <div class="flex flex-col items-center text-center font-jost">
          <div class="text-prime w-11 h-11 mb-5 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h4 style="font-weight: 500;" class="text-[30px] font-normal text-secondary tracking-wide mb-3.5">
            {{ t('contactInfo.location') }}
          </h4>
          <p class="text-[#133447] text-[16px] leading-relaxed max-w-[240px] mb-3">
            {{ t('contactInfo.locationText') }}
          </p>
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