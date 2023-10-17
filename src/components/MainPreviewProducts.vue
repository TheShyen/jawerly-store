<script setup>
import {computed, onMounted} from "vue";
import {useAppStore} from "../stores/AppStore.js";
import getImgUrl from "../utils/getImageUrl.js";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import router from "../router/router.js";
const store = useAppStore()
onMounted(() => {
  store.getProducts()
})
const lastProducts = computed(()=> {
  return store.products.slice(-6);
})
</script>

<template>
  <div class="products">
    <DefaultLayout>
      <div class="lent">Последние товары</div>
      <div class="products__cards column ">
        <q-card v-for="card in lastProducts" @click="router.push('/product/' + card.id)" :key="card.id" class="products__cards__card"  square>
          <q-img :src = getImgUrl(card.previewImageId)>
            <div class="products__cards__card__info absolute-bottom text-h6">
              <div class="products__cards__card__price text-white">
                {{card.price}} ₽
              </div>
              <div class="products__cards__card__title self-center text-white">
                {{card.title}}
              </div>
            </div>
          </q-img>
        
        </q-card>
      </div>
    </DefaultLayout>
  </div>
</template>

<style lang="sass" scoped>
.products
  background-color: #F9F9F9
  
  &__cards
    display: flex
    flex-wrap: wrap
    justify-content: space-around
    flex-direction: row
    &__card
      margin-top: 15px
      width: 300px
      height: 300px
      &:hover
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.7)
        transition: 0.6s
        cursor: pointer
        transform: scale(1.03)
      &__title
        font-size: 16px
        font-family: Raleway, serif
        font-weight: 600
      &__price
        font-family: Poppins, serif
        font-weight: 400

.lent
  display: flex
  justify-content: center
  color: var(--accent, #333)
  font-family: Noto Serif
  font-size: 30px
  font-weight: 700
  padding-bottom: 20px



</style>