import { useHead } from '@vueuse/head'
import { computed, unref } from 'vue'
import { useI18n } from 'vue-i18n'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, defaultSeo } from '@/config/seo.config.js'

// vue-i18n локаль -> код для og:locale (Facebook и др. ждут формат "en_US", "be_BY")
const OG_LOCALE_MAP = {
  en: 'en_US',
  ru: 'ru_RU'
}

/**
 * Устанавливает мета-теги (title, description, Open Graph, canonical) для текущей страницы.
 *
 * Использование в компоненте:
 *
 *   useSeo({
 *     title: 'Wholesale Apples — Платинум Агро Групп',
 *     description: 'Premium wholesale apples exported from ..',
 *     path: '/product/apple',
 *     image: '/images/fruits/apple.webp',   // необязательно, иначе дефолтная OG-картинка
 *     type: 'product'                        // необязательно, по умолчанию 'website'
 *   })
 *
 * Поддерживает реактивные значения (ref/computed) для страниц товаров,
 * где title/description зависят от загруженных данных.
 */
export function useSeo(options) {
  const { locale } = useI18n()

  const opts = computed(() => {
    const raw = typeof options === 'function' ? options() : options
    return {
      title: unref(raw?.title) || defaultSeo.title,
      description: unref(raw?.description) || defaultSeo.description,
      path: unref(raw?.path) || '/',
      image: unref(raw?.image)
        ? `${SITE_URL}${unref(raw.image)}`
        : defaultSeo.ogImage,
      type: unref(raw?.type) || 'website',
      keywords: unref(raw?.keywords) || defaultSeo.keywords,
      noindex: unref(raw?.noindex) || false
    }
  })

  const fullTitle = computed(() =>
    opts.value.title.includes(SITE_NAME) ? opts.value.title : `${opts.value.title}`
  )

  const canonicalUrl = computed(() => `${SITE_URL}${opts.value.path}`)
  const ogLocale = computed(() => OG_LOCALE_MAP[locale.value] || 'en_US')

  useHead({
    title: fullTitle,
    htmlAttrs: computed(() => ({ lang: locale.value })),
    meta: computed(() => [
      { name: 'description', content: opts.value.description },
      { name: 'keywords', content: opts.value.keywords },
      { name: 'robots', content: opts.value.noindex ? 'noindex, nofollow' : 'index, follow' },

      // Open Graph — читают Facebook, LinkedIn, WhatsApp, Telegram, Pinterest, Slack и т.д.
      { property: 'og:type', content: opts.value.type },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: opts.value.title },
      { property: 'og:description', content: opts.value.description },
      { property: 'og:image', content: opts.value.image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: opts.value.title },
      { property: 'og:url', content: canonicalUrl.value },
      { property: 'og:locale', content: ogLocale.value },

      // Twitter Card — у Twitter/X свой формат, Open Graph не читает
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: opts.value.title },
      { name: 'twitter:description', content: opts.value.description },
      { name: 'twitter:image', content: opts.value.image }

      // Место под верификацию Google Search Console (добавим, когда появится код):
      // { name: 'google-site-verification', content: 'ВАШ_КОД_ОТ_GOOGLE' }
    ]),
    link: computed(() => [
      { rel: 'canonical', href: canonicalUrl.value }
    ])
  })
}

/**
 * Добавляет JSON-LD структурированные данные Schema.org Product на страницу товара.
 * Google может показать расширенный сниппет (цена, наличие, рейтинг) в результатах поиска.
 *
 * Использование:
 *   useProductStructuredData({
 *     name: computed(() => product.value?.name),
 *     description: computed(() => details.value?.description?.[0]),
 *     image: computed(() => `${SITE_URL}${product.value?.image}`),
 *     slug: computed(() => product.value?.slug)
 *   })
 */
export function useProductStructuredData(options) {
  const opts = computed(() => {
    const raw = typeof options === 'function' ? options() : options
    return {
      name: unref(raw?.name) || '',
      description: unref(raw?.description) || '',
      image: unref(raw?.image) || DEFAULT_OG_IMAGE,
      slug: unref(raw?.slug) || ''
    }
  })

  const jsonLd = computed(() => ({
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: opts.value.name,
    description: opts.value.description,
    image: opts.value.image,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${opts.value.slug}`,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      // Цена не публикуется на сайте ("Please Ask Quote"), поэтому priceSpecification не указываем.
      // Если появится публичная цена — добавьте price: '123.45'
    }
  }))

  useHead({
    script: computed(() => [
      {
        type: 'application/ld+json',
        children: JSON.stringify(jsonLd.value)
      }
    ])
  })
}

/**
 * Добавляет JSON-LD Organization на главную страницу — помогает Google показать
 * карточку компании (Knowledge Panel) с логотипом, соцсетями и т.д.
 */
export function useOrganizationStructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.jpg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+375 44 598-58-92',
      contactType: 'customer service',
      email: 'info@platinumagrogroup.com'
    },
    sameAs: [
      // Добавьте реальные ссылки на соцсети
      // 'https://www.instagram.com/platinumagrogroup',
      // 'https://www.facebook.com/platinumagrogroup'
    ]
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(jsonLd)
      }
    ]
  })
}