// scripts/generate-sitemap.mjs
//
// Запуск: node scripts/generate-sitemap.mjs
// Рекомендуется вызывать перед каждой сборкой (см. package.json ниже)
//
// Генерирует public/sitemap.xml на основе:
//   - статичных страниц (главная, about, contact, категории)
//   - всех товаров (fruits + vegetables) из src/data/products.js

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { productsMeta } from '../src/data/products.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Замените на ваш реальный домен
const SITE_URL = 'https://YOUR-DOMAIN.com'

const today = new Date().toISOString().split('T')[0]

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/category/fruits', priority: '0.9', changefreq: 'weekly' },
  { path: '/category/vegetables', priority: '0.9', changefreq: 'weekly' }
]

const allProducts = [...productsMeta.fruits, ...productsMeta.vegetables]

const productPages = allProducts.map(product => ({
  path: `/product/${product.slug}`,
  priority: '0.8',
  changefreq: 'monthly'
}))

const allPages = [...staticPages, ...productPages]

const urlEntries = allPages
  .map(
    page => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

const outputPath = path.resolve(__dirname, '../public/sitemap.xml')
fs.writeFileSync(outputPath, xml, 'utf-8')

console.log(`✅ sitemap.xml сгенерирован: ${allPages.length} URL`)
console.log(`   - Статичных страниц: ${staticPages.length}`)
console.log(`   - Товаров: ${productPages.length}`)
console.log(`   - Файл: ${outputPath}`)
