<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { articlesMeta } from '@/data/articles.js'

const { t, tm } = useI18n()

const isVisible = ref(false)
const sectionRef = ref(null)
let observer = null

// tm() достаёт "сырой" массив { date, category, title, desc, fullContent } из locale-файла (blog.articles)
// и объединяем с техническими данными (id, image, slug, aspect, translate) по индексу
const articlesData = computed(() => {
  const translated = tm('blog.articles')
  return articlesMeta.map((meta, index) => ({
    ...meta,
    date: translated[index]?.date,
    category: translated[index]?.category,
    title: translated[index]?.title,
    desc: translated[index]?.desc,
    fullContent: translated[index]?.fullContent
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
  <section ref="sectionRef" class="w-full py-24 bg-[#f3eae1] flex flex-col items-center justify-center font-jost select-none relative overflow-hidden">
    <div class="max-w-6xl w-full px-6 flex flex-col gap-8">
      
      <!-- ШАПКА БЛОКА - появляется первой снизу вверх -->
      <div 
        class="w-full flex flex-col gap-4 lg:gap-8 items-center text-center mb-16"
        :style="{
          opacity: isVisible ? '1' : '0',
          transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
          transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: '0s'
        }"
      >
        <h2 class="font-heading text-4xl sm:text-5xl font-light text-secondary mb-4">
            {{ t('blog.title') }}
        </h2>
        <p class="font-body text-secondary text-[18px] leading-relaxed max-w-xl">
          {{ t('blog.subtitle') }}
        </p>
      </div>

      <!-- КОНТЕЙНЕР С КНОПКОЙ И СЕТКОЙ -->
      <div class="w-full relative">
        
        <!-- КНОПКА ALL BLOG - появляется второй -->
        <!-- <RouterLink 
          to="/blog"
          class="inline-block border border-gray-400 bg-transparent text-secondary text-[11px] uppercase tracking-[0.2em] font-medium px-8 py-3.5 hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-300 rounded-none text-center mb-8 md:mb-0 md:absolute md:top-12 md:right-0 z-20"
          :style="{
            opacity: isVisible ? '1' : '0',
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: '0.15s'
          }"
        >
          {{ t('blog.allBlogButton') }}
        </RouterLink> -->

        <!-- СЕТКА КАРТОЧЕК -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 items-start w-full relative z-10 pt-8 md:pt-0">
          
          <!-- КАРТОЧКИ - появляются по очереди снизу вверх -->
          <div 
            v-for="(article, index) in articlesData" 
            :key="article.id" 
            class="flex flex-col w-full transition-all duration-300 group"
            :class="article.translate"
            :style="{
              opacity: isVisible ? '1' : '0',
              transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
              transition: `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
              transitionDelay: isVisible ? `${0.3 + index * 0.15}s` : '0s'
            }"
          >
            <div class="w-full overflow-hidden mb-6 aspect-[3/4] bg-gray-200">
              <img 
                :src="article.image" 
                :alt="article.title" 
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
              />
            </div>

            <div class="flex items-center justify-between pb-4">
              <span class="font-deg bg-secondary text-white text-[11px] font-light uppercase tracking-wider px-5 py-2.5 rounded-full">
                {{ article.date }}
              </span>
              <span class="text-[10px] text-gray-400 uppercase tracking-[0.15em]">
                {{ article.category }}
              </span>
            </div>

            <h3 class="font-heading text-xl lg:text-[28px] font-light text-secondary leading-[1.25] pb-4">
              {{ article.title }}
            </h3>
            <p class="text-secondary/60 text-[16px] leading-relaxed pb-4">
              {{ article.desc }}
            </p>

            <!-- <RouterLink 
              :to="'/blog/' + article.slug" 
              class="text-[16px] text-secondary uppercase tracking-wider flex items-center gap-2 hover:text-[#c9a87c] transition-colors transform transition-transform duration-300 inline-block group-hover:translate-x-1.5 w-fit relative"
              style="font-weight: 500;"
            >             
              &rarr; {{ t('blog.viewMoreButton') }}
            </RouterLink> -->
          </div>

        </div>
      </div>

      <div class="hidden md:block h-48"></div>

    </div>
  </section>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>