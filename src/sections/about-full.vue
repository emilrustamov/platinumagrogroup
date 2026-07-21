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
  <section ref="sectionRef" class="w-full bg-white py-16 lg:py-24 relative select-none">

    <div
      class="w-full relative overflow-hidden h-[500px] sm:h-[550px] lg:h-[580px] flex items-center justify-center bg-gray-100">

      <!-- ФОНОВОЕ ИЗОБРАЖЕНИЕ -->
      <div class="absolute inset-0 w-full h-full z-0 overflow-hidden" :style="{
        opacity: isVisible ? '1' : '0',
        transition: 'opacity 1.2s ease-out',
        transitionDelay: '0s'
      }">
        <img src="/images/full.webp" alt="Premium Fruit Banner" class="w-full h-full object-cover animate-reveal"
          :style="{
            clipPath: isVisible ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
            transition: 'clip-path 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: '0.2s'
          }" />
      </div>

      <!-- ЛЕГКИЙ ОВЕРЛЕЙ -->
      <div class="absolute inset-0 bg-white/5 pointer-events-none z-10"></div>

      <!-- ЦЕНТРАЛЬНЫЙ БЕЛЫЙ БЛОК ЦИТАТЫ -->
      <div
        class="relative z-20 max-w-3xl w-full mx-4 sm:mx-6 bg-white py-12 px-6 sm:px-12 text-center shadow-xl border border-gray-100/50 flex flex-col gap-8 items-center justify-center rounded-sm"
        :style="{
          opacity: isVisible ? '1' : '0',
          transform: isVisible ? 'scale(1)' : 'scale(0.3)',
          transition: 'opacity 1s cubic-bezier(0.34, 1.56, 0.64, 1), transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: '0.6s'
        }">
        <span
          class="font-deg text-[24px] uppercase tracking-[0.25em] text-secondary border-b border-[#1a2b4c]/30 pb-1 mb-6 font-medium">
          {{ t('quote.title') }}
        </span>

        <p class="font-body text-secondary/60 text-[20px] leading-relaxed max-w-xl mb-6">
          {{ t('quote.text') }}
        </p>

        <span class="text-[20px] tracking-[0.2em] uppercase text-secondary/50">
          <strong class="text-prime font-medium font-jost">{{ t('quote.author') }}</strong> — {{ t('quote.role') }}
        </span>
      </div>

    </div>
  </section>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

@keyframes revealFromLeft {
  0% {
    clip-path: inset(0 100% 0 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}

.animate-reveal {
  animation: revealFromLeft 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.2s;
}
</style>