<script setup>
import {genderOptions} from "../utils/getSelectOptions.ts";
</script>

<template>
  <q-select
    color="grey"
    popup-content-style="{width: '300px'}"
    :options="genderOptions"
    :rules="[ val => val && val.length > 0 || 'Пожалуйста, выберите для кого украшение']"
    class="input text-h6"
    filled
    label="Для кого"
  />
</template>

<style lang="sass" scoped>
.input
  padding-bottom: 0px
</style>