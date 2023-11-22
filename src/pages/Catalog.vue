<script setup>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import CatalogFilters from "../components/CatalogFilters.vue";
import CatalogProductList from "../components/CatalogProductList.vue";
import CatalogProductItem from "../components/CatalogProductItem.vue";

import {useAppStore} from "../stores/AppStore.ts";
import {onMounted} from "vue";

const store = useAppStore()

onMounted(() => {
  store.getProducts()
})
</script>

<template>
  <div class="catalog">
    <DefaultLayout>
      <CatalogFilters/>
      <CatalogProductList>
        <CatalogProductItem v-for="card in store.products" :product="card" :key="card.id"/>
      </CatalogProductList>
    </DefaultLayout>
  </div>
</template>

<style lang="sass" scoped>
.catalog
  background: #F9F9F9
  min-height: 100vh
  
</style>