<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { productsMeta } from '@/data/products.js'
import { useSeo, useProductStructuredData } from '@/composables/useSeo.js'

const { t, tm } = useI18n()
const route = useRoute()
const isVisible = ref(false)
const sectionRef = ref(null)
let observer = null

const productSlug = computed(() => route.params.slug)

// Технические данные о товаре (картинки, категория, страна)
const productMeta = computed(() => {
    const all = [...productsMeta.fruits, ...productsMeta.vegetables]
    return all.find(p => p.slug === productSlug.value)
})

// tm() достаёт "сырой" объект { items: { slug: {...} } } из locale-файла (products.items)
const details = computed(() => {
    const translatedItems = tm('products.items') || {}
    return translatedItems[productSlug.value] || {}
})

const product = computed(() => {
    if (!productMeta.value) return null
    return {
        ...productMeta.value,
        name: details.value.name || productMeta.value.slug
    }
})

const galleryImages = computed(() => {
    const images = []
    if (productMeta.value?.image) images.push(productMeta.value.image)
    if (productMeta.value?.imageBg) images.push(productMeta.value.imageBg)
    return images.length > 0 ? images : ['/images/placeholder.jpg']
})

const heroBackgroundImage = computed(() => {
    if (productMeta.value?.category === 'fruits') {
        return '/images/f-orange.webp'
    } else if (productMeta.value?.category === 'vegetables') {
        return '/images/v-orange.webp'
    }
    return '/images/f-orange.webp'
})

const categoryTitle = computed(() => {
    if (productMeta.value?.category === 'fruits') {
        return t('productDetail.categoryFruits')
    } else if (productMeta.value?.category === 'vegetables') {
        return t('productDetail.categoryVegetables')
    }
    return t('productDetail.categoryDefault')
})

// УНИВЕРСАЛЬНЫЙ ТЕКСТ ДЛЯ ВСЕХ ПРОДУКТОВ (ОДИН РАЗ), формируется через i18n interpolation
const descriptionText = computed(() => {
    const productName = product.value?.name || 'product'
    const productNameLower = productName.toLowerCase()
    const productNamePlural = productNameLower + 's'

    return t('productDetail.universalDescription', {
        productNameLower,
        productNamePlural
    })
})

// ===== SEO: title/description собираются динамически из данных товара =====
const seoTitle = computed(() => {
    if (!product.value) return undefined
    return `${product.value.name} — Wholesale Export | Platinum AgroGroup`
})

const seoDescription = computed(() => {
    if (!details.value?.description?.[0]) return undefined
    // Берём первый абзац описания, обрезаем до ~155 символов (стандарт для meta description)
    const text = details.value.description[0]
    return text.length > 155 ? text.slice(0, 152).trim() + '...' : text
})

const seoKeywords = computed(() => {
    if (!product.value) return undefined
    const nameLower = product.value.name.toLowerCase()
    const categoryWord = product.value.category === 'fruits' ? 'fruit' : 'vegetable'
    return `${nameLower}, wholesale ${nameLower}, ${nameLower} export, ${categoryWord}, worldwide ${categoryWord}, fresh ${nameLower}`
})

useSeo(() => ({
    title: seoTitle.value,
    description: seoDescription.value,
    path: `/product/${product.value?.slug || ''}`,
    image: product.value?.imageBg || product.value?.image,
    type: 'product',
    keywords: seoKeywords.value
}))

useProductStructuredData(() => ({
    name: product.value?.name,
    description: seoDescription.value,
    image: product.value?.imageBg || product.value?.image || '',
    slug: product.value?.slug
}))
// ===== конец блока SEO =====

const activeTab = ref('description')

const tabs = computed(() => [
    { id: 'description', label: t('productDetail.tabs.description') },
    { id: 'benefits', label: t('productDetail.tabs.benefits') },
    { id: 'nutritional', label: t('productDetail.tabs.nutritional') },
    { id: 'trade', label: t('productDetail.tabs.trade') }
])

const tabContent = computed(() => {
    switch (activeTab.value) {
        case 'description':
            return {
                title: t('productDetail.tabs.description'),
                content: details.value.description?.length ? details.value.description : t('productDetail.noDescription')
            }
        case 'benefits':
            return {
                title: t('productDetail.tabs.benefits'),
                content: details.value.benefits?.length ? details.value.benefits : t('productDetail.noBenefits')
            }
        case 'nutritional':
            return {
                title: t('productDetail.tabs.nutritional'),
                content: details.value.nutritionalValue?.length ? details.value.nutritionalValue : t('productDetail.noNutritional')
            }
        case 'trade':
            return {
                title: t('productDetail.tabs.trade'),
                content: details.value.foreignTradeData?.length ? details.value.foreignTradeData : t('productDetail.noTrade')
            }
        default:
            return { title: '', content: '' }
    }
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
    <section class="relative w-full !bg-orange-200 pt-[200px] h-[500px] flex items-center justify-center overflow-hidden">

        <div class="absolute inset-0 w-full h-full bg-contain bg-no-repeat animate-zoomIn" :style="{
            backgroundImage: `url('${heroBackgroundImage}')`,
            backgroundPosition: 'center right 10%',
            backgroundSize: 'contain'
        }"></div>

        <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-2xl flex flex-col gap-3">
                <div
                    class="font-deg text-sm font-medium text-gray-600 uppercase mb-4 w-fit border border-black rounded-full px-6 py-4 mx-auto">
                    {{ categoryTitle }}
                </div>
                <h1 class="text-5xl sm:text-6xl md:text-7xl font-light text-gray-800 leading-tight font-heading">
                    {{ categoryTitle }} {{ t('productDetail.collectionSuffix') }}
                </h1>
            </div>
        </div>

        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <div class="animate-bounce cursor-pointer">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </div>
    </section>

    <section ref="sectionRef" class="!bg-white w-full bg-white py-16 mx-auto">
        <div class="max-w-6xl w-full px-6 justify-self-center">

            <div class="text-sm text-gray-400 py-8">
                <span class="mx-2">/</span>
                <RouterLink :to="`/category/${product?.category}`" class="hover:text-prime">
                    {{ product?.category }}
                </RouterLink>
                <span class="mx-2">/</span>
                <span class="text-gray-600">{{ product?.name }}</span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative">

                <!-- ЛЕВАЯ КОЛОНКА: ИЗОБРАЖЕНИЯ -->
                <div class="flex flex-col gap-4">
                    <div v-for="(img, index) in galleryImages" :key="index"
                        class="relative overflow-hidden rounded-lg aspect-[4/3]">
                        <img :src="img" :alt="`${product?.name} ${index + 1}`"
                            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                </div>

                <!-- ПРАВАЯ КОЛОНКА: STICKY БЛОК -->
                <div class="lg:sticky pt-10 lg:top-24">
                    <div class="flex flex-col gap-6">
                        <h1 class="font-heading text-3xl sm:text-4xl font-light text-[#1a2b4c]">
                            {{ product?.name }}
                        </h1>
                        <p class="text-gray-500 text-[16px] leading-relaxed">
                            {{ t('megaMenu.importedFrom', { country: product?.countries?.map(c => t('countries.' + c)).join(', ') || '' }) }}
                        </p>

                        <!-- ИНФОРМАЦИЯ О ПРОДУКТЕ -->
                        <div class="mt-6 p-6 bg-white rounded-xl border border-gray-100 shadow-sm space-y-4">
                            <h3 class="text-[13px] font-bold text-gray-400 uppercase tracking-wider pb-4">
                                {{ t('productDetail.specificationsTitle') }}
                            </h3>

                            <div v-if="details.cultivars"
                                class="flex flex-col sm:flex-row sm:items-start py-2 border-b border-gray-50 last:border-0 gap-1 sm:gap-4">
                                <div class="flex items-center gap-2 sm:w-1/4 shrink-0">
                                    <span class="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                                    <span class="font-semibold text-[16px] text-gray-700">{{ t('productDetail.cultivarsLabel') }}</span>
                                </div>
                                <span class="text-[16px] text-gray-600 leading-relaxed sm:w-3/4">{{ details.cultivars
                                    }}</span>
                            </div>

                            <div v-if="details.packaging"
                                class="flex flex-col sm:flex-row sm:items-start py-2 border-b border-gray-50 last:border-0 gap-1 sm:gap-4">
                                <div class="flex items-center gap-2 sm:w-1/4 shrink-0">
                                    <span class="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                                    <span class="font-semibold text-[16px] text-gray-700">{{ t('productDetail.packagingLabel') }}</span>
                                </div>
                                <span class="text-[16px] text-gray-600 leading-relaxed sm:w-3/4">{{ details.packaging
                                    }}</span>
                            </div>

                            <div v-if="details.minOrder"
                                class="flex flex-col sm:flex-row sm:items-start py-2 border-b border-gray-50 last:border-0 gap-1 sm:gap-4">
                                <div class="flex items-center gap-2 sm:w-1/4 shrink-0">
                                    <span class="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                                    <span class="font-semibold text-[16px] text-gray-700">{{ t('productDetail.minOrderLabel') }}</span>
                                </div>
                                <span
                                    class="text-[16px] text-gray-600 leading-relaxed sm:w-3/4 font-medium text-gray-900">{{
                                        details.minOrder }}</span>
                            </div>
                            <div
                                class="flex flex-col sm:flex-row sm:items-start py-2 border-b border-gray-50 last:border-0 gap-1 sm:gap-4">
                                <div class="flex items-center gap-2 sm:w-1/4 shrink-0">
                                    <span class="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                                    <span class="font-semibold text-[16px] text-gray-700">{{ t('productDetail.priceLabel') }}</span>
                                </div>
                                <span
                                    class="text-[16px] text-gray-600 leading-relaxed sm:w-3/4 font-medium text-gray-900">{{
                                        t('productDetail.priceValue') }}</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <!-- ТАБЫ -->


        </div>
    </section>
</template>

<style scoped>
.sticky {
    position: sticky;
}
</style>