<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Создаем реактивные переменные для полей
const name = ref('')
const email = ref('')
const message = ref('')
const isSubmitted = ref(false)

// Функция отправки формы
const handleSubmit = () => {
  console.log('Данные формы отправлены:', {
    name: name.value,
    email: email.value,
    message: message.value
  })
  
  // Показываем сообщение об успехе
  isSubmitted.value = true
  
  // Очищаем поля после отправки
  name.value = ''
  email.value = ''
  message.value = ''
  
  // Скрываем сообщение через 3 секунды
  setTimeout(() => {
    isSubmitted.value = false
  }, 3000)
}
</script>

<template>
  <!-- Компонент занимает 100% ширины того родительского блока, куда ты его вставишь -->
  
  <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-10">
    
    <!-- Поле: Your Name -->
    <div class="w-full relative">
      <input 
        v-model="name"
        type="text" 
        :placeholder="t('contactForm.name')" 
        class="w-full bg-transparent border-b border-gray-300 pb-3 text-[16px] text-secondary placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors rounded-none tracking-wide"
        required
      />
    </div>

    <!-- Поле: Your Email -->
    <div class="w-full relative">
      <input 
        v-model="email"
        type="email" 
        :placeholder="t('contactForm.email')" 
        class="w-full bg-transparent border-b border-gray-300 pb-3 text-[16px] text-secondary placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors rounded-none tracking-wide"
        required
      />
    </div>

    <!-- Поле: Your Message -->
    <div class="w-full relative">
      <input 
        v-model="message"
        type="text" 
        :placeholder="t('contactForm.message')" 
        class="w-full bg-transparent border-b border-gray-300 pb-3 text-[16px] text-secondary placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors rounded-none tracking-wide"
        required
      />
    </div>

    <!-- Кнопка SEND -->
    <button 
      type="submit" 
      class="w-fit bg-[#122842] text-white text-[12px] uppercase tracking-[0.25em] font-medium px-12 py-4 hover:bg-prime transition-colors duration-300 rounded-none font-syncopate mt-4 cursor-pointer"
    >
      {{ t('contactForm.send') }}
    </button>

    <!-- Сообщение об успешной отправке -->
    <div v-if="isSubmitted" class="text-green-600 text-sm mt-2">
      {{ t('contactForm.success') }}
    </div>

  </form>
</template>