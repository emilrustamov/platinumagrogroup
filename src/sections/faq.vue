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

// tm() достаёт "сырой" массив объектов из locale-файла (faq.questions)
const faqs = computed(() => tm('faq.questions'))

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
  <section ref="sectionRef" class="w-full flex justify-center bg-white py-16 px-6 select-none">
    <div class="max-w-6xl w-full flex flex-col font-jost">

      <h2 
        class="font-heading text-center text-3xl lg:text-[50px] font-light text-secondary pb-12"
        :style="{
          opacity: isVisible ? '1' : '0',
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: '0s'
        }"
      >
        {{ t('faq.title') }}
      </h2>

      <div 
        class="w-full flex flex-col"
        :style="{
          opacity: isVisible ? '1' : '0',
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: '0.2s'
        }"
      >
        <div 
          v-for="(faq, index) in faqs" 
          :key="index" 
          class="border-b border-gray-200 py-8 flex flex-col transition-all duration-300"
          :style="{
            opacity: isVisible ? '1' : '0',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            transitionDelay: isVisible ? `${0.3 + index * 0.1}s` : '0s'
          }"
        >
          <div 
            @click="toggleQuestion(index)" 
            class="flex justify-between items-center cursor-pointer select-none group"
          >
            <h3 class="text-[26px] font-normal text-secondary tracking-wide group-hover:text-prime transition-colors">
              {{ faq.title }}
            </h3>
            <span class="text-[14px] font-medium tracking-[0.2em] uppercase transition-colors"
                  :class="activeQuestion === index ? 'text-gray-400' : 'text-gray-800'">
              {{ activeQuestion === index ? t('faq.close') : t('faq.view') }}
            </span>
          </div>

          <div 
            class="grid transition-all duration-500 ease-in-out overflow-hidden"
            :class="activeQuestion === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'"
          >
            <div class="overflow-hidden">
              <p class="text-gray-400 text-[18px] leading-relaxed w-full">
                {{ faq.content }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.grid-rows-\[0fr\] {
  grid-template-rows: 0fr;
}
.grid-rows-\[1fr\] {
  grid-template-rows: 1fr;
}
</style>