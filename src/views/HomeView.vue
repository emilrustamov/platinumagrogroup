<script setup>
import { useSeo, useOrganizationStructuredData } from '@/composables/useSeo.js'
import { pagesSeo } from '@/config/seo.config.js'

import BlogBlock from '@/sections/blog-block.vue';
import Feedback from '@/sections/feedback.vue';
import FruitDesc from '@/sections/fruit-desc.vue';
import Help from '@/sections/help.vue';
import HeroBlock from '@/sections/hero-block.vue';
import HomeProducts from '@/sections/home-products.vue';
import Join from '@/sections/join.vue';
import Supplier from '@/sections/supplier.vue';
import ToAbout from '@/sections/to-about.vue';
import TrendyFruits from '@/sections/trendy-fruits.vue';

useSeo(pagesSeo.home)
useOrganizationStructuredData()
</script>

<template>
  <HeroBlock />
  <Supplier />
  <HomeProducts />
  <ToAbout />
  <Feedback />
  <TrendyFruits />
  <Join />
  <Help />
  <FruitDesc />
  <BlogBlock />
</template>
