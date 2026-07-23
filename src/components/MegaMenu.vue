<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { productsMeta } from '@/data/products.js'

const { t, tm } = useI18n()

const props = defineProps({
  open: Boolean
})

defineEmits(['mouseenter', 'mouseleave', 'close-all'])

// tm() достаёт "сырой" объект { items: { slug: {...} } } из locale-файла (products.items)
// и объединяем с техническими данными (id, slug, image, country) по slug
const translatedItems = computed(() => tm('products.items') || {})

const fruits = computed(() =>
  productsMeta.fruits.map(item => ({
    ...item,
    name: translatedItems.value[item.slug]?.name || item.slug
  }))
)

const vegetables = computed(() =>
  productsMeta.vegetables.map(item => ({
    ...item,
    name: translatedItems.value[item.slug]?.name || item.slug
  }))
)

const isFruitsOpen = ref(false)
const isVegetablesOpen = ref(false)

const preview = ref(null)

watch(
  () => props.open,
  (value) => {
    if (value) {
      preview.value = fruits.value[0]
      isFruitsOpen.value = false
      isVegetablesOpen.value = false
    }
  }
)

watch(fruits, (value) => {
  if (!preview.value) {
    preview.value = value[0]
  }
}, { immediate: true })

const setPreview = (item) => {
  preview.value = item
}

const toggleFruits = () => {
  isFruitsOpen.value = !isFruitsOpen.value
  if (isFruitsOpen.value) {
    isVegetablesOpen.value = false
  }
}

const toggleVegetables = () => {
  isVegetablesOpen.value = !isVegetablesOpen.value
  if (isVegetablesOpen.value) {
    isFruitsOpen.value = false
  }
}
</script>

<template>
  <div
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
    class="
      relative left-0 top-0 w-full translate-x-0 bg-transparent border-none shadow-none mt-2
      md:fixed md:left-1/2 md:-translate-x-1/2 md:top-[100px] md:w-[92%] lg:w-[1140px] md:bg-white md:border md:border-gray-200 md:shadow-2xl md:mt-0
      transition-all duration-300
    "
    :class="[
      open
        ? 'opacity-100 visible translate-y-0'
        : 'opacity-0 invisible -translate-y-4 pointer-events-none md:absolute'
    ]"
  >
    <div class="grid grid-cols-1 md:grid-cols-12 md:min-h-[420px] lg:min-h-[520px]">

      <!-- LEFT -->
      <div class="col-span-1 md:col-span-7 px-2 py-2 md:px-6 md:py-6 lg:px-14 lg:py-14 md:border-r md:border-gray-200 text-left">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-16">

          <!-- FRUITS -->
          <div class="border-b border-white/10 md:border-b-0 pb-3 md:pb-0">
            <div class="mb-2 md:mb-8">
              
              <div class="md:hidden flex items-center justify-between w-full py-2 group">
                <RouterLink
                  to="/category/fruits"
                  @click="$emit('close-all')"
                  class="text-base font-light text-white group-hover:text-amber-500 transition"
                >
                  {{ t('megaMenu.fruitsTitle') }}
                </RouterLink>
                <button
                  @click.stop="toggleFruits"
                  class="p-1 focus:outline-none"
                  :aria-label="t('megaMenu.toggleAriaLabel')"
                >
                  <svg 
                    class="w-5 h-5 transition-all duration-300 text-gray-400 group-hover:text-amber-500" 
                    :class="isFruitsOpen ? 'rotate-180 text-amber-500' : ''" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <RouterLink
                to="/category/fruits"
                @mouseenter="setPreview(fruits[0])"
                class="hidden md:flex items-center gap-3 group text-left"
              >
                <h3 class="text-lg md:text-xl lg:text-2xl font-light text-slate-800 group-hover:text-amber-500 transition">
                  {{ t('megaMenu.fruitsTitle') }}
                </h3>
                <span class="text-amber-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition text-xl">
                  →
                </span>
              </RouterLink>
              <div class="hidden md:block w-12 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300 mt-2"></div>
            </div>
            
            <div class="overflow-hidden transition-all duration-500 ease-in-out md:overflow-visible"
              :class="isFruitsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 md:max-h-[500px] md:opacity-100'">
              <ul class="space-y-1 md:space-y-3 pl-3 md:pl-1 pb-2 md:pb-0">
                <li v-for="fruit in fruits" :key="fruit.slug">
                  <RouterLink
                    :to="`/product/${fruit.slug}`"
                    @click="$emit('close-all')"
                    @mouseenter="setPreview(fruit)"
                    class="group flex items-center justify-between text-[14px] md:text-lg font-light text-gray-400 md:text-slate-700 hover:text-amber-500 transition py-1 md:py-1.5 px-2 md:px-3 rounded-lg hover:bg-white/5 md:hover:bg-amber-50"
                  >
                    <span class="flex items-center gap-2 md:gap-3">
                      <span class="w-1.5 h-1.5 rounded-full bg-amber-300 opacity-0 md:group-hover:opacity-100 transition"></span>
                      {{ fruit.name }}
                    </span>
                    <span class="opacity-0 md:group-hover:opacity-100 md:group-hover:translate-x-2 transition text-amber-500 hidden md:inline">
                      →
                    </span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- VEGETABLES -->
          <div>
            <div class="mb-2 md:mb-8 mt-2 md:mt-0">
              
              <div class="md:hidden flex items-center justify-between w-full py-2 group">
                <RouterLink
                  to="/category/vegetables"
                  @click="$emit('close-all')"
                  class="text-base font-light text-white group-hover:text-amber-500 transition"
                >
                  {{ t('megaMenu.vegetablesTitle') }}
                </RouterLink>
                <button
                  @click.stop="toggleVegetables"
                  class="p-1 focus:outline-none"
                  :aria-label="t('megaMenu.toggleAriaLabel')"
                >
                  <svg 
                    class="w-5 h-5 transition-all duration-300 text-gray-400 group-hover:text-amber-500" 
                    :class="isVegetablesOpen ? 'rotate-180 text-amber-500' : ''" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <RouterLink
                to="/category/vegetables"
                @mouseenter="setPreview(vegetables[0])"
                class="hidden md:flex items-center gap-3 group text-left"
              >
                <h3 class="text-lg md:text-xl lg:text-2xl font-light text-slate-800 group-hover:text-amber-500 transition">
                  {{ t('megaMenu.vegetablesTitle') }}
                </h3>
                <span class="text-amber-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition text-xl">
                  →
                </span>
              </RouterLink>
              <div class="hidden md:block w-12 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300 mt-2"></div>
            </div>
            
            <div class="overflow-hidden transition-all duration-500 ease-in-out md:overflow-visible"
              :class="isVegetablesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 md:max-h-[500px] md:opacity-100'">
              <ul class="space-y-1 md:space-y-3 pl-3 md:pl-1 pb-2 md:pb-0">
                <li v-for="vegetable in vegetables" :key="vegetable.slug">
                  <RouterLink
                    :to="`/product/${vegetable.slug}`"
                    @click="$emit('close-all')"
                    @mouseenter="setPreview(vegetable)"
                    class="group flex items-center justify-between text-[14px] md:text-lg font-light text-gray-400 md:text-slate-700 hover:text-amber-500 transition py-1 md:py-1.5 px-2 md:px-3 rounded-lg hover:bg-white/5 md:hover:bg-amber-50"
                  >
                    <span class="flex items-center gap-2 md:gap-3">
                      <span class="w-1.5 h-1.5 rounded-full bg-amber-300 opacity-0 md:group-hover:opacity-100 transition"></span>
                      {{ vegetable.name }}
                    </span>
                    <span class="opacity-0 md:group-hover:opacity-100 md:group-hover:translate-x-2 transition text-amber-500 hidden md:inline">
                      →
                    </span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <!-- RIGHT (Превью) -->
      <div v-if="preview" class="hidden md:flex col-span-5 bg-[#f7f7f4] p-6 lg:p-12 flex-col">
        <span class="uppercase tracking-[4px] text-xs text-gray-400">
          {{ t('megaMenu.featuredLabel') }}
        </span>

        <h2 class="mt-3 lg:mt-5 text-2xl lg:text-5xl font-light text-slate-900 leading-tight">
          {{ preview.name }}
        </h2>

        <p class="mt-1 lg:mt-3 text-sm lg:text-base text-gray-500">
          <!-- {{ t('megaMenu.importedFrom', { country: t('countries.' + preview.country) }) }} -->
        </p>

        <div class="flex-1 flex items-center justify-center min-h-[180px] lg:min-h-[260px]">
          <Transition
            mode="out-in"
            enter-active-class="duration-300"
            leave-active-class="duration-200"
            enter-from-class="opacity-0 scale-90"
            enter-to-class="opacity-100 scale-100"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-110"
          >
            <img
              :key="preview.slug"
              :src="preview.image"
              :alt="preview.name"
              class="max-h-[200px] lg:max-h-[330px] object-contain"
            />
          </Transition>
        </div>

        <RouterLink
          :to="`/product/${preview.slug}`"
          class="mt-4 lg:mt-8 inline-flex items-center gap-3 uppercase tracking-[3px] text-xs lg:text-sm font-semibold hover:text-amber-500 transition transform transition-transform duration-300 hover:translate-x-1.5"
        >
          {{ t('megaMenu.viewProductButton') }}
          <span>→</span>
        </RouterLink>
      </div>

    </div>
  </div>
</template>