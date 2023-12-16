<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useAppStore} from "../stores/AppStore.ts";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import getImgUrl from "../utils/getImageUrl.ts";
import {ProductInfo} from "../types/ProductData.ts";
import {defaultProductState} from "../utils/defaultProductState.ts";
import router from "../router/router.ts";

const slide = ref('')
const route = useRoute();
const productId = ref<string>(route.params.productId as string);
const store = useAppStore()
const product = ref<ProductInfo>(defaultProductState);

onMounted(() => {
  product.value = store.getProduct(productId.value);
  if (!product.value.title || !product.value.description) {
    router.push('/error')
  } else {
    slide.value = product.value.previewImageId;
  }
})


</script>

<template>
  <div class="product">
    <DefaultLayout>
      <div class="product__main">
        <div class="product__main__carousel">
          <q-carousel
            v-model="slide"
            swipeable
            animated
            arrows
            control-color="black"
            class="product__main__carousel__img"
            navigation
          >
            <q-carousel-slide v-for="img in product?.imagesIds" :name="img" class="product__main__carousel__slide">
              <q-img :src="getImgUrl(img)" class="full-height"/>
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
    </DefaultLayout>
      
  </div>
</template>

<style lang="sass" scoped>
.product
  background-color: #F9F9F9
  min-height: 100vh
  &__main
    display: flex
    justify-content: space-around
    flex-wrap: wrap
    margin-top: 30px
    @media (max-width: 991px)
      row-gap: 15px
    &__carousel
      width: 540px
      @media (max-width: 1199px)
        width: 480px
      @media (max-width: 575px)
        width: 80vw
      &__img
        height: 580px
        @media (max-width: 575px)
          height: 60vh
      &__slide
        padding: 0 0
    &__border
      display: flex
      justify-content: space-around
      &__one
        width: 540px
        height: 580px
        border: 2px solid var(--grey, #D6D6D6)
        @media (max-width: 1199px)
          width: 480px
          height: 520px
        @media (max-width: 575px)
          width: 80vw

      &__two
        margin: 8px auto
        width: 520px
        height: 560px
        border: 2px solid var(--grey, #D6D6D6)
        @media (max-width: 1199px)
          width: 460px
          height: 500px
        @media (max-width: 575px)
          width: 76vw
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
        @media (max-width: 1199px)
          width: 390px
        @media (max-width: 575px)
          width: 60vw
        
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