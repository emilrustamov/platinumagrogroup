<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <!-- Hero Block с фоновым изображением на всю ширину и высоту -->
  <section class="relative w-full !bg-orange-200 h-screen flex items-center justify-center overflow-hidden">

    <!-- ФОНОВОЕ ИЗОБРАЖЕНИЕ f3.png (ЛИМОН) - С АНИМАЦИЕЙ -->
    <div class="absolute inset-0 w-full h-full bg-contain bg-no-repeat animate-zoomIn"
      style="background-image: url('/images/f-orange.webp'); background-position: center right 10%; background-size: contain;">
    </div>

    <!-- ВТОРОЕ ИЗОБРАЖЕНИЕ (девушка) -->
    <div class="absolute inset-0 w-full h-full bg-contain bg-no-repeat"
      style="background-image: url('/images/hero/hero-2.png'); background-position: center right 5%; background-size: contain;">
    </div>

    <!-- КОНТЕНТ (тексты) -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl flex flex-col gap-3">
        <!-- Бренд -->
        <div
          class="font-deg text-sm font-medium text-secondary bg-transparent uppercase mb-4 w-fit border border-secondary/40 rounded-full px-6 py-4 mx-auto">
          {{ t('hero.brand') }}
        </div>

        <!-- Заголовки -->
        <h1 class="text-5xl sm:text-6xl md:text-7xl font-light text-secondary leading-tight font-heading">
          {{ t('hero.titleLine1') }}
        </h1>
        <h2 class="text-5xl sm:text-6xl md:text-7xl font-bold text-secondary leading-tight mt-1 font-heading">
          {{ t('hero.titleLine2') }}
        </h2>
        <h2 class="text-5xl sm:text-6xl md:text-7xl font-extrabold text-prime leading-tight font-heading">
          {{ t('hero.titleLine3') }}
        </h2>

        <!-- Кнопка -->
        <div class="flex justify-start mb-12 flex-row gap-4 md:mb-16">
          <RouterLink to="/category/fruits"
            class="w-48 px-4 py-3 text-center items-center gap-3 border border-black/60 bg-secondary hover:border-secondary text-white hover:text-secondary hover:bg-transparent px-4 lg:px-8 py-1.5 lg:py-3.5 text-[14px] lg:text-[18px] font-semibold uppercase tracking-[3px] transition-all duration-300 group">
            {{ t('hero.fruitsButton') }}
          </RouterLink>
          <RouterLink to="/category/vegetables"
            class="w-48 px-4 py-3 items-center gap-3 border border-black/60 hover:border-secondary hover:text-white hover:bg-secondary px-4 lg:px-8 py-1.5 lg:py-3.5 text-[14px] lg:text-[18px] font-semibold uppercase tracking-[3px] transition-all duration-300 group">
            {{ t('hero.vegetablesButton') }}
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Стрелка с анимацией bounce -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <div class="animate-bounce cursor-pointer">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes bounce {

  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* АНИМАЦИЯ - ЛИМОН ПОЯВЛЯЕТСЯ ОТ МАЛЕНЬКОГО К БОЛЬШОМУ */
@keyframes zoomIn {
  0% {
    opacity: 0;
    transform: scale(0.2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-zoomIn {
  animation: zoomIn 2s ease-out forwards;
}
</style>