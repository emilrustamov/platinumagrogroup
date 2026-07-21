<template>
  <section class="w-full relative overflow-hidden h-[650px] lg:h-[850px] bg-gray-100 flex items-center justify-center">
    
    <!-- Контейнер для изображения -->
    <div class="absolute inset-0 w-full h-full overflow-hidden">
      <img 
        src="/images/to-about-2.webp" 
        :alt="t('storyBanner.imageAlt')" 
        class="absolute inset-0 w-full h-full object-cover"
        :class="{ 'animate-reveal': isVisible }"
      />
    </div>

    <div class="absolute inset-0 bg-black/[0.02] pointer-events-none"></div>

    <RouterLink 
      to="/about"
      class="relative z-10 w-44 h-44 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-sm hover:bg-white/80 hover:scale-105 transition-all duration-500 group select-none"
      :class="{ 'animate-zoomIn': isVisible }"
    >
      <span class="text-xs uppercase tracking-[0.25em] font-medium text-secondary flex items-center gap-1.5 pl-2">
        {{ t('storyBanner.label') }}
        <span class="text-[10px] transform group-hover:translate-x-1 transition-transform duration-300">▷</span>
      </span>
    </RouterLink>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isVisible = ref(false)

onMounted(() => {
  // Запускаем анимацию после монтирования
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

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
  animation: revealFromLeft 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes zoomIn {
  0% {
    opacity: 0;
    transform: scale(0.1);
  }
  60% {
    opacity: 0.7;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-zoomIn {
  animation: zoomIn 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0.5s;
  opacity: 0;
}
</style>