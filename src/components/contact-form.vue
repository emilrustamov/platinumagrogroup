<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// variant="full"    - полная форма (имя, email, сообщение) - страница контактов
// variant="compact"  - только email, вертикально - футер (подписка)
// variant="inline"   - только email, в одну строку - секция Join (оранжевый блок)
const props = defineProps({
  variant: {
    type: String,
    default: 'full',
    validator: (v) => ['full', 'compact', 'inline'].includes(v)
  }
})

// Создаем реактивные переменные для полей
const name = ref('')
const email = ref('')
const message = ref('')
const isSubmitted = ref(false)

// ===== ЕДИНАЯ ТОЧКА НАСТРОЙКИ ОТПРАВКИ ПОЧТЫ =====
// Когда будете подключать реальную отправку (API/EmailJS/backend) -
// меняйте только этот код. Он одинаково применится на странице
// контактов, в футере и в секции Join, потому что все три места
// используют именно этот компонент, просто с разным variant.
const handleSubmit = () => {
  console.log('Данные формы отправлены:', {
    variant: props.variant,
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
// ===== конец блока настройки отправки =====
</script>

<template>
  <!-- ПОЛНАЯ ФОРМА (имя, email, сообщение) - страница контактов -->
  <form v-if="variant === 'full'" @submit.prevent="handleSubmit" class="w-full flex flex-col gap-10">

    <div class="w-full relative">
      <input
        v-model="name"
        type="text"
        :placeholder="t('contactForm.name')"
        class="w-full bg-transparent border-b border-gray-300 pb-3 text-[16px] text-secondary placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors rounded-none tracking-wide"
        required
      />
    </div>

    <div class="w-full relative">
      <input
        v-model="email"
        type="email"
        :placeholder="t('contactForm.email')"
        class="w-full bg-transparent border-b border-gray-300 pb-3 text-[16px] text-secondary placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors rounded-none tracking-wide"
        required
      />
    </div>

    <div class="w-full relative">
      <input
        v-model="message"
        type="text"
        :placeholder="t('contactForm.message')"
        class="w-full bg-transparent border-b border-gray-300 pb-3 text-[16px] text-secondary placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors rounded-none tracking-wide"
        required
      />
    </div>

    <button
      type="submit"
      class="w-fit bg-[#122842] text-white text-[12px] uppercase tracking-[0.25em] font-medium px-12 py-4 hover:bg-prime transition-colors duration-300 rounded-none font-syncopate mt-4 cursor-pointer"
    >
      {{ t('contactForm.send') }}
    </button>

    <div v-if="isSubmitted" class="text-green-600 text-sm mt-2">
      {{ t('contactForm.success') }}
    </div>
  </form>

  <!-- КОМПАКТНАЯ ФОРМА (только email, вертикально) - футер / подписка -->
  <form v-else-if="variant === 'compact'" @submit.prevent="handleSubmit" class="max-w-[320px] flex flex-col gap-4">

    <input
      v-model="email"
      type="email"
      :placeholder="t('footer.emailPlaceholder')"
      class="w-full bg-transparent border border-white/20 px-4 py-3 text-[16px] text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors rounded-none"
      required
    />

    <button
      type="submit"
      class="w-fit bg-prime text-white text-[11px] uppercase tracking-[0.25em] font-medium px-10 py-3.5 border border-transparent hover:bg-transparent hover:text-prime hover:border-prime transition-colors duration-300 rounded-none font-syncopate"
    >
      {{ t('footer.send') }}
    </button>

    <div v-if="isSubmitted" class="text-green-400 text-xs mt-1">
      {{ t('contactForm.success') }}
    </div>
  </form>

  <!-- СТРОЧНАЯ ФОРМА (email + кнопка в одну строку) - секция Join -->
  <form v-else @submit.prevent="handleSubmit" class="w-full flex items-end gap-0 font-jost">

    <div class="flex-1 relative">
      <input
        v-model="email"
        type="email"
        :placeholder="t('join.emailPlaceholder')"
        class="w-full bg-transparent border-b border-gray-600/70 pb-3 text-sm text-secondary placeholder-gray-600/60 focus:outline-none focus:border-secondary transition-colors rounded-none tracking-wide"
        required
      />
    </div>

    <button
      type="submit"
      class="bg-secondary text-white text-[11px] uppercase tracking-[0.25em] font-medium px-8 py-3.5 hover:bg-prime transition-colors duration-300 rounded-none font-syncopate flex-shrink-0"
    >
      {{ t('join.sendButton') }}
    </button>
  </form>

  <div v-if="variant === 'inline' && isSubmitted" class="text-green-700 text-xs mt-2">
    {{ t('contactForm.success') }}
  </div>
</template>