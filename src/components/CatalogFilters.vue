<script setup>
import {ref, watch} from "vue";
import {useAuthStore} from "../stores/auth.ts";
import router from "../router/router.ts";
import {categoryOptions, sortOptions, genderOptions} from "../utils/getSelectOptions.ts";
import {useAppStore} from "../stores/AppStore.ts";


const store = useAuthStore()
const appStore = useAppStore()

const category = ref('')
const gender = ref('')
const sort = ref('')

watch(() => category.value, () => {
  if (category.value) {
    gender.value = ''
    appStore.getProductsByFilters({orderBy: '"category"', equalTo: `"${category.value}"`})
  } else {
    if(!gender.value) {
      appStore.getProducts()
    }
  }
})
watch(() => gender.value, () => {
  if (gender.value) {
    category.value = ''
    appStore.getProductsByFilters({orderBy: '"gender"', equalTo: `"${gender.value}"`})
  } else {
    if(!category.value) {
      appStore.getProducts()
    }
  }
})
watch(() => sort.value, () => {
  if (sort.value) {
    appStore.sortProductsByPrice(sort.value)
  } else {
    appStore.getProducts()
  }
})

</script>

<template>
  <div class="catalog__filter">
    <q-select :options="categoryOptions" v-model="category" class="catalog__filter__option" label="Категория" clearable/>
    <q-select :options="genderOptions" v-model="gender"  class="catalog__filter__option" label="Для кого" clearable/>
    <q-select :options="sortOptions" v-model="sort"  class="catalog__filter__option" label="Сортировка:" clearable/>
  </div>
  <div class="catalog__btn">
    <q-btn v-if="store.isAuth" @click="router.push('/addProduct')" color="green" >
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
  @media (max-width: 575px)
    justify-content: center
  @media (max-width: 1199px)
    justify-content: space-around
  &__option
    width: 200px
    @media (max-width: 767px)
      width: 150px
    @media (max-width: 575px)
      width: 220px
.catalog__btn
  display: flex
  justify-content: center
  margin-bottom: 15px
</style>