<script setup>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import CatalogFilters from "../components/CatalogFilters.vue";
import CatalogProductList from "../components/CatalogProductList.vue";
import CatalogProductItem from "../components/CatalogProductItem.vue";

import {useAppStore} from "../stores/AppStore.js";

const store = useAppStore()

</script>

<template>
  <div class="catalog">
    <DefaultLayout>
      <CatalogFilters/>
      <CatalogProductList>
        <CatalogProductItem v-for="card in store.products" :card="card" :key="card.id"/>
      </CatalogProductList>
    </DefaultLayout>
  </div>
</template>

<style lang="sass" scoped>
.catalog
  background: #F9F9F9
  min-height: 800px
  
</style>