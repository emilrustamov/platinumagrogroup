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
  <section ref="sectionRef" class="w-full grid grid-cols-1 md:grid-cols-2 min-h-[550px] bg-white select-none overflow-hidden">

    <!-- ЛЕВАЯ ПАНЕЛЬ: Изображение - появляется слева направо -->
    <div 
      class="w-full h-[220px] md:h-auto bg-gray-100 overflow-hidden relative flex items-center justify-center"
      :style="{
        clipPath: isVisible ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
        transition: 'clip-path 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: '0.1s'
      }"
    >
      <img 
        src="/images/contact.webp" 
        alt="Fresh Organic Fruits" 
        class="w-[80%] h-[80%] object-contain"
      />
    </div>

    <!-- ПРАВАЯ ПАНЕЛЬ: Форма - появляется снизу вверх -->
    <div 
      class="flex items-center justify-start py-16 px-8 sm:px-16 lg:px-24"
      :style="{
        opacity: isVisible ? '1' : '0',
        transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
        transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: '0.4s'
      }"
    >
      <div class="max-w-md w-full">
        <h2
          class="font-heading text-4xl sm:text-[44px] font-light text-secondary leading-[1.15] pb-6 md:pb-12 tracking-wide"
          :style="{
            opacity: isVisible ? '1' : '0',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: '0.5s'
          }"
          v-html="t('contactGet.title')"
        >
        </h2>
        
        <!-- Форма появляется с задержкой -->
        <div
          :style="{
            opacity: isVisible ? '1' : '0',
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: '0.6s'
          }"
        >
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