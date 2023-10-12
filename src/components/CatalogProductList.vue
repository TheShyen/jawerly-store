<script setup>

</script>

<template>
  <div class="catalog__cards column ">
    <slot></slot>
  </div>
</template>

<style lang="sass" scoped>
.catalog__cards
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  flex-direction: row
</style>