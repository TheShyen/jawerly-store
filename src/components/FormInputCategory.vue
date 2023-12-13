<script setup lang="ts">
import type { QSelect } from 'quasar';
import {categoryOptions} from "../utils/getSelectOptions.ts";
</script>

<template>
  <q-select
    color="grey"
    popup-content-style="{width: '300px'}"
    :options="categoryOptions"
    :rules="[ val => val && val.length > 0 || 'Пожалуйста, выберите категорию']"
    class="input text-h6"
    filled
    label="Категория"
    model-value=""/>
</template>

<style lang="sass" scoped>
.input
  padding-bottom: 0px
</style>