<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import ContactForm from '@/components/contact-form.vue'

const { t } = useI18n()

const isVisible = ref(false)
const sectionRef = ref(null)
let observer = null

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
  <section ref="sectionRef" class="w-full py-24 bg-white flex items-center justify-center font-jost select-none overflow-hidden">
    <div class="max-w-6xl w-full px-6 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      <!-- ЛЕВАЯ СТОРОНА: Заголовок - появляется слева направо -->
      <div 
        class="md:col-span-5 flex flex-col items-start text-left"
        :style="{
          opacity: isVisible ? '1' : '0',
          transform: isVisible ? 'translateX(0)' : 'translateX(-60px)',
          transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: '0s'
        }"
      >
        <h2 
          class="font-heading text-5xl sm:text-6xl lg:text-[76px] font-light text-[#1a2b4c] leading-[1.05] uppercase tracking-tight"
          v-html="t('contactSection.title')"
        >
        </h2>
      </div>

      <!-- ПРАВАЯ СТОРОНА: Форма - появляется снизу вверх -->
      <div 
        class="md:col-span-7 bg-[#f3eae1] p-10 sm:p-16 flex items-center justify-center shadow-sm w-full"
        :style="{
          opacity: isVisible ? '1' : '0',
          transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
          transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: '0.3s'
        }"
      >
        <div class="w-full max-w-md">
          <ContactForm />
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