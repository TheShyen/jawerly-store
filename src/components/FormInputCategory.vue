<script setup>

const options = [
  'Браслеты', 'Серёжки', 'Цепочки'
]
</script>

<template>
  <q-select
    color="grey" popup-content-style="{width: '300px'}"
    :options="options"
    class="text-h6"
    filled
    label="Категория"
  />

</template>

<style lang="sass" scoped>

</style>