<script setup>

</script>

<template>
  <q-input
    filled
    class="input text-h6"
    :rules="[ val => val && val.length > 0 || 'Пожалуйста, укажите цену']"
    label="Цена"
    type="number"
  />
  
</template>

<style lang="sass" scoped>
.input
  padding-bottom: 0px
</style>