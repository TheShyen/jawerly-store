<script setup>

</script>

<template>
  <q-input
    filled
    class="input text-h6"
    :rules="[ val => val && val.length > 0 || 'Пожалуйста, напишите что-нибудь']"
    type="textarea"
    label="Описание"
  />
</template>

<style lang="sass" scoped>
.input
  padding-bottom: 0px
  @media (max-width: 575px)
    font-size: 15px
</style>