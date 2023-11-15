<script setup>
import {ref, watch} from "vue";
import {useAuthStore} from "../stores/auth.js";
import router from "../router/router.js";
import {getCategory, getFilters, getGender} from "../utils/getSelectOptions.js";
import {useAppStore} from "../stores/AppStore.js";

const store = useAuthStore()

const appStore = useAppStore()
const categoryOptions = ref(getCategory())
const genderOptions = ref(getGender())
const sortOptions = ref(getFilters())
const category = ref('')
const gender = ref('')
const sort = ref('')

watch(() => category.value, () => {
  if (category.value) {
    appStore.getProductsByCategory(`?orderBy="category"&equalTo="${category.value}"`)
  } else {
    appStore.getProducts()
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
  &__option
    width: 200px
.catalog__btn
  display: flex
  justify-content: center
  margin-bottom: 15px
</style>