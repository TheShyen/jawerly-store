<script setup lang="ts">
import {useAppStore} from "../stores/AppStore.ts";

const appStore = useAppStore()
import Spinner from "./UI/spinner.vue";
</script>

<template>
  <Spinner v-if="appStore.isLoading"/>
  <div class="posts__cards">
    <slot></slot>
  </div>
</template>

<style lang="sass" scoped>
.posts__cards
  display: flex
  flex-wrap: wrap
  column-gap: 100px
  row-gap: 20px
  @media (max-width: 1199px)
    justify-content: space-evenly
</style>