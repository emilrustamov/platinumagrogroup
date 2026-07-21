<script setup lang="ts">
import { ref } from 'vue'

// Принимаем стандартные пропсы для картинок
defineProps<{
  src: string
  alt?: string
  aspectClass?: string // Позволяет задавать пропорции, например 'aspect-[4/3]' или 'aspect-square'
}>()

// Локальное состояние загрузки конкретной картинки
const isLoaded = ref(false)

const handleLoad = () => {
  isLoaded.value = true
}
</script>

<template>
  <!-- Обертка компонента. Наследует скругления (если есть у родителя) -->
  <div :class="['relative overflow-hidden w-full bg-neutral-900', aspectClass || 'aspect-[4/3]']">
    
    <!-- 1. ГЛОБАЛЬНЫЙ CSS-ГРАДИЕНТ (Заглушка, которая весит 0 байт) -->
    <!-- Создает красивое абстрактное размытое пятно, как на вашем референсе -->
    <div 
      :class="[
        'absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 filter blur-xl scale-110 transition-opacity duration-750 pointer-events-none z-10',
        isLoaded ? 'opacity-0 invisible' : 'opacity-100'
      ]"
    ></div>

    <!-- 2. ОСНОВНОЕ ИЗОБРАЖЕНИЕ -->
    <img 
      :src="src" 
      :alt="alt || 'Изображение'" 
      loading="lazy"
      @load="handleLoad"
      :class="[
        'w-full h-full object-cover transition-all duration-1000 ease-out select-none pointer-events-none',
        isLoaded ? 'opacity-100 scale-100 filter blur-0' : 'opacity-0 scale-105 filter blur-md'
      ]" 
    />
  </div>
</template>
