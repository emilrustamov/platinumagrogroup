<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo.js'
import { pagesSeo } from '@/config/seo.config.js'
import AboutFull from '@/sections/about-full.vue';
import AboutGalery from '@/sections/about-galery.vue';
import ContactBlock from '@/sections/contact-block.vue';
import HomeProducts from '@/sections/home-products.vue';
import Join from '@/sections/join.vue';
// import Team from '@/sections/team.vue';
import VideoGrid from '@/sections/video-grid.vue';
const { t } = useI18n()

useSeo(pagesSeo.about)
</script>

<template>
  <!-- Hero Block с фоновым изображением на всю ширину и высоту -->
  <section class="relative w-full !bg-orange-200 pt-[200px] h-[500px] flex items-center justify-center overflow-hidden">

    <!-- ФОНОВОЕ ИЗОБРАЖЕНИЕ f3.png (ЛИМОН) - С АНИМАЦИЕЙ -->
    <!-- <div 
      class="absolute inset-0 w-full h-full bg-contain bg-no-repeat animate-zoomIn"
      style="background-image: url('/images/f-orange.webp'); background-position: center right 10%; background-size: contain;"
    ></div> -->
    <div class="absolute inset-0 w-full h-full bg-contain bg-no-repeat animate-zoomIn">
    </div>

    <!-- КОНТЕНТ (тексты) -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl flex flex-col gap-3">
        <!-- Бренд -->
        <div
          class="font-deg text-sm font-medium text-secondary uppercase mb-4 w-fit border border-secondary/40 rounded-full px-6 py-4 mx-auto"
        >
        {{ t('aboutHero.subtitle') }}
        </div>

        <!-- Заголовки -->
        <h1 class="text-5xl sm:text-6xl md:text-7xl font-light text-secondary leading-tight font-heading">
          {{ t('aboutHero.title') }}
        </h1>
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
  <AboutGalery />
  <AboutFull />
  <HomeProducts />
  <Join />
  <!-- <Team /> -->
  <VideoGrid />
  <ContactBlock />
</template>