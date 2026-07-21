<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const isVisible = ref(false)
const sectionRef = ref(null)
let observer = null

// Визуальные данные (id, картинки) остаются в коде
const squadMeta = [
  { id: 1, img: '/images/team/user-1.webp' },
  { id: 2, img: '/images/team/user-2.webp' },
  { id: 3, img: '/images/team/user-3.webp' },
  { id: 4, img: '/images/team/user-4.webp' },
  { id: 5, img: '/images/team/user-5.webp' },
  { id: 6, img: '/images/team/user-6.webp' }
]

// tm() достаёт "сырой" массив { name, role } из locale-файла (team.members)
// и объединяем с визуальными данными по индексу
const squad = computed(() => {
  const translated = tm('team.members')
  return squadMeta.map((meta, index) => ({
    ...meta,
    name: translated[index]?.name,
    role: translated[index]?.role
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
  <section ref="sectionRef" class="w-full py-24 bg-white relative overflow-hidden flex flex-col items-center justify-center select-none font-jost">
    
    <!-- ГИГАНТСКИЙ ТЕКСТ -->
    <div class="absolute right-[5vw] bottom-4 pointer-events-none z-0 select-none overflow-hidden hidden md:block opacity-10">
      <svg viewBox="0 0 450 150" class="w-[30vw] h-auto">
        <text x="100%" y="80%" text-anchor="end" class="font-heading text-[130px] font-bold uppercase tracking-[0.05em]"
              fill="none" stroke="#000" stroke-width="1" stroke-dasharray="4 4">
          {{ t('team.watermark') }}
        </text>
      </svg>
    </div>

    <!-- КОНТЕНТНЫЙ БЛОК -->
    <div class="max-w-6xl w-full px-6 flex flex-col gap-8 relative z-10">
      
      <!-- ЗАГОЛОВОК СЕКЦИИ - появляется первым снизу вверх -->
      <div 
        class="w-full flex flex-col gap-8 items-center text-center mb-16"
        :style="{
          opacity: isVisible ? '1' : '0',
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: '0s'
        }"
      >
        <h2 class="font-heading text-4xl sm:text-[40px] font-light text-[#1a2b4c] mb-4">
          {{ t('team.title') }}
        </h2>
        <p class="font-body text-gray-500 text-[16px] leading-relaxed max-w-xl">
          {{ t('team.subtitle') }}
        </p>
      </div>

      <!-- СЕТКА ИЗ 6 КАРТОЧЕК -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 w-full">
        
        <!-- ПЕРВЫЙ РЯД (карточки 1, 2, 3) - появляются вторыми -->
        <div 
          v-for="(member, index) in squad.slice(0, 3)" 
          :key="member.id" 
          class="w-full flex flex-col group"
          :style="{
            opacity: isVisible ? '1' : '0',
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            transitionDelay: isVisible ? `${0.2 + index * 0.1}s` : '0s'
          }"
        >
          <div class="w-full aspect-[1.4/1] relative flex items-center overflow-hidden">
            <div class="absolute right-0 inset-y-0 w-[80%] bg-[#eadecc] md:bg-[#f3eae1] shadow-sm z-0 transition-colors duration-500 md:group-hover:bg-[#eadecc]"></div>
            <div class="w-[50%] aspect-square bg-gray-100 overflow-hidden relative z-10 ml-[5%] shadow-md">
              <img 
                :src="member.img" 
                :alt="member.name" 
                class="w-full h-full object-cover transition-all duration-700 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105" 
              />
            </div>
            <div class="absolute left-[56%] z-20 flex flex-col items-start justify-center transition-all duration-500 ease-out md:translate-y-16 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <h4 class="font-heading text-lg font-normal text-[#1a2b4c] tracking-wide mb-0.5 leading-tight">
                {{ member.name }}
              </h4>
              <span class="font-syncopate text-[9px] uppercase tracking-[0.2em] text-gray-400 block mt-0.5">
                {{ member.role }}
              </span>
            </div>
          </div>
          <div class="hidden md:flex ml-[25%] mt-4 flex-col items-start transition-all duration-300 md:group-hover:opacity-0 md:group-hover:translate-y-2">
            <h4 class="font-heading text-lg font-normal text-[#1a2b4c] tracking-wide mb-0.5">
              {{ member.name }}
            </h4>
            <span class="font-syncopate text-[9px] uppercase tracking-[0.2em] text-gray-400">
              {{ member.role }}
            </span>
          </div>
        </div>

        <!-- ВТОРОЙ РЯД (карточки 4, 5, 6) - появляются третьими -->
        <div 
          v-for="(member, index) in squad.slice(3, 6)" 
          :key="member.id" 
          class="w-full flex flex-col group"
          :style="{
            opacity: isVisible ? '1' : '0',
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            transitionDelay: isVisible ? `${0.5 + index * 0.1}s` : '0s'
          }"
        >
          <div class="w-full aspect-[1.4/1] relative flex items-center overflow-hidden">
            <div class="absolute right-0 inset-y-0 w-[80%] bg-[#eadecc] md:bg-[#f3eae1] shadow-sm z-0 transition-colors duration-500 md:group-hover:bg-[#eadecc]"></div>
            <div class="w-[50%] aspect-square bg-gray-100 overflow-hidden relative z-10 ml-[5%] shadow-md">
              <img 
                :src="member.img" 
                :alt="member.name" 
                class="w-full h-full object-cover transition-all duration-700 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105" 
              />
            </div>
            <div class="absolute left-[56%] z-20 flex flex-col items-start justify-center transition-all duration-500 ease-out md:translate-y-16 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <h4 class="font-heading text-lg font-normal text-[#1a2b4c] tracking-wide mb-0.5 leading-tight">
                {{ member.name }}
              </h4>
              <span class="font-syncopate text-[9px] uppercase tracking-[0.2em] text-gray-400 block mt-0.5">
                {{ member.role }}
              </span>
            </div>
          </div>
          <div class="hidden md:flex ml-[25%] mt-4 flex-col items-start transition-all duration-300 md:group-hover:opacity-0 md:group-hover:translate-y-2">
            <h4 class="font-heading text-lg font-normal text-[#1a2b4c] tracking-wide mb-0.5">
              {{ member.name }}
            </h4>
            <span class="font-syncopate text-[9px] uppercase tracking-[0.2em] text-gray-400">
              {{ member.role }}
            </span>
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