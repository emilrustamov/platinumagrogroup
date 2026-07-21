<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { productsMeta } from '@/data/products.js'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { t, tm } = useI18n()

defineProps({
  open: Boolean
})

defineEmits(['close'])

// tm() достаёт "сырой" объект { items: { slug: {...} } } из locale-файла (products.items)
// и объединяем с техническими данными (id, slug, image) по slug — так же, как в home-products.vue
const translatedItems = computed(() => tm('products.items') || {})

const galleryProducts = computed(() => {
  const fruits = productsMeta.fruits.slice(0, 4)
  const vegetables = productsMeta.vegetables.slice(0, 4)
  return [...fruits, ...vegetables].map(item => ({
    ...item,
    name: translatedItems.value[item.slug]?.name || item.slug
  }))
})
</script>

<template>
  <Transition name="slide">
    <div v-if="open"
      class="fixed right-0 top-0 z-[100] gap-12 xl:gap-16 h-screen w-full sm:w-full md:w-[480px] bg-[#0c2438] text-white p-[16px] md:p-[30px] overflow-y-auto flex flex-col shadow-2xl">
      
      <!-- ВЕРХНЯЯ ЧАСТЬ -->
      <div class="flex flex-col gap-5 mt-auto">
        
        <!-- Верхняя строка: Language Switcher слева, кнопка закрытия справа -->
        <div class="flex justify-between items-center mb-8 md:mb-12">
          <!-- Language Switcher - СЛЕВА -->
          <LanguageSwitcher />
          
          <!-- Кнопка закрытия - СПРАВА -->
          <button @click="$emit('close')"
            class="group flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none border border-[#d6ae79] bg-[#d6ae79] hover:bg-transparent transition duration-300 p-2 rounded-sm"
            :aria-label="t('mobileMenu.closeAriaLabel')">
            <div
              class="w-[20px] h-[3px] bg-white transition-all duration-300 translate-y-[4px] rotate-45 group-hover:bg-[#d6ae79]">
            </div>
            <div
              class="w-[20px] h-[3px] bg-white transition-all duration-300 -translate-y-[4px] rotate-[-45deg] group-hover:bg-[#d6ae79]">
            </div>
          </button>
        </div>

        <!-- Заголовок бренда -->
        <div class="w-full flex flex-col items-start mb-6">
          <h2 class="font-heading flex flex-col leading-tight">
            <span class="text-[50px] font-medium text-white">
              {{ t('mobileMenu.brandName') }}
            </span>
            <span class="text-[20px] opacity-90 tracking-wide text-[#d6ae79]">
              {{ t('mobileMenu.brandSuffix') }}
            </span>
          </h2>
        </div>

        <!-- Текстовое описание -->
        <p class="text-left text-sm md:text-base font-light text-gray-300/90 leading-relaxed mb-8 max-w-[90%]">
          {{ t('mobileMenu.description') }}
        </p>

        <!-- Кнопки FRUITS и VEGETABLES -->
        <div class="flex flex-row gap-4 justify-start mb-12 md:mb-16"> 
          <RouterLink to="/category/fruits"
            class="inline-flex items-center gap-3 border border-white/60 hover:border-[#d6ae79] hover:text-[#d6ae79] px-4 lg:px-8 py-1.5 lg:py-3.5 text-[14px] lg:text-[18px] font-semibold uppercase tracking-[3px] transition-all duration-300 group">
            {{ t('mobileMenu.fruitsButton') }}
          </RouterLink>
          <RouterLink to="/category/vegetables"
            class="inline-flex items-center gap-3 border border-white/60 hover:border-[#d6ae79] hover:text-[#d6ae79] px-4 lg:px-8 py-1.5 lg:py-3.5 text-[14px] lg:text-[18px] font-semibold uppercase tracking-[3px] transition-all duration-300 group">
            {{ t('mobileMenu.vegetablesButton') }}
          </RouterLink>
        </div>

        <!-- СЕТКА ИЗОБРАЖЕНИЙ -->
        <div class="grid grid-cols-4 gap-3 max-w-[328px] mb-12 md:mb-16 pt-4 text-left">
          <RouterLink v-for="product in galleryProducts" :key="product.slug"
            :to="`/product/${product.slug}`"  @click="$emit('close')"
            class="relative max-w-[73px] max-h-[73px] aspect-square overflow-hidden bg-white/5 border border-white/10 hover:border-[#d6ae79] transition-all duration-300 rounded-sm group">
            <img :src="product.image" :alt="product.name"
              class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-[#0c2438]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
              <span class="text-[8px] text-[#d6ae79] font-semibold uppercase tracking-wider">{{ product.name }}</span>
            </div>
          </RouterLink>
        </div>

      </div>

      <!-- НИЖНЯЯ ЧАСТЬ -->
      <div class="flex flex-col gap-5 mt-auto">

        <!-- Блок FOLLOW US -->
        <div class="flex flex-col items-start gap-4">
          <h4 class="font-heading text-[28px] tracking-wide">{{ t('mobileMenu.followUsTitle') }}</h4>
          <div class="grid grid-cols-4 w-full max-w-[280px] border border-white/20 divide-x divide-white/20">
            <a href="#" class="flex items-center justify-center p-3.5 hover:text-[#d6ae79] hover:bg-white/5 transition">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" class="flex items-center justify-center p-3.5 hover:text-[#d6ae79] hover:bg-white/5 transition">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="#" class="flex items-center justify-center p-3.5 hover:text-[#d6ae79] hover:bg-white/5 transition">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" class="flex items-center justify-center p-3.5 hover:text-[#d6ae79] hover:bg-white/5 transition">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path
                  d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Блок CONTACT -->
        <div class="flex flex-col items-start gap-4">
          <h4 class="font-heading text-[28px] tracking-wide">{{ t('mobileMenu.contactTitle') }}</h4>
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm font-light text-gray-300">
            <a href="tel:+1234567890" class="flex items-center gap-2 text-[16px] hover:text-[#d6ae79] transition">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ t('mobileMenu.phone') }}
            </a>
            <a href="mailto:info@platinumagrogroup.com"
              class="flex items-center gap-2 text-base hover:text-[#d6ae79] transition">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ t('mobileMenu.email') }}
            </a>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>