<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { productsMeta } from '@/data/products.js'
import { useSeo } from '@/composables/useSeo.js'
import { pagesSeo } from '@/config/seo.config.js'

const { t, tm } = useI18n()
const route = useRoute()
const isVisible = ref(false)
const sectionRef = ref(null)
let observer = null

// Определяем категорию из slug
const categorySlug = computed(() => route.params.category)

// ===== SEO: подставляем нужный набор мета-данных в зависимости от категории =====
useSeo(() => {
  if (categorySlug.value === 'fruits') return pagesSeo.fruits
  if (categorySlug.value === 'vegetables') return pagesSeo.vegetables
  return pagesSeo.fruits // fallback на случай неизвестной категории
})

// tm() достаёт "сырой" объект { items: { slug: {...} } } из locale-файла (products.items)
const translatedItems = computed(() => tm('products.items') || {})

// Получаем продукты для текущей категории, объединяя тех. данные с переводом по slug
const categoryProducts = computed(() => {
  const list = categorySlug.value === 'fruits'
    ? productsMeta.fruits
    : categorySlug.value === 'vegetables'
      ? productsMeta.vegetables
      : []

  return list.map(item => ({
    ...item,
    name: translatedItems.value[item.slug]?.name || item.slug
  }))
})

// Заголовок для текущей категории
const categoryTitle = computed(() => {
  if (categorySlug.value === 'fruits') {
    return t('categoryPage.titleFruits')
  } else if (categorySlug.value === 'vegetables') {
    return t('categoryPage.titleVegetables')
  }
  return t('categoryPage.titleDefault')
})

// Фоновое изображение для hero секции
const heroBackgroundImage = computed(() => {
  if (categorySlug.value === 'fruits') {
    return '/images/f-orange.webp' // Изображение для фруктов (лимон)
  } else if (categorySlug.value === 'vegetables') {
    return '/images/v-orange.webp' // Изображение для овощей
  }
  return '/images/f-orange.webp' // Изображение по умолчанию
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

const oppositeCategory = computed(() => {
  if (categorySlug.value === 'fruits') {
    return { name: t('categoryPage.titleVegetables'), path: '/category/vegetables' }
  } else if (categorySlug.value === 'vegetables') {
    return { name: t('categoryPage.titleFruits'), path: '/category/fruits' }
  }
  return { name: t('categoryPage.allProducts'), path: '/products' }
})
</script>

<template>
  <section class="relative w-full !bg-orange-200 pt-[200px] h-[500px] flex items-center justify-center overflow-hidden">

    <!-- ФОНОВОЕ ИЗОБРАЖЕНИЕ - меняется в зависимости от категории -->
    <div 
      class="absolute inset-0 w-full h-full bg-contain bg-no-repeat animate-zoomIn"
      :style="{
        backgroundImage: `url('${heroBackgroundImage}')`,
        backgroundPosition: 'center right 10%',
        backgroundSize: 'contain'
      }"
    ></div>

    <!-- КОНТЕНТ (тексты) -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl flex flex-col gap-3">
        <!-- Бренд -->
        <div
          class="font-deg text-sm font-medium text-secondary uppercase mb-4 w-fit border border-secondary/40 rounded-full px-6 py-4 mx-auto">
          {{ categoryTitle }}
        </div>

        <!-- Заголовки -->
        <h1 class="text-5xl sm:text-6xl md:text-7xl font-light text-secondary leading-tight font-heading">
          {{ categoryTitle }} {{ t('categoryPage.collectionSuffix') }}
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

  <section ref="sectionRef" class="py-16 mx-auto bg-gray-50 flex flex-col items-center min-h-screen">
    <div class="w-full mx-auto">
      <!-- Сетка товаров -->
      <div class="flex justify-center" :style="{
        opacity: isVisible ? '1' : '0',
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        transitionDelay: '0.3s'
      }">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full px-4">
          <div v-for="(product, index) in categoryProducts" :key="product.slug"
            class="group relative overflow-hidden bg-transparent transition-all duration-500" :style="{
              opacity: isVisible ? '1' : '0',
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
              transitionDelay: isVisible ? `${0.4 + index * 0.1}s` : '0s'
            }">
            <div class="relative overflow-hidden h-80 bg-gray-100">
              <img :src="product.imageBg || product.image" :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.15)] pointer-events-none z-10">
              </div>
              <div
                class="absolute bottom-0 left-0 right-0 flex justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-20">
                <RouterLink :to="`/product/${product.slug}`"
                  class="w-auto px-4 py-3 bg-secondary text-white text-sm font-medium uppercase tracking-wider hover:bg-prime transition-colors duration-300">
                  {{ t('categoryPage.viewProductButton') }}
                </RouterLink>
              </div>
            </div>

            <div class="pt-4 px-0">
              <div class="flex justify-between items-baseline gap-2">
                <h4 class="text-lg font-normal text-secondary">{{ product.name }}</h4>
              </div>
              <p class="text-xs text-gray-400 uppercase tracking-[0.2em] mt-2 text-left">
                <!-- {{ t('countries.' + (product.country)) }} -->
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Кнопка ALL PRODUCTS -->
      <div class="mt-12 flex flex-wrap items-center justify-center gap-6 pt-8" :style="{
        opacity: isVisible ? '1' : '0',
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        transitionDelay: isVisible ? '0.7s' : '0s'
      }">
        <RouterLink :to="oppositeCategory.path"
          class="w-auto px-4 py-3 bg-secondary text-white text-sm font-medium uppercase tracking-wider hover:bg-prime transition-colors duration-300">
          {{ oppositeCategory.name }}
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

@keyframes bounce {
  0%, 100% {
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