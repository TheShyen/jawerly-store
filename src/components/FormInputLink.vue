<script setup>
</script>

<template>
  <q-input
    :rules="[ val => val && val.length > 0 || 'Пожалуйста, напишите что-нибудь']"
    class="input text-h6"
    filled
    label="Ссылка на товар"
    lazy-rules
  />
</template>

<style lang="sass" scoped>
.input
  padding-bottom: 0px
  font-size: 16px
</style>