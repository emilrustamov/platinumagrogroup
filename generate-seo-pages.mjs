// generate-seo-pages.mjs (лежит в КОРНЕ проекта, рядом с package.json)
// Запускается ПОСЛЕ `vite build`. Создаёт для каждой страницы из pagesSeo,
// А ТАКЖЕ для каждого товара из productsMeta — отдельный dist/<path>/index.html
// с уже готовыми <title>/<meta> тегами. Это единственный способ, чтобы боты
// Facebook/WhatsApp/Telegram/LinkedIn (они НЕ выполняют JS) видели правильный
// rich-link превью для КАЖДОГО товара отдельно, а не только для 5 статичных страниц.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// Файл лежит в корне, поэтому dist/ и src/ — на том же уровне (без ../)
import { pagesSeo, defaultSeo, SITE_URL, SITE_NAME } from './src/config/seo.config.js'
// ↓↓↓ ПОПРАВЬ путь, если у тебя products.js лежит не в src/data/
import { productsMeta } from './src/data/products.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST_DIR = resolve(__dirname, 'dist')
const INDEX_PATH = resolve(DIST_DIR, 'index.html')

if (!existsSync(INDEX_PATH)) {
  console.error('❌ dist/index.html не найден. Сначала запусти `vite build`.')
  process.exit(1)
}

const baseHtml = readFileSync(INDEX_PATH, 'utf-8')

function buildHeadTags({ title, description, image, keywords, path }) {
  const url = `${SITE_URL}${path}`
  const esc = (str) => String(str).replace(/"/g, '&quot;')

  return `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="keywords" content="${esc(keywords)}">
    <link rel="canonical" href="${url}">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${esc(SITE_NAME)}">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:image" content="${image}">
    <meta property="og:url" content="${url}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="${image}">
  `.trim()
}

function injectHead(html, seoData) {
  const headTags = buildHeadTags(seoData)
  let result = html.replace(/<title>.*?<\/title>/i, '')
  result = result.replace(/<head>/i, `<head>\n    ${headTags}\n`)
  return result
}

function writePage(path, seoData) {
  const html = injectHead(baseHtml, { ...seoData, path })

  if (path === '/') {
    writeFileSync(INDEX_PATH, html, 'utf-8')
    console.log(`✅ /  → dist/index.html`)
    return
  }

  const outDir = resolve(DIST_DIR, path.replace(/^\//, ''))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(resolve(outDir, 'index.html'), html, 'utf-8')
  console.log(`✅ ${path}  → dist${path}/index.html`)
}

// ---- ЧАСТЬ 1: статичные страницы из pagesSeo (как было) ----
Object.values(pagesSeo).forEach((seo) => {
  writePage(seo.path, {
    title: seo.title || defaultSeo.title,
    description: seo.description || defaultSeo.description,
    image: seo.ogImage || defaultSeo.ogImage,
    keywords: seo.keywords || defaultSeo.keywords,
  })
})

// ---- ЧАСТЬ 2: динамические страницы товаров из productsMeta ----
// У товара нет своего title/description — генерируем по шаблону из slug/category/country.
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function categoryLabel(category) {
  // 'fruits' -> 'Fruit', 'vegetables' -> 'Vegetable' (единственное число для заголовка)
  return category === 'fruits' ? 'Fruit' : 'Vegetable'
}

const allProducts = [
  ...(productsMeta.fruits || []),
  ...(productsMeta.vegetables || []),
]

allProducts.forEach((product) => {
  const name = capitalize(product.slug)
  const typeLabel = categoryLabel(product.category)

  writePage(`/product/${product.slug}`, {
    title: `${name} — Wholesale Fresh ${typeLabel} Export | ${SITE_NAME}`,
    description: `Buy wholesale ${name.toLowerCase()} sourced directly from ${product.country}. Premium quality, reliable export logistics with ${SITE_NAME}.`,
    // OG-картинка должна быть АБСОЛЮТНЫМ URL — добавляем SITE_URL к пути из products.js
    image: `${SITE_URL}${product.image}`,
    keywords: `${product.slug}, ${product.category}, wholesale ${product.slug}, ${product.slug} export, ${product.country} ${product.slug}, fresh ${product.slug}`,
  })
})

console.log(`\n🎉 Готово! Сгенерировано ${Object.keys(pagesSeo).length} статичных страниц + ${allProducts.length} страниц товаров.`)
