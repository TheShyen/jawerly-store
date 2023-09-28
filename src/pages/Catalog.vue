<script setup>
import {ref} from "vue";
import {useAppStore} from "../stores/AppStore.js";
import router from "../router/router.js";

const store = useAppStore()
const options = ref([
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
])

const getImgUrl = (id) => {
  return `https://saros-api-v3-production.up.railway.app/api/v3/images/${id}`
}
</script>

<template>
  <div class="catalog">
    <div class="catalog__wrapper">
      <div class="catalog__filter">
        <q-select :options="options" class="catalog__filter__option" label="Standard"/>
        <q-select :options="options" class="catalog__filter__option" label="Standard"/>
        <q-select :options="options" class="catalog__filter__option" label="Standard"/>
      </div>
      <div class="catalog__cards column ">
        <q-card @click="router.push('/product/' + card.id)" v-for="card in store.products" class="catalog__card" :key="card.id" flat square>
          <q-img :src=getImgUrl(card.previewImageId) class="catalog__card__img"></q-img>
          <q-card-section class="catalog__card__section">
            <div class="catalog__card__category">{{ card.category }}</div>
            <div class="catalog__card__title">{{ card.title }}</div>
            <q-btn class="catalog__card__btn">{{ card.price + ' ₽' }}</q-btn>
          </q-card-section>
        
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.catalog
  background: #F9F9F9
  min-height: 800px
  
  &__wrapper
    max-width: 950px
    margin: 0 auto
  
  &__filter
    display: flex
    flex-wrap: wrap
    padding-top: 100px
    padding-bottom: 50px
    justify-content: space-between
    
    &__option
      width: 200px
  
  &__cards
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    flex-direction: row
  
  &__card
    margin-top: 15px
    width: 280px
    height: 400px
    background: #F9F9F9
    
    &__section
      padding: 0 0
    
    &__img
      height: 220px
    
    &__category
      color: var(--accent, #333)
      text-align: center
      font-family: Raleway, serif
      font-size: 14px
      font-weight: 600
      margin-top: 15px
    &__title
      color: var(--accent, #333)
      text-align: center
      font-family: Raleway, serif
      font-size: 20px
      font-weight: 800
      height: 60px
    
    &__btn
      display: flex
      margin: 20px auto
      padding: 10px 20px
      font-family: Poppins, serif
      font-size: 18px
      font-weight: 500
      text-transform: uppercase
      border: 2px solid var(--white, #FFF)
      background: var(--accent, #333)
      color: var(--white, #FFF)
      


</style>