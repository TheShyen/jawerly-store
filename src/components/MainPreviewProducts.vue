<script setup>
import {computed, onMounted} from "vue";
import {useAppStore} from "../stores/AppStore.ts";
import getImgUrl from "../utils/getImageUrl.js";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import router from "../router/router.ts";

const store = useAppStore()

onMounted(() => {
  store.getProducts()
})

const lastProducts = computed(()=> {
  return store.products?.slice(-6);
})
</script>

<template>
  <div class="products">
    <DefaultLayout>
      <div class="lent">Последние товары</div>
      <div class="products__cards column ">
        <q-card v-for="card in lastProducts" @click="router.push('/product/' + card.id)" :key="card.id" class="productItem"  square>
          <q-img :src = getImgUrl(card.previewImageId) class="productItem__img">
            <div class="productItem__info absolute-bottom text-h6">
              <div class="productItem__price text-white">
                {{card.price}} ₽
              </div>
              <div class="productItem__title self-center text-white">
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
    
.productItem
  margin-top: 15px
  width: 300px
  height: 300px
  &:hover
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.7)
    transition: 0.6s
    cursor: pointer
    transform: scale(1.03)
  &__img
    height: 300px
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