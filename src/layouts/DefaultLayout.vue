<template>
  <div class="min-h-screen flex flex-col text-gray-900 antialiased">
    <Header />  
    <!-- main на всю ширину -->
    <main class="flex-1 w-full">
     
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const scrollProgress = ref(0)

const handleScroll = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight

  scrollProgress.value = docHeight > 0
    ? (scrollTop / docHeight) * 100
    : 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-indicator {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0;
  background: var(--color-primary);
  z-index: 9999;
  transition: width .15s ease;
}
</style>