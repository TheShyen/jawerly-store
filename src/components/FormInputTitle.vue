<script setup>

</script>

<template>
  <q-input
    :rules="[ val => val && val.length > 0 || 'Пожалуйста, напишите что-нибудь']"
    class="input col-md-6 text-h6"
    filled
    label="Заголовок"
    lazy-rules
  />
</template>

<style lang="sass" scoped>
.input
  padding-bottom: 0px
</style>