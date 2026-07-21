<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

// Храним ID активной точки, которая сейчас открыта
const activeDot = ref(null)
const isVisible = ref(false)
const sectionRef = ref(null)
let observer = null

// Функция для мобильных устройств: клик открывает/закрывает подсказку
const handleDotClick = (id) => {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
  if (isTouchDevice) {
    activeDot.value = activeDot.value === id ? null : id
  }
}

// Функция для ПК: наведение мыши открывает подсказку
const handleMouseEnter = (id) => {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
  if (!isTouchDevice) {
    activeDot.value = id
  }
}

// Функция для ПК: уход мыши закрывает подсказку
const handleMouseLeave = () => {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
  if (!isTouchDevice) {
    activeDot.value = null
  }
}

// Позиции точек остаются в коде (не переводимые данные)
const dotPositions = [
  { id: 1, top: '20%', left: '48%' },
  { id: 2, top: '47%', left: '32%' },
  { id: 3, top: '44%', left: '68%' },
  { id: 4, top: '65%', left: '50%' },
  { id: 5, top: '80%', left: '35%' },
  { id: 6, top: '88%', left: '60%' }
]

// tm() достаёт "сырой" массив { title, desc } из locale-файла (produce.dots)
// и объединяем с позициями по индексу
const dots = computed(() => {
  const translated = tm('produce.dots')
  return dotPositions.map((pos, index) => ({
    ...pos,
    title: translated[index]?.title,
    desc: translated[index]?.desc
  }))
})

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
    class="w-full bg-white py-20 flex items-center justify-center relative overflow-hidden select-none">

    <!-- ГИГАНТСКИЙ ТЕКСТ НА ЗАДНЕМ ПЛАНЕ - АНИМИРУЕТСЯ ОТ ЛЕВОГО КРАЯ -->
    <div class="absolute inset-0 flex flex-col justify-center items-start pointer-events-none z-0 pl-[10vw] max-w-4xl"
      :style="{
        opacity: isVisible ? '1' : '0',
        transform: isVisible ? 'translateX(0)' : 'translateX(-80px)',
        transition: 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: '0s'
      }">
      <h1
        class="font-heading text-[8vw] font-light text-secondary uppercase leading-[1.05] tracking-tight text-left">
        {{ t('produce.headingLine1') }}<br />
        {{ t('produce.headingLine2') }}<br />
        {{ t('produce.headingLine3') }}
      </h1>
    </div>

    <!-- ЦЕНТРАЛЬНЫЙ КОНТЕЙНЕР ДЛЯ КАРТИНКИ И ТОЧЕК (БЕЗ АНИМАЦИИ) -->
    <div class="relative z-10 max-w-[550px] w-full aspect-[1/1.4] mx-auto px-4 sm:px-0">

      <!-- Картинка фруктов -->
      <img src="/images/mix.webp" :alt="t('produce.imageAlt')"
        class="w-full h-full object-contain pointer-events-none drop-shadow-xl" />

      <!-- ИНТЕРАКТИВНЫЕ ТОЧКИ -->
      <div v-for="dot in dots" :key="dot.id" class="absolute -translate-x-1/2 -translate-y-1/2"
        :style="{ top: dot.top, left: dot.left }" @mouseenter="handleMouseEnter(dot.id)" @mouseleave="handleMouseLeave">
        <!-- КНОПКА С ЭФФЕКТОМ МАТОВОГО СТЕКЛА -->
        <button @click="handleDotClick(dot.id)"
          class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 relative border border-white/30 cursor-pointer shadow-md"
          :class="{ 'bg-white/30 scale-105': activeDot === dot.id }">
          <div
            class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-gray-800 shadow-sm">
            <span
              class="text-base font-light transition-transform duration-500 block leading-none select-none text-secondary"
              :class="{ 'rotate-45 scale-110': activeDot === dot.id }" style="margin-top: -2px;">
              +
            </span>
          </div>
        </button>

        <!-- ВСПЛЫВАЮЩИЙ БЛОК С ТЕКСТОМ (TOOLTIP) -->
        <div
          class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white px-5 py-4 w-[180px] sm:w-[210px] shadow-2xl border border-gray-100 text-center transition-all duration-500 rounded-sm z-30"
          :class="activeDot === dot.id ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-3 invisible'">
          <h4 class="text-[18px] font-semibold text-secondary uppercase tracking-wider mb-2">
            {{ dot.title }}
          </h4>
          <p class="text-gray-400 text-[16px] leading-relaxed">
            {{ dot.desc }}
          </p>
          <div class="w-8 h-[1px] bg-prime mx-auto mt-3"></div>
        </div>

      </div>

    </div>
  </section>
</template>