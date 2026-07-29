// Эти ключи нужно объединить (merge) с содержимым en-products.js
// в общий объект локали, например:
//   import { products } from './en-products.js'
//   export default { products, productsSection, productDetail, categoryPage, ... }

// Эти ключи нужно объединить (merge) с содержимым en-products.js
// в общий объект локали, например:
//   import { products } from './en-products.js'
//   export default { products, productsSection, productDetail, categoryPage, ... }

export const productsSection = {
  badge: 'Premium Imports',
  title: 'Global Sourcing Excellence',
  subtitle: "We bring the world's finest fruits and vegetables to your market, sourced from the best farms and delivered with uncompromising quality.",
  viewProductButton: 'View Product',
  categoryFruits: 'Fruits',
  categoryVegetables: 'Vegetables'
}

export const productDetail = {
  categoryFruits: 'Fruits',
  categoryVegetables: 'Vegetables',
  categoryDefault: 'Products',
  collectionSuffix: 'Collection',
  tagline: 'Protection for belongings while showcasing a unique and fashionable design for those seeking both flair and practicality.',
  specificationsTitle: 'Product Specifications',
  cultivarsLabel: 'Cultivars',
  packagingLabel: 'Packaging',
  minOrderLabel: 'Min. Order',
  priceLabel: 'Price',
  priceValue: 'Please Ask Quote',
  complianceNote: 'All products comply with international quality standards.',
  noDescription: 'No description available.',
  noBenefits: 'No benefits available.',
  noNutritional: 'No nutritional information available.',
  noTrade: 'No trade data available.',
  tabs: {
    description: 'Product Description',
    benefits: 'Benefits',
    nutritional: 'Nutritional Value',
    trade: 'Foreign Trade Data'
  },
  // {productNameLower} и {productNamePlural} подставляются через t(key, { productNameLower, productNamePlural })
 universalDescription: 'With Платинум Агро Групп buying {productNameLower} from around the world becomes very easy. Платинум Агро Групп as a company of supplier of organic fruits and vegetables is able to export the amount you need to anywhere in the world. As one of the best food distribution companies, our company only delivers the freshest fruits and vegetables for you. All of our {productNamePlural}, whether it is fresh or dried, are produced with the care they deserve by trusted farmers worldwide. We are ready and determined to provide you with the best {productNamePlural} from around the world. As Платинум Агро Групп, a worldwide exporter of wholesale fresh fruits and vegetables, our mission is to introduce the food that we like and produce with diligence to the world.'
}

export const categoryPage = {
  titleFruits: 'Fruits',
  titleVegetables: 'Vegetables',
  titleDefault: 'Products',
  collectionSuffix: 'Collection',
  viewProductButton: 'View Product',
  allProducts: 'All Products'
}