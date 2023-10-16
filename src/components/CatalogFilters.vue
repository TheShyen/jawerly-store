<script setup>
import { ref} from "vue";
import {useAuthStore} from "../stores/auth.js";
import router from "../router/router.js";

const store = useAuthStore()
const options = ref([
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
])

</script>

<template>
  <div class="catalog__filter">
    <q-select :options="options" class="catalog__filter__option" label="Standard"/>
    <q-select :options="options" class="catalog__filter__option" label="Standard"/>
    <q-select :options="options" class="catalog__filter__option" label="Standard"/>
  </div>
  <q-btn v-if="store.isAuth" @click="router.push('/add')">
    Добавить товар
  </q-btn>
</template>

<style lang="sass" scoped>
.catalog__filter
  display: flex
  flex-wrap: wrap
  padding-bottom: 50px
  justify-content: space-between
  
  &__option
    width: 200px
</style>