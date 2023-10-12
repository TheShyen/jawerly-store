<script setup>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import CatalogFilters from "../components/CatalogFilters.vue";
import CatalogProductList from "../components/CatalogProductList.vue";
import CatalogProductListItem from "../components/CatalogProductListItem.vue";


</script>

<template>
  <div class="catalog">
    <DefaultLayout>
      <CatalogFilters/>
      <CatalogProductList>
        <CatalogProductListItem/>
      </CatalogProductList>
    </DefaultLayout>
  </div>
</template>

<style lang="sass" scoped>
.catalog
  background: #F9F9F9
  min-height: 800px
  
</style>