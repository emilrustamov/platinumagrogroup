// Эти ключи нужно объединить (merge) с содержимым en-products.js
// в общий объект локали, например:
//   import { products } from './en-products.js'
//   export default { products, productsSection, productDetail, categoryPage, ... }

// Эти ключи нужно объединить (merge) с содержимым en-products.js
// в общий объект локали, например:
//   import { products } from './en-products.js'
//   export default { products, productsSection, productDetail, categoryPage, ... }

export const productsSection = {
  badge: 'Премиальный импорт',
  title: 'Превосходство в глобальных поставках',
  subtitle: 'Мы доставляем лучшие фрукты и овощи мира на ваш рынок, закупая их у лучших ферм и поставляя с бескомпромиссным качеством.',
  viewProductButton: 'Посмотреть товар',
  categoryFruits: 'Фрукты',
  categoryVegetables: 'Овощи'
}

export const productDetail = {
  categoryFruits: 'Фрукты',
  categoryVegetables: 'Овощи',
  categoryDefault: 'Продукты',
  collectionSuffix: 'Коллекция',
  tagline: 'Защита для ваших вещей в сочетании с уникальным и модным дизайном для тех, кто ищет стиль и практичность.',
  specificationsTitle: 'Характеристики продукта',
  cultivarsLabel: 'Сорта',
  packagingLabel: 'Упаковка',
  minOrderLabel: 'Мин. заказ',
  priceLabel: 'Цена',
  priceValue: 'Цена по запросу',
  complianceNote: 'Все продукты соответствуют международным стандартам качества.',
  noDescription: 'Описание отсутствует.',
  noBenefits: 'Информация о пользе отсутствует.',
  noNutritional: 'Информация о пищевой ценности отсутствует.',
  noTrade: 'Данные о внешней торговле отсутствуют.',
  tabs: {
    description: 'Описание продукта',
    benefits: 'Польза',
    nutritional: 'Пищевая ценность',
    trade: 'Данные о внешней торговле'
  },
  // {productNameLower} и {productNamePlural} подставляются через t(key, { productNameLower, productNamePlural })
  universalDescription: 'С Platinum AgroGroup покупка {productNameLower} со всего мира становится очень простой. Platinum AgroGroup как компания-поставщик органических фруктов и овощей способна экспортировать необходимое вам количество в любую точку мира. Будучи одной из лучших дистрибьюторских компаний, мы поставляем только самые свежие фрукты и овощи для вас. Все наши {productNamePlural}, будь то свежие или сушёные, производятся с должным вниманием проверенными фермерами по всему миру. Мы готовы и полны решимости предоставить вам лучшие {productNamePlural} со всего света. Как международный экспортёр оптовых свежих фруктов и овощей, наша миссия — познакомить мир с продуктами, которые мы любим и производим с усердием.'
}

export const categoryPage = {
  titleFruits: 'Фрукты',
  titleVegetables: 'Овощи',
  titleDefault: 'Продукты',
  collectionSuffix: 'Коллекция',
  viewProductButton: 'Посмотреть товар',
  allProducts: 'Все продукты'
}