<script setup>

</script>

<template>
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
  
</style>