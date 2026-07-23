<template>
    <!-- Главный контейнер из двух половин -->
    <section ref="sectionRef" class="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">

        <!-- ЛЕВАЯ ПАНЕЛЬ: О компании / Промо (Светло-серый фон) -->
        <div class="bg-[#eaedf0] flex items-center justify-center py-16 px-8 relative overflow-hidden">
            <div class="max-w-md w-full flex flex-col md:flex-row items-center gap-8 relative z-10">

                <!-- Фото модели/одежды слева - АНИМИРУЕТСЯ КАК ЛИМОН -->
                <div class="w-48 h-64 md:w-56 md:h-80 flex-shrink-0 overflow-hidden animate-image" :style="{
                    opacity: isVisible ? '1' : '0',
                    transform: isVisible ? 'scale(1)' : 'scale(0.3)',
                    transition: 'opacity 1s cubic-bezier(0.34, 1.56, 0.64, 1), transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: '0s'
                }">
                    <img src="/images/join/cool-boy.webp" :alt="t('join.imageAlt')"
                        class="w-full h-full object-cover object-top" />
                </div>

                <!-- Текстовый контент справа от фото - БЕЗ АНИМАЦИИ -->
                <div class="flex flex-col gap-8 font-jost text-center md:text-left items-center md:items-start">
                    <div class="text-center mb-4">
                        <h2 class="font-deg text-xs font-medium text-secondary uppercase w-fit border border-secondary/40 bg-transparent rounded-full px-8 py-3"
                            style="margin-left: auto; margin-right: auto;">
                            {{ t('join.badge') }}
                        </h2>
                    </div>
                    <h3 class="text-secondary font-heading text-2xl lg:text-[28px] font-normal leading-snug mb-6">
                        {{ t('join.titleLine1') }}<br>{{ t('join.titleLine2') }}
                    </h3>
                    <RouterLink to="/contact"
                        class="px-8 py-4 border border-secondary bg-transparent text-secondary text-[14px] uppercase tracking-[0.2em] font-medium hover:bg-secondary hover:text-white transition-all duration-300 rounded-none inline-block">
                        {{ t('join.contactButton') }}
                    </RouterLink>
                </div>

            </div>
        </div>

        <!-- ПРАВАЯ ПАНЕЛЬ: Форма подписки Join Now -->
        <div class="bg-orange-200 flex flex-col items-center justify-center py-16 px-8 relative overflow-hidden">
            <div class="max-w-md w-full flex flex-col gap-8 items-center relative z-10">

                <!-- Контейнер для текста-картинки с маской и видео на фоне - АНИМИРУЕТСЯ КАК ЛИМОН -->
                <div class="bg-white px-8 py-6 mb-10 w-full flex justify-center items-center rounded-lg shadow-sm select-none relative overflow-hidden h-32 sm:h-40 animate-block"
                    :style="{
                        opacity: isVisible ? '1' : '0',
                        transform: isVisible ? 'scale(1)' : 'scale(0.3)',
                        transition: 'opacity 1s cubic-bezier(0.34, 1.56, 0.64, 1), transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transitionDelay: '0.2s'
                    }">
                    <video autoplay loop muted playsinline
                        class="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none">
                        <source src="" type="video/mp4" />
                    </video>
                    <img src="/images/join/join-now.webp" :alt="t('join.videoImageAlt')"
                        class="relative z-10 max-h-full w-auto object-contain" />
                </div>

                <!-- Форма ввода email - БЕЗ АНИМАЦИИ -->
                <ContactForm variant="inline" />

            </div>
        </div>

    </section>
</template>

<script setup>
import ContactForm from '@/components/contact-form.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

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

<style scoped>
/* Дополнительные стили не требуются */
</style>