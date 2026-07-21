<template>
  <!-- Главная секция с глубоким черным фоном -->
  <section class="w-full py-10 md:py-20 !bg-[#0a0a0a] flex flex-col items-center justify-center select-none font-jost relative">
    
    <!-- 1. ЗАГОЛОВОК СЕКЦИИ (Строго по центру) -->
    <div class="max-w-6xl w-full px-6 flex flex-col items-center text-center pb-4 lg:pb-16 relative z-20">
      <h2 class="font-heading text-3xl sm:text-5xl lg:text-[52px] font-light text-prime tracking-wide leading-tight">
        {{ t('history.title') }}
      </h2>
    </div>

    <!-- 2. БЛОК СЕТКИ И ВИДЕО: РОВНО 80% ОТ ШИРИНЫ ЭКРАНА (w-[80vw]) -->
    <!-- ИСПРАВЛЕНО: добавлен ref="videoWrapperRef" - без него IntersectionObserver не мог найти элемент -->
    <div ref="videoWrapperRef" class="w-[80vw] mx-auto relative z-10">
      
      <!-- Внутренний контейнер с фоном bg-[#0a0a0a] и сеткой -->
      <!-- gap-2 (8px) задает базовое расстояние, а border-black на ячейках делает контуры идеальными -->
      <div class="w-full aspect-[16/7] relative overflow-hidden bg-[#0a0a0a] grid grid-cols-12 grid-rows-3">

        <!-- ЕДИНОЕ ФОНОВОЕ ВИДЕО -->
        <video 
          v-if="isInView"
          autoplay 
          loop 
          muted 
          playsinline
          preload="metadata"
          poster="/video/history.webp"
          class="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source src="/video/fruit.webm" type="video/webm" />
        </video>
        <img 
          v-else
          src="/video/history.webp"
          alt=""
          class="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
        <!-- ================= СЛОЙ МАТРИЦЫ ИЗ ЦВЕТНЫХ КВАДРАТОВ С ЧЕРНЫМИ БОРДЕРАМИ ================= -->
        <!-- К каждому блоку добавлен класс 'border-4 border-black' для создания рамки вокруг видео -->
        
        <!-- СТРОКА 1 -->
        <div class="col-span-4 bg-[#4c6a80]/60 border-1 md:border-4 border-black z-10"></div> 
        <div class="col-span-2 bg-transparent border-1 md:border-4 border-black z-10"></div> 
        <div class="col-span-2 bg-transparent border-1 md:border-4 border-black z-10"></div> 
        <div class="col-span-4 bg-[#fbc89b] border-1 md:border-4 border-black z-10"></div>    

        <!-- СТРОКА 2 -->
        <div class="col-span-2 bg-[#854562]/40 border-1 md:border-4 border-black z-10"></div> 
        <div class="col-span-2 bg-transparent border-1 md:border-4 border-black z-10"></div> 
        <div class="col-span-2 bg-transparent border-1 md:border-4 border-black z-10"></div> 
        <div class="col-span-2 bg-transparent border-1 md:border-4 border-black z-10"></div> 
        <div class="col-span-2 bg-transparent border-1 md:border-4 border-black z-10"></div> 
        <div class="col-span-2 bg-[#854562]/40 border-1 md:border-4 border-black z-10"></div> 

        <!-- СТРОКА 3 -->
        <div class="col-span-2 bg-transparent border-1 md:border-4 border-black z-10"></div> 
        <div class="col-span-4 bg-[#854562]/40 border-1 md:border-4 border-black z-10"></div> 
        <div class="col-span-2 bg-[#fbc89b] border-1 md:border-4 border-black z-10"></div>    
        <div class="col-span-4 bg-transparent border-1 md:border-4 border-black z-10"></div> 

      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
 
const { t } = useI18n()
 
const videoWrapperRef = ref(null)
const isInView = ref(false)
let observer = null
 
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isInView.value = true
        // Видео нужно загрузить один раз - дальше отключаем наблюдатель
        if (observer && videoWrapperRef.value) {
          observer.unobserve(videoWrapperRef.value)
        }
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '200px 0px' // начинаем загрузку немного заранее, до того как блок покажется на экране
  })
 
  if (videoWrapperRef.value) {
    observer.observe(videoWrapperRef.value)
  }
})
 
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>