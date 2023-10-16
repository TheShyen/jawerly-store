<script setup>
import {onMounted, ref} from "vue";
import getImgUrl from "../utils/getImageUrl.js";
import {useRoute} from "vue-router";
import {useAppStore} from "../stores/AppStore.js";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const slide = ref('')
const route = useRoute();
const productId = ref(route.params.productId);
const store = useAppStore()
const product = ref({});

const options = [
  'Браслеты', 'Серёжки', 'Цепочки'
]

onMounted(() => {
  product.value = store.getProduct(productId);
  slide.value = product.value.previewImageId;
})

function onSubmit() {
}

function onReset() {
}
</script>

<template>
  <div class="product">
    <DefaultLayout>
      <div class="product__main">
        <div class="product__main__carousel">
          <q-carousel
            v-model="slide"
            animated
            arrows
            control-color="white"
            height="580px"
            navigation
            swipeable
          >
            <q-carousel-slide v-for="img in product?.imagesIds" :name="img" class="product__main__carousel__slide" @click="console.log(img)">
              <q-img :src="getImgUrl(img)" class="full-height"/>
            </q-carousel-slide>
          
          </q-carousel>
        </div>
        <div class="product__form">
          <q-form
            class="q-gutter-md row wrap justify-center"
            @reset="onReset"
            @submit="onSubmit"
          >
            <q-input
              v-model="product.title"
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              class="col-md-8 text-h6"
              filled
              label="Title"
              lazy-rules
            />
            <q-input
              v-model="product.description"
              class="col-md-8"
              filled
              label="Описание"
              type="textarea"
            />
            <q-input
              v-model="product.price"
              class="col-md-8 text-h6"
              filled
              label="Цена"
            />
            
            <q-select v-model="product.category" :options="options" class="col-md-8 text-h6" filled label="Category"/>
            
            <div class="col-md-8 ">
              <q-btn color="green" label="Изменить" size="17px" type="submit"/>
              <q-btn class="q-ml-sm" color="primary" flat label="Назад" size="17px"/>
            </div>
          </q-form>
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
    justify-content: space-between
    margin-top: 30px
    
    &__carousel
      width: 540px
      
      &__slide
        padding: 0 0
  &__form
    width: 740px
    height: 580px
</style>