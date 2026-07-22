import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (Home.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/ContactView.vue'),
    },
    {
      path: '/category/:category',
      name: 'category',
      // route level code-splitting
      component: () => import('@/views/ProductsView.vue'),
    },
    {
      path: '/product/:slug',
      name: 'product',
      // route level code-splitting
      component: () => import('@/views/OneProductView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundPage.vue'), // поправь путь под своё расположение
      meta: { noLayout: true }, // ← ЭТА СТРОКА — сигнал для App.vue "не оборачивай в DefaultLayout"
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Если есть сохраненная позиция (например, при нажатии "назад")
    if (savedPosition) {
      return savedPosition
    } else {
      // Иначе скроллим наверх страницы
      return { top: 0 }
    }
  },
})

export default router