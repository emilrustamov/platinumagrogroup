<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const activeCard = ref(null)
const cardRefs = ref([])
const isVisible = ref(false)
const sectionRef = ref(null)
let observer = null

const toggleCard = (index) => {
  if (activeCard.value === index) {
    activeCard.value = null
  } else {
    activeCard.value = index

    nextTick(() => {
      setTimeout(() => {
        const element = cardRefs.value[index]
        if (element) {
          const top = element.getBoundingClientRect().top + window.pageYOffset - 100
          window.scrollTo({
            top: top,
            behavior: 'smooth'
          })
        }
      }, 350)
    })
  }
}

// Визуальные данные (картинки, цвета, задержки) остаются в коде
const cardMeta = [
  { id: 1, image: '/images/supp/11.jpg', bgColor: 'bg-pink-100', delay: '0s' },
  { id: 2, image: '/images/supp/sup-he-2.jpg', bgColor: 'bg-purple-100', delay: '0.15s' },
  { id: 3, image: '/images/supp/sup-he-3.jpg', bgColor: 'bg-blue-100', delay: '0.3s' }
]

// tm() достаёт "сырой" массив { title, description, description2 } из locale-файла (about.cards)
// и объединяем с визуальными данными по индексу
const cards = computed(() => {
  const translated = tm('about.cards')
  return cardMeta.map((meta, index) => ({
    ...meta,
    title: translated[index]?.title,
    description: translated[index]?.description,
    description2: translated[index]?.description2
  }))
})

onMounted(() => {
  // Создаем Intersection Observer
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
        // Отключаем observer после первого срабатывания
        if (observer && sectionRef.value) {
          observer.unobserve(sectionRef.value)
        }
      }
    })
  }, {
    threshold: 0.2, // Срабатывает когда 20% блока видно
    rootMargin: '0px 0px -50px 0px' // Немного смещаем триггер
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
  <section ref="sectionRef" class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div class="w-full">
      <!-- Сетка карточек - 3 колонки на всю ширину -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <div 
          v-for="(card, index) in cards" 
          :key="card.id" 
          :ref="el => cardRefs[index] = el"
          class="group transition-all duration-700 card-item"
          :class="{
            'is-visible': isVisible
          }"
          :style="{
            transitionDelay: card.delay,
            opacity: isVisible ? '1' : '0',
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)'
          }"
        >
          <!-- Контейнер с overflow hidden чтобы скрывать текст -->
          <div class="relative overflow-visible">
            <!-- Главная карточка (верхний слой) -->
            <div
              class="relative overflow-hidden rounded-lg transition-all duration-500 z-10 min-h-[320px] flex items-center justify-center"
              :class="[
                card.bgColor,
                { 'scale-105': activeCard === index }
              ]" 
              :style="{
                backgroundImage: `url(${card.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }"
            >
              <div class="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500"></div>

              <!-- Кнопка в центре карточки -->
              <button 
                @click="toggleCard(index)"
                class="relative z-20 px-8 py-3 bg-white text-black font-medium text-sm uppercase tracking-wider hover:bg-secondary hover:text-white transition-all duration-300 shadow-lg"
              >
                {{ activeCard === index ? t('about.closeButton') : t('about.viewDetailsButton') }}
              </button>
            </div>

            <!-- Текстовый блок (выезжает из-за карточки снизу) -->
            <div
              class="bg-white rounded-b-lg shadow-md overflow-hidden transition-all duration-500 ease-in-out relative"
              :style="{
                maxHeight: activeCard === index ? '500px' : '0px',
                opacity: activeCard === index ? '1' : '0',
                transform: activeCard === index ? 'translateY(0)' : 'translateY(-20px)',
                marginTop: activeCard === index ? '0px' : '0px',
                zIndex: activeCard === index ? '5' : '0'
              }"
            >
              <div class="p-6">
                <h3 class="text-2xl font-bold text-secondary pb-4">{{ card.title }}</h3>
                <p class="text-sm text-gray-600 leading-relaxed pb-2">{{ card.description }}</p>
                <p class="text-sm text-gray-600 leading-relaxed">{{ card.description2 }}</p>
              </div>
            </div>
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

/* Анимация выезда текста из-за карточки */
.overflow-hidden {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* КАРТОЧКИ ПОЯВЛЯЮТСЯ ПЛАВНО ПРИ СКРОЛЛЕ */
.card-item {
  transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card-item.is-visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
</style>