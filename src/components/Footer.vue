<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import contactForm from './contact-form.vue';
import ContactForm from './contact-form.vue';
const { t } = useI18n()
</script>

<template>
    <footer
        class="w-full bg-secondary relative overflow-hidden pt-12 pb-6 font-jost text-white select-none flex flex-col">

        <!-- ДЕКОРАТИВНЫЙ ЛИСТ -->
        <div class="absolute top-0 right-0 pointer-events-none z-0 opacity-20 w-48 sm:w-64 md:w-80 text-white/50">
            <!-- ... SVG ... -->
        </div>

        <!-- ДЕКОРАТИВНЫЙ ЦВЕТОК -->
        <div class="absolute bottom-0 left-0 pointer-events-none z-0 opacity-20 w-48 sm:w-64 md:w-80 text-white/50">
            <!-- ... SVG ... -->
        </div>

        <!-- ОСНОВНОЙ КОНТЕНТ -->
        <div class="max-w-6xl w-full px-6 relative z-10 flex flex-col mx-auto items-center self-center justify-center">

            <!-- ВЕРХНИЙ БАННЕР INSTAGRAM -->
            <div class="w-full max-w-3xl h-32 sm:h-36 relative overflow-hidden flex items-center justify-center bg-cover bg-center px-6 sm:px-10 mx-auto"
                style="background-image: url('/images/f-ter.webp');">
                <div class="absolute inset-0 bg-red-400/40"></div>
                <a href="#"
                    class="relative z-10 w-auto px-2 md:px-5 bg-white text-[#122842] text-xs font-medium uppercase tracking-[0.25em] py-4 shadow-md hover:bg-prime hover:text-white transition-colors duration-300 rounded-none font-syncopate text-center whitespace-nowrap block">
                    {{ t('footer.followUs') }}
                </a>
            </div>

            <!-- СЕТКА С СЫЛКАМИ -->
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 pt-12 gap-10 items-start w-full pb-16 border-b border-white/10">

                <!-- Колонка 1 -->
                <div class="md:col-span-4 flex flex-col gap-4 items-start">
                    <h2 class="font-heading text-3xl flex flex-col font-light tracking-wide mb-6">

                        <span class="text-[18px] opacity-90 tracking-wide">{{ t('footer.lname') }} "Платинум Агро
                            Групп"</span>
                    </h2>
                    <div class="flex flex-col gap-2 text-[16px] text-gray-300 font-light leading-relaxed">
                        <p>{{ t('footer.address') }}</p>
                        <p>{{ t('footer.city') }}</p>
                        <p>{{ t('footer.unp') }} 194008551</p>
                        <p>{{ t('footer.tradeRegistryLabel') }} 780475, {{ t('footer.tradeRegistryDateLabel') }}
                            25.06.2026</p>
                        <p class="mt-2">{{ t('footer.phone') }}</p>
                        <p>{{ t('footer.email') }}</p>
                    </div>
                    <div class="grid grid-cols-4 w-full max-w-[200px] border border-white/20 divide-x divide-white/20">
                        <a href="#"
                            class="flex items-center justify-center p-3.5 hover:text-[#d6ae79] hover:bg-white/5 transition">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path
                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a href="#"
                            class="flex items-center justify-center p-3.5 hover:text-[#d6ae79] hover:bg-white/5 transition">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>
                        <a href="#"
                            class="flex items-center justify-center p-3.5 hover:text-[#d6ae79] hover:bg-white/5 transition">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path
                                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="#"
                            class="flex items-center justify-center p-3.5 hover:text-[#d6ae79] hover:bg-white/5 transition">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path
                                    d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Колонка 2: Pages -->
                <div class="md:col-span-2 flex flex-col items-start">
                    <h4 class="text-[18px] font-medium tracking-wide pb-4 text-white">{{ t('footer.pages') }}</h4>
                    <div class="flex flex-col gap-2 text-[16px] text-gray-300 font-light">
                        <RouterLink to="/" class="hover:text-prime transition-colors">{{ t('footer.home') }}
                        </RouterLink>
                        <RouterLink to="/category/fruits" class="hover:text-prime transition-colors">{{
                            t('footer.fruits') }}</RouterLink>
                        <RouterLink to="/category/vegetables" class="hover:text-prime transition-colors">{{
                            t('footer.vegetables') }}</RouterLink>
                        <RouterLink to="/about" class="hover:text-prime transition-colors">{{ t('footer.about') }}
                        </RouterLink>
                        <RouterLink to="/contact" class="hover:text-prime transition-colors">{{ t('footer.contact') }}
                        </RouterLink>
                    </div>
                </div>

                <!-- Колонка 3: Utility Pages (пусто) -->
                <div class="md:col-span-2 flex flex-col items-start">
                </div>

                <!-- Колонка 4: Contact Us -->
                <div class="md:col-span-4 flex flex-col items-start w-full">
                    <h4 class="text-[18px] font-medium tracking-wide pb-4 text-white">{{ t('footer.contactTitle') }}
                    </h4>
                    <p class="text-[16px] text-gray-300 font-light leading-relaxed pb-5 max-w-xs">
                        {{ t('footer.contactText') }}
                    </p>
                    <ContactForm variant="compact" />
                </div>
            </div>

            <!-- НИЖНЯЯ СТРОКА -->
            <div class="w-full text-center pt-6 flex flex-col gap-3 items-center">
                <p class="font-medium text-[14px] text-[#d6ae79]">{{ t('footer.disclaimer') }}</p>

                <p class="text-[11px] text-gray-400 font-light tracking-wide">
                    2026 {{ t('footer.copyright') }}
                    <a class="text" href="https://ltm.studio/" target="_blank" rel="noopener noreferrer">{{
                        t('footer.studio') }}</a>
                </p>

                <!-- ССЫЛКИ НА ЮРИДИЧЕСКИЕ ДОКУМЕНТЫ -->
                <div
                    class="w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-1 pt-1 text-[11px] text-gray-400">
                    <a href="/documents/privacy-policy.pdf" target="_blank" rel="noopener noreferrer"
                        class="underline hover:text-[#d6ae79] transition-colors">
                        {{ t('footer.privacyPolicy') }}
                    </a>
                    <a href="/documents/personal-data-processing-regulation.pdf" target="_blank" rel="noopener noreferrer"
                        class="underline hover:text-[#d6ae79] transition-colors">
                        {{ t('footer.personalDataRegulation') }}
                    </a>
                </div>
            </div>

        </div>
    </footer>
</template>