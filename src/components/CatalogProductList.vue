<script setup>

</script>

<template>
  <div class="catalog__cards">
    <slot></slot>
  </div>
</template>

<style lang="sass" scoped>
.catalog__cards
  display: flex
  flex-wrap: wrap
  column-gap: 100px
  row-gap: 20px
</style>