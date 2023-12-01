<script setup>

import Spinner from "./UI/spinner.vue";
import {useAppStore} from "../stores/AppStore.ts";

const appStore = useAppStore();
</script>

<template>
  <Spinner v-if="appStore.isLoading"/>
  <div v-else class="catalog__cards">
    <slot></slot>
  </div>
</template>

<style lang="sass" scoped>
.catalog__cards
  display: flex
  flex-wrap: wrap
  column-gap: 100px
  row-gap: 20px
  @media (max-width: 1199px)
    justify-content: space-evenly
</style>