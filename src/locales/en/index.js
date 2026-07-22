import hero from './hero.js'
import nav from './nav.js'
import homeSections from './home-sections.js'
import faq from './faq.js'
import testimonials from './testimonials.js'
import blog from './blog.js'
import about from './about.js'
import contact from './contact.js'
import products from './products/index.js'
import notFound from './not-found.js'

export default {
  ...hero,
  ...nav,
  ...homeSections,
  ...faq,
  ...testimonials,
  ...blog,
  ...about,
  ...contact,
  ...products,
  ...notFound
}