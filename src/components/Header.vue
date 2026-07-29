<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

import MegaMenu from './MegaMenu.vue'
import CompanyPanel from './CompanyPanel.vue'

const { t } = useI18n()

const isScrolled = ref(false)
const isMegaOpen = ref(false)
const isPanelOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isMobileProductsOpen = ref(false)

let timeout = null

const onScroll = () => {
  isScrolled.value = window.scrollY > 40
}

const openMega = () => {
  clearTimeout(timeout)
  isMegaOpen.value = true
}

const closeMega = () => {
  timeout = setTimeout(() => {
    isMegaOpen.value = false
  }, 150)
}

const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value
  if (isPanelOpen.value) isMobileMenuOpen.value = false
}

const closePanel = () => {
  isPanelOpen.value = false
}

const toggleMobileProducts = () => {
  isMobileProductsOpen.value = !isMobileProductsOpen.value
}

const headerClasses = computed(() =>
  isScrolled.value
    ? 'md:bg-prime/25 md:backdrop-blur-xl md:shadow-lg md:border-white/20'
    : 'md:bg-transparent'
)

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 transition-all duration-300 flex justify-center px-[20px] pt-4 md:pt-8">

    <div
      class="border border-white/40 h-[56px] md:h-[84px] lg:h-[110px] max-w-[1140px] w-full mx-2 sm:mx-4 bg-black/10 backdrop-blur-md relative transition-all duration-300"
      :class="headerClasses">
      <div class="flex items-center justify-between w-full h-full">

        <RouterLink to="/"
          class="hero-title flex justify-center items-center h-full px-3 sm:px-4 md:px-6 lg:px-8 border-r border-white/30 shrink-0">
          <img src="/images/logo.webp" alt="Платинум Агро Групп"
            class="h-16 sm:h-18 md:h-20 lg:h-36 w-auto object-contain" />
        </RouterLink>

        <nav
          class="hidden md:flex items-center justify-center gap-4 lg:gap-8 xl:gap-12 px-4 lg:px-8 xl:px-10 min-w-0 overflow-hidden">
          <RouterLink to="/"
            class="text-white hover:text-prime transition text-[12px] lg:text-[16px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap"
            style="text-shadow: 0 2px 8px rgba(0,0,0,0.4);">
            {{ t('nav.home') }}
          </RouterLink>

          <div class="relative" @mouseenter="openMega" @mouseleave="closeMega">
            <button
              class="flex items-center gap-1.5 text-white hover:text-prime transition text-[12px] lg:text-[16px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap"
              style="text-shadow: 0 2px 8px rgba(0,0,0,0.4);">
              {{ t('nav.products') }}
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <MegaMenu :open="isMegaOpen" @mouseenter="openMega" @mouseleave="closeMega" />
          </div>

          <RouterLink to="/about"
            class="text-white hover:text-prime transition text-[12px] lg:text-[16px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap"
            style="text-shadow: 0 2px 8px rgba(0,0,0,0.4);">
            {{ t('nav.about') }}
          </RouterLink>

          <RouterLink to="/contact"
            class="text-white hover:text-prime transition text-[12px] lg:text-[16px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap"
            style="text-shadow: 0 2px 8px rgba(0,0,0,0.4);">
            {{ t('nav.contact') }}
          </RouterLink>
        </nav>

        <div class="md:hidden flex items-center justify-center flex-1 h-full">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="text-white font-body hover:text-prime transition text-[13px] font-semibold uppercase tracking-[0.12em] flex items-center gap-1 focus:outline-none"
            style="text-shadow: 0 2px 8px rgba(0,0,0,0.4);" aria-label="Toggle Navigation">
            {{ t('nav.menu') }}
            <svg class="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div class="flex items-center h-full border-l border-white/30 px-3 md:px-2 lg:px-8 shrink-0 ml-auto">
          <button @click="togglePanel"
            class="group flex flex-col justify-center items-center w-12 h-12 md:w-14 md:h-14 gap-[6px] focus:outline-none"
            aria-label="Toggle Menu">
            <div
              class="w-[20px] md:w-[42px] h-[6px] md:h-[10px] border border-white bg-transparent transition-all duration-300 ease-in-out group-hover:border-prime"
              :class="isPanelOpen ? 'translate-y-[6px] md:translate-y-[8px] rotate-45' : ''"></div>
            <div
              class="w-[20px] md:w-[42px] h-[6px] md:h-[10px] border border-white bg-transparent transition-all duration-300 ease-in-out group-hover:border-prime"
              :class="isPanelOpen ? '-translate-y-[6px] md:-translate-y-[8px] rotate-[-45deg]' : ''"></div>
          </button>
        </div>

      </div>

      <transition enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform opacity-0 scale-95 -translate-y-2"
        enter-to-class="transform opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform opacity-100 scale-100 translate-y-0"
        leave-to-class="transform opacity-0 scale-95 -translate-y-2">
        <div v-if="isMobileMenuOpen"
          class="absolute top-[60px] left-0 right-0 w-full bg-black/95 backdrop-blur-xl border border-white/20 p-6 flex flex-col gap-5 z-50 shadow-2xl rounded-b-lg">
          <RouterLink to="/" @click="isMobileMenuOpen = false"
            class="text-white hover:text-prime text-[14px] uppercase tracking-wider font-medium transition">{{
              t('nav.home') }}</RouterLink>
          <div class="flex flex-col gap-3">
            <button @click="toggleMobileProducts"
              class="text-white hover:text-prime text-[14px] uppercase tracking-wider font-medium transition flex items-center justify-between w-full text-left focus:outline-none group">
              <span>{{ t('nav.products') }}</span>
              <svg class="w-4 h-4 transition-all duration-300 text-gray-400 group-hover:text-prime"
                :class="isMobileProductsOpen ? 'rotate-180 text-prime' : ''" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="overflow-hidden transition-all duration-500 ease-in-out pl-4 border-l border-white/10"
              :class="isMobileProductsOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'">
              <div class="flex flex-col gap-3 py-2">
                <MegaMenu :open="isMobileProductsOpen" @click="isMobileMenuOpen = false"
                  @close-all="isMobileProductsOpen = false" />
              </div>
            </div>
          </div>
          <RouterLink to="/about" @click="isMobileMenuOpen = false"
            class="text-white hover:text-prime text-[14px] uppercase tracking-wider font-medium transition">{{
              t('nav.about') }}</RouterLink>
          <RouterLink to="/contact" @click="isMobileMenuOpen = false"
            class="text-white hover:text-prime text-[14px] uppercase tracking-wider font-medium transition">{{
              t('nav.contact') }}</RouterLink>
        </div>
      </transition>

    </div>
  </header>

  <CompanyPanel :open="isPanelOpen" @close="closePanel" />
</template>