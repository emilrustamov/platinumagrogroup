<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="min-h-[100vh] flex flex-col items-center justify-center text-center px-5 py-16 overflow-hidden bg-[radial-gradient(ellipse_at_50%_20%,#FFF8EF_0%,#FFEFDC_55%,#FFE6C8_100%)]">

    <!-- Сцена с фруктами вокруг "404" -->
    <div class="relative w-full max-w-[440px] h-[220px] flex items-center justify-center mb-4">

      <!-- "404" — тот же почерк, что и hero.titleLine3 (font-heading, extrabold, text-prime) -->
      <span class="nf-pop relative z-10 font-heading font-extrabold tracking-tight leading-none text-[clamp(72px,16vw,140px)] text-prime">
        404
      </span>

      <!-- Фрукты — 7 штук, разлетаются вокруг цифр и мягко покачиваются -->
      <svg class="nf-fruit nf-fruit-1 absolute z-20 left-[6%] top-[18%] w-11 h-11" viewBox="0 0 46 46" fill="none">
        <circle cx="23" cy="25" r="18" fill="#E8432C"/>
        <path d="M23 7c2-3 6-3 6 1" stroke="#3B6B4A" stroke-width="3" stroke-linecap="round" fill="none"/>
      </svg>

      <svg class="nf-fruit nf-fruit-2 absolute z-20 right-[8%] top-[10%] w-12 h-12" viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="28" r="20" fill="#F4A11E"/>
        <path d="M26 8c1.5-3 5-3 5 1" stroke="#B9803F" stroke-width="3" stroke-linecap="round" fill="none"/>
      </svg>

      <svg class="nf-fruit nf-fruit-3 absolute z-20 left-[14%] bottom-[6%] w-10 h-11" viewBox="0 0 40 46" fill="none">
        <path d="M20 8c9 0 14 9 14 18 0 10-7 18-14 18S6 36 6 26C6 17 11 8 20 8Z" fill="#8FAE49"/>
        <path d="M20 8c1-4 5-6 8-4" stroke="#3B6B4A" stroke-width="3" stroke-linecap="round" fill="none"/>
      </svg>

      <svg class="nf-fruit nf-fruit-4 absolute z-20 right-[3%] bottom-[14%] w-11 h-11" viewBox="0 0 44 44" fill="none">
        <circle cx="14" cy="26" r="8" fill="#7B4FA0"/>
        <circle cx="24" cy="22" r="8" fill="#8B5FB0"/>
        <circle cx="30" cy="30" r="8" fill="#7B4FA0"/>
        <circle cx="18" cy="34" r="8" fill="#8B5FB0"/>
        <path d="M22 12c1-3 5-4 7-1" stroke="#3B6B4A" stroke-width="3" stroke-linecap="round" fill="none"/>
      </svg>

      <svg class="nf-fruit nf-fruit-5 absolute z-0 left-[36%] top-[2%] w-9 h-9" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="20" r="14" fill="#F6C445"/>
        <path d="M18 6c1-2.5 4-2.5 4 0.5" stroke="#B9803F" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      </svg>

      <svg class="nf-fruit nf-fruit-6 absolute z-0 right-[30%] bottom-[0%] w-9 h-9" viewBox="0 0 36 36" fill="none">
        <circle cx="12" cy="18" r="9" fill="#D9483F"/>
        <circle cx="24" cy="18" r="9" fill="#E85A50"/>
        <path d="M18 4c0-3 3-4 3-4" stroke="#3B6B4A" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      </svg>

      <svg class="nf-fruit nf-fruit-7 absolute z-0 left-[2%] bottom-[32%] w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="18" r="12" fill="#E8432C"/>
        <path d="M16 4c1.5-2.5 5-2.5 5 0.5" stroke="#3B6B4A" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      </svg>

    </div>

    <!-- Бейдж-брендинг, тот же стиль, что hero.brand -->
    <div class="nf-fade-1 font-deg text-sm font-medium text-secondary bg-transparent uppercase w-fit border border-secondary/40 rounded-full px-6 py-3">
      {{ t('notFound.badge') }}
    </div>

    <!-- Заголовок — тот же почерк, что hero.titleLine2 (font-heading, bold, text-secondary) -->
    <h1 class="nf-fade-2 font-heading font-bold text-secondary text-3xl sm:text-4xl leading-tight py-3">
      {{ t('notFound.title') }}
    </h1>

    <p class="nf-fade-3 text-sm md:text-base text-gray-500 leading-relaxed pb-9 max-w-[420px]">
      {{ t('notFound.descriptionLine1') }}
      <br class="hidden sm:block">
      {{ t('notFound.descriptionLine2') }}
    </p>

    <!-- Кнопка — тот же стиль, что кнопки в hero (border, bg-secondary, uppercase tracking) -->
    <RouterLink
      to="/"
      class="nf-fade-4 inline-flex items-center justify-center border border-black/60 bg-secondary hover:border-prime text-white hover:text-white hover:bg-prime px-8 lg:px-10 py-2.5 lg:py-3.5 text-[14px] lg:text-[16px] font-semibold uppercase tracking-[3px] transition-all duration-300">
      {{ t('notFound.button') }}
    </RouterLink>

  </section>
</template>

<style scoped>
/* Только сама анимация здесь — вся остальная стилизация выше на Tailwind + твоих
   проектных классах (font-heading, text-secondary, text-prime). */

.nf-pop {
  opacity: 0;
  transform: scale(0.9);
  animation: softPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s forwards;
}

.nf-fruit {
  opacity: 0;
}

.nf-fruit-1 { animation: fruitIn1 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.55s forwards, fruitIdle 3.1s ease-in-out 1.2s infinite; }
.nf-fruit-2 { animation: fruitIn2 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.65s forwards, fruitIdle 2.7s ease-in-out 1.35s infinite; }
.nf-fruit-3 { animation: fruitIn3 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.75s forwards, fruitIdle 3.3s ease-in-out 1.5s infinite; }
.nf-fruit-4 { animation: fruitIn4 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.85s forwards, fruitIdle 2.9s ease-in-out 1.65s infinite; }
.nf-fruit-5 { animation: fruitIn5 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.95s forwards, fruitIdle 3.5s ease-in-out 1.8s infinite; }
.nf-fruit-6 { animation: fruitIn6 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 1.05s forwards, fruitIdle 3s ease-in-out 1.95s infinite; }
.nf-fruit-7 { animation: fruitIn7 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.12s forwards, fruitIdle 3.4s ease-in-out 2.05s infinite; }

.nf-fade-1, .nf-fade-2, .nf-fade-3, .nf-fade-4 {
  opacity: 0;
  transform: translateY(14px);
  animation: fadeUp 0.5s ease-out forwards;
}
.nf-fade-1 { animation-delay: 1.4s; }
.nf-fade-2 { animation-delay: 1.52s; }
.nf-fade-3 { animation-delay: 1.64s; }
.nf-fade-4 { animation-delay: 1.76s; }

@keyframes softPop {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes fruitIn1 {
  0% { opacity: 0; transform: translate(-12px, -22px) rotate(0deg); }
  100% { opacity: 1; transform: translate(0, 0) rotate(-18deg); }
}
@keyframes fruitIn2 {
  0% { opacity: 0; transform: translate(14px, -22px) rotate(0deg); }
  100% { opacity: 1; transform: translate(0, 0) rotate(16deg); }
}
@keyframes fruitIn3 {
  0% { opacity: 0; transform: translate(-14px, 20px) rotate(0deg); }
  100% { opacity: 1; transform: translate(0, 0) rotate(-22deg); }
}
@keyframes fruitIn4 {
  0% { opacity: 0; transform: translate(14px, 20px) rotate(0deg); }
  100% { opacity: 1; transform: translate(0, 0) rotate(24deg); }
}
@keyframes fruitIn5 {
  0% { opacity: 0; transform: translate(0, -18px) rotate(0deg); }
  100% { opacity: 1; transform: translate(0, 0) rotate(-10deg); }
}
@keyframes fruitIn6 {
  0% { opacity: 0; transform: translate(10px, 16px) rotate(0deg); }
  100% { opacity: 1; transform: translate(0, 0) rotate(14deg); }
}
@keyframes fruitIn7 {
  0% { opacity: 0; transform: translate(-10px, 14px) rotate(0deg); }
  100% { opacity: 1; transform: translate(0, 0) rotate(-14deg); }
}

@keyframes fruitIdle {
  0%, 100% { margin-top: 0; }
  50% { margin-top: -3px; }
}

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .nf-pop, .nf-fruit, .nf-fade-1, .nf-fade-2, .nf-fade-3, .nf-fade-4 {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>