<!-- src/components/LanguageSwitcher.vue -->
<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const languages = [
{ code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'be', name: 'Беларуская', flag: '🇧🇾' }
  
]

const changeLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      v-for="lang in languages"
      :key="lang.code"
      @click="changeLanguage(lang.code)"
      class="px-3 py-1 text-sm rounded transition-colors"
      :class="locale === lang.code ? 'bg-[#d6ae79] text-white' : 'text-gray-300 hover:text-white'"
    >
      {{ lang.flag }} {{ lang.name }}
    </button>
  </div>
</template>