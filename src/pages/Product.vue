<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useAppStore} from "../stores/AppStore.js";

const slide = ref('')
const route = useRoute();
const productId = computed(() => route.params.productId);
const store = useAppStore()
const product = ref({});

onMounted(() => {
  product.value = store.getCurrentProduct(productId);
  slide.value = product.value.previewImageId;
})
function getUrlImg(id) {
  return `https://saros-api-v3-production.up.railway.app/api/v3/images/${id}`
}

</script>

<template>
  <div class="product">
    <div class="product__wrapper">
      <div class="product__main">
        <div class="product__main__carousel">
          <q-carousel
            v-model="slide"
            swipeable
            animated
            arrows
            control-color="white"
            height="580px"
            navigation
          >
            <q-carousel-slide v-for="img in product?.imagesIds" :name="img" class="product__main__carousel__slide">
              <q-img :src="getUrlImg(img)" class="full-height"/>
            </q-carousel-slide>

          </q-carousel>
        </div>
        <div class="product__main__border__one">
          <div class="product__main__border__two">
            <div class="product__main__info">
              <div class="product__main__info__title">{{product?.title}}</div>
              <div class="product__main__info__category">Категория:
                <div class="product__main__info__category__name">{{product?.category}}</div>
              </div>
              <div class="product__main__info__separator"></div>
              <div class="product__main__info__description">{{product?.description}}</div>
              <div class="product__main__info__price">{{product?.price + ' ₽'}}</div>
              <q-btn class="product__main__info__btn">Купить</q-btn>
            </div>
            
          </div>
        </div>
          
      </div>
    </div>
      
  </div>
</template>

<style lang="sass" scoped>
.product
  background-color: #F9F9F9
  min-height: 100vh
  &__wrapper
    padding: 120px 0
    margin: 0 auto
    width: 1150px
  &__main
    display: flex
    justify-content: space-between
    &__carousel
      width: 540px
      &__slide
        padding: 0 0
    &__border
      display: flex
      justify-content: space-between
      &__one
        width: 540px
        height: 580px
        border: 2px solid var(--grey, #D6D6D6)
      &__two
        margin: 8px auto
        width: 520px
        height: 560px
        border: 2px solid var(--grey, #D6D6D6)
    &__info
      padding: 40px 30px
      &__title
        font-family: Raleway, serif
        font-weight: 800
        font-size: 24px
        color: #333
        text-transform: uppercase
      &__category
        display: flex
        flex-direction: row
        margin: 20px 0
        font-family: Raleway, serif
        font-weight: 400
        font-size: 14px
        color: #333
        &__name
          margin-left: 15px
      &__separator
        background: #D6D6D6
        width: 460px
        height: 1px
      &__description
        margin-top: 30px
        font-family: Raleway, serif
        font-weight: 600
        font-size: 16px
        color: #333
      &__price
        margin-top: 30px
        font-family: Poppins, serif
        font-weight: 500
        font-size: 28px
        color: #333
      &__btn
        margin: 25px auto
        padding: 10px 20px
        font-family: Raleway, serif
        font-size: 18px
        font-weight: 500
        text-transform: uppercase
        border: 2px solid var(--white, #FFF)
        background: var(--accent, #333)
        color: var(--white, #FFF)

</style>