// Эти ключи нужно объединить (merge) с содержимым en-products.js
// в общий объект локали, например:
//   import { products } from './en-products.js'
//   export default { products, productsSection, productDetail, categoryPage, ... }

export const productsSection = {
  badge: 'Прэміум імпарт',
  title: 'Выключная якасць пастаўкі з усяго свету',
  subtitle: 'Мы прыносім на ваш рынак найлепшую садавіну і гародніну з усяго свету, набытую на лепшых фермах і дастаўленую з бескампрамісная якасцю.',
  viewProductButton: 'Прагледзець тавар',
  categoryFruits: 'Садавіна',
  categoryVegetables: 'Гародніна'
}

export const productDetail = {
  categoryFruits: 'Садавіна',
  categoryVegetables: 'Гародніна',
  categoryDefault: 'Тавары',
  collectionSuffix: 'Калекцыя',
  tagline: 'Абарона рэчаў з падкрэсленнем унікальнага і моднага дызайну для тых, хто шукае як стыль, так і практычнасць.',
  specificationsTitle: 'Характарыстыкі тавару',
  cultivarsLabel: 'Сарты',
  packagingLabel: 'Пакаванне',
  minOrderLabel: 'Мін. заказ',
  priceLabel: 'Кошт',
  priceValue: 'Запытайце кошт',
  complianceNote: 'Усе тавары адпавядаюць міжнародным стандартам якасці.',
  noDescription: 'Апісанне недаступнае.',
  noBenefits: 'Карысныя ўласцівасці недаступныя.',
  noNutritional: 'Харчовая каштоўнасць недаступная.',
  noTrade: 'Дадзеныя пра гандаль недаступныя.',
  tabs: {
    description: 'Апісанне тавару',
    benefits: 'Карысныя ўласцівасці',
    nutritional: 'Харчовая каштоўнасць',
    trade: 'Знешнегандлёвыя дадзеныя'
  },
  // {productNameLower} і {productNamePlural} падстаўляюцца праз t(key, { productNameLower, productNamePlural })
  universalDescription: 'З Platinum AgroGroup набыць {productNameLower} з усяго свету стала вельмі проста. Platinum AgroGroup як кампанія-пастаўшчык арганічнай садавіны і гародніны можа экспартаваць патрэбную вам колькасць у любую кропку свету. Будучы адной з лепшых кампаній харчовай дыстрыбуцыі, наша кампанія пастаўляе вам толькі найсвяжэйшую садавіну і гародніну. Уся наша {productNamePlural}, свежая яна ці сушаная, вырошчваецца праверанымі фермерамі з усяго свету з належнай увагай. Мы гатовыя і поўныя рашучасці забяспечыць вас найлепшай {productNamePlural} з усяго свету. Як Platinum AgroGroup, міжнародны экспарцёр аптовай свежай садавіны і гародніны, наша місія — прадставіць свету харчаванне, якое мы любім і старанна вырошчваем.'
}

export const categoryPage = {
  titleFruits: 'Садавіна',
  titleVegetables: 'Гародніна',
  titleDefault: 'Тавары',
  collectionSuffix: 'Калекцыя',
  viewProductButton: 'Прагледзець тавар',
  allProducts: 'Усе тавары'
}