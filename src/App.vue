<script setup>
import { RouterView, useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const route = useRoute()
</script>

<template>
  <DefaultLayout v-if="!route.meta.noLayout">
    <RouterView />
  </DefaultLayout>
  <RouterView v-else />
</template>