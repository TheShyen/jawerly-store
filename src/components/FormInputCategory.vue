<script setup>

import {getCategory} from "../utils/getSelectOptions.js";
import {ref} from "vue";

const options = ref(getCategory())
</script>

<template>
  <q-select
    color="grey"
    popup-content-style="{width: '300px'}"
    :options="options"
    :rules="[ val => val && val.length > 0 || 'Пожалуйста, выберите категорию']"
    class="input text-h6"
    filled
    label="Категория"
  />

</template>

<style lang="sass" scoped>
.input
  padding-bottom: 0px
</style>