<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { productsMeta } from '@/data/products.js'

const { t, tm } = useI18n()

const isVisible = ref(false)
const sectionRef = ref(null)
let observer = null

// tm() достаёт "сырой" объект { items: { slug: {...} } } из locale-файла (products.items)
// и объединяем с техническими данными (id, slug, category, country, image, imageBg) по slug
const allProducts = computed(() => {
    const translatedItems = tm('products.items') || {}
    return [
        ...productsMeta.fruits.map(item => ({
            ...item,
            name: translatedItems[item.slug]?.name || item.slug
        })),
        ...productsMeta.vegetables.map(item => ({
            ...item,
            name: translatedItems[item.slug]?.name || item.slug
        }))
    ]
})

const displayProducts = computed(() => allProducts.value)

onMounted(() => {
    // На мобильных (узкий экран) секция с 22 товарами в 1 колонку становится очень
    // высокой - 15% от неё физически не помещается в кадр, поэтому там используем 0.
    // На десктопе (широкий экран, 4 колонки) секция компактнее - оставляем 0.15 как было.
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const dynamicThreshold = isMobile ? 0 : 0.15

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
        threshold: dynamicThreshold,
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
    <section ref="sectionRef" class="bg-[#fdf4dc] py-16 mx-auto bg-gray-50 flex flex-col items-center">
        <div class="w-full mx-auto">
            <!-- Заголовок - появляется первым -->
            <div class="text-center px-4 pb-12 flex flex-col gap-4 w-full" :class="{ 'animate-title': isVisible }" :style="{
                opacity: isVisible ? '1' : '0',
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: '0s'
            }">
                <h2 class="font-deg bg-transparent text-sm font-medium text-secondary uppercase mb-4 w-fit border border-secondary/40 rounded-full px-6 py-4"
                    style="margin-left: auto; margin-right: auto;">
                    {{ t('productsSection.badge') }}
                </h2>

                <h3 class="font-heading text-4xl sm:text-5xl font-light text-secondary">{{ t('productsSection.title') }}</h3>

                <p class="font-body text-gray-500 max-w-2xl text-[16px] text-center" style="margin: 0 auto 0 auto;">
                    {{ t('productsSection.subtitle') }}
                </p>
            </div>

            <!-- Сетка товаров - появляется после заголовка -->
            <div class="flex justify-center" :class="{ 'animate-grid': isVisible }" :style="{
                opacity: isVisible ? '1' : '0',
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: '0.3s'
            }">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full px-4">
                    <div v-for="(product, index) in displayProducts" :key="product.id + '-' + product.category"
                        class="group relative overflow-hidden bg-transparent transition-all duration-500" :style="{
                            opacity: isVisible ? '1' : '0',
                            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                            transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
                            transitionDelay: isVisible ? `${0.4 + index * 0.1}s` : '0s'
                        }">
                        <!-- Изображение -->
                        <div class="relative overflow-hidden h-80 bg-gray-100">
                            <img :src="product.imageBg" :alt="product.name"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div
                                class="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.15)] pointer-events-none z-10">
                            </div>
                            <div
                                class="absolute bottom-0 left-0 right-0 flex justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-20">
                                <RouterLink :to="`/product/${product.slug}`"
                                    class="w-auto px-4 py-3 bg-secondary text-white text-sm font-medium uppercase tracking-wider hover:bg-prime transition-colors duration-300">
                                    {{ t('productsSection.viewProductButton') }}
                                </RouterLink>
                            </div>
                        </div>

                        <div class="pt-4 px-0">
                            <div class="flex justify-between items-baseline gap-2">
                                <h4 class="text-lg font-normal text-secondary">{{ product.name }}</h4>
                            </div>
                            <p class="text-xs text-gray-400 uppercase tracking-[0.2em] mt-2 text-left">
                                {{ product.category === 'fruits' ? t('productsSection.categoryFruits') : t('productsSection.categoryVegetables') }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Кнопка ALL PRODUCTS - появляется последней -->
            <div class="mt-12 flex flex-wrap items-center justify-center gap-6 pt-8" :style="{
                opacity: isVisible ? '1' : '0',
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: isVisible ? '0.7s' : '0s'
            }">
                <RouterLink to="/category/fruits"
                    class="w-48 px-4 py-3 bg-secondary text-white text-sm font-medium uppercase tracking-wider hover:bg-prime transition-colors duration-300 text-center">
                    {{ t('productsSection.categoryFruits') }}
                </RouterLink>
                <RouterLink to="/category/vegetables"
                    class="w-48 px-4 py-3 bg-secondary text-white text-sm font-medium uppercase tracking-wider hover:bg-prime transition-colors duration-300 text-center">
                    {{ t('productsSection.categoryVegetables') }}
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<style scoped>
html {
    scroll-behavior: smooth;
}
</style>