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
  <div class="catalog__btn">
    <q-btn v-if="store.isAuth" @click="router.push('/add')" color="green" >
      <q-icon name="add"/>
      Добавить товар
    </q-btn>
  </div>
  
</template>

<style lang="sass" scoped>
.catalog__filter
  display: flex
  flex-wrap: wrap
  padding-bottom: 40px
  justify-content: space-between
  &__option
    width: 200px
.catalog__btn
  display: flex
  justify-content: center
  margin-bottom: 15px
</style>