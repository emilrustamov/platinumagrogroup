// Замените на ваш реальный домен
export const SITE_URL = 'https://platinumagrogroup.by'
export const SITE_NAME = 'Platinum AgroGroup'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`

// Ключевые слова по умолчанию (используются, если у страницы нет своих)
export const DEFAULT_KEYWORDS = 'fruit, vegetables, agro, wholesale, export, worldwide, fresh produce, fruit exporter, vegetable exporter'

// Дефолтные мета-данные для страниц, у которых нет собственных (fallback)
export const defaultSeo = {
  title: 'Platinum AgroGroup — Wholesale Fresh Fruits & Vegetables Exporter Worldwide',
  description: 'Platinum AgroGroup is a worldwide exporter of premium wholesale fresh fruits and vegetables, delivering top-quality produce globally with reliable logistics.',
  ogImage: DEFAULT_OG_IMAGE,
  keywords: DEFAULT_KEYWORDS
}

// Мета-данные для статичных страниц (можно расширять)
export const pagesSeo = {
  home: {
    title: 'Platinum AgroGroup — Wholesale Fresh Fruits & Vegetables Exporter Worldwide',
    description: 'Discover premium fresh fruits and vegetables sourced from trusted farms around the world. Wholesale export with reliable logistics and uncompromising quality.',
    path: '/',
    keywords: 'fruit, vegetables, agro, wholesale, export, worldwide, fresh produce, agriculture, farm export'
  },
  about: {
    title: 'About Us — Platinum AgroGroup',
    description: 'Learn about Platinum AgroGroup, a foreign trade supply brand with nearly 10 years of experience in food and agricultural products export.',
    path: '/about',
    keywords: 'about us, agro company, fruit exporter, vegetable exporter, worldwide trade, agriculture business'
  },
  contact: {
    title: 'Contact Us — Platinum AgroGroup',
    description: 'Get in touch with Platinum AgroGroup for wholesale fruit and vegetable inquiries, pricing, and export logistics.',
    path: '/contact',
    keywords: 'contact, fruit supplier contact, vegetable supplier contact, wholesale inquiry, export inquiry'
  },
  fruits: {
    title: 'Fruits — Wholesale Fresh Fruit Export | Platinum AgroGroup',
    description: 'Browse our full range of wholesale fresh fruits sourced worldwide, including apples, apricots, grapes, cherries and more.',
    path: '/category/fruits',
    keywords: 'fruit, fresh fruit, wholesale fruit, fruit export, apple, apricot, grape, cherry, pear, plum, peach, fig, pomegranate, quince, worldwide fruit'
  },
  vegetables: {
    title: 'Vegetables — Wholesale Fresh Vegetable Export | Platinum AgroGroup',
    description: 'Browse our full range of wholesale fresh vegetables sourced worldwide, including tomatoes, potatoes, peppers and more.',
    path: '/category/vegetables',
    keywords: 'vegetables, fresh vegetables, wholesale vegetables, vegetable export, tomato, potato, pepper, cucumber, onion, eggplant, worldwide vegetables'
  }
}