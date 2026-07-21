<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const activeQuestion = ref(0)
const isVisible = ref(false)
const sectionRef = ref(null)
let observer = null

const toggleQuestion = (index) => {
  activeQuestion.value = activeQuestion.value === index ? null : index
}

// Иконки — не текстовые данные, остаются в коде
const featureIcons = [
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="7"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <path d="M11 8v6M8 11h6"></path>
  </svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 12V8H4v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"></path>
    <path d="M20 12a2 2 0 0 0 0 4h2v-4z"></path>
    <path d="M4 8a2 2 0 0 1 2-2h14"></path>
  </svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"></circle>
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2"></path>
    <polyline points="8 12 11 15 16 9"></polyline>
  </svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 5h14v10H1zM15 9h4l3 3v3h-7zM3 18a2 2 0 100-4 2 2 0 000 4zM18 18a2 2 0 100-4 2 2 0 000 4z"/></svg>`
]

// tm() достаёт "сырой" массив { title, desc } из locale-файла (howToOrder.features)
// и объединяем с иконками по индексу
const features = computed(() => {
  const translated = tm('howToOrder.features')
  return featureIcons.map((icon, index) => ({
    icon,
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
  <section ref="sectionRef" class="w-full py-20 bg-white flex items-center justify-center overflow-hidden">
    <div class="max-w-6xl w-full px-6">
      
      <div class="flex flex-col gap-4 lg:gap-12 font-jost">
        
        <!-- ЗАГОЛОВОК - появляется первым снизу вверх -->
        <h2 
          class="font-heading text-3xl lg:text-[40px] font-light text-secondary mb-12 text-center"
          :style="{
            opacity: isVisible ? '1' : '0',
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: '0s'
          }"
        >
          {{ t('howToOrder.title') }}
        </h2>
        
        <!-- Сетка карточек -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          <div 
            v-for="(feature, index) in features" 
            :key="index" 
            class="flex flex-col items-start"
            :style="{
              opacity: isVisible ? '1' : '0',
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
              transitionDelay: isVisible ? `${0.1 + index * 0.1}s` : '0s'
            }"
          >
            <div 
              v-html="feature.icon" 
              class="mb-4 select-none text-prime w-6 h-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
            ></div>
            
            <h4 class="text-[22px] font-normal text-secondary mb-2 tracking-wide">
              {{ feature.title }}
            </h4>
            <p class="text-secondary/60 text-[16px] leading-relaxed max-w-[280px]">
              {{ feature.desc }}
            </p>
          </div>
        </div>
        
      </div>

    </div>
  </section>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>