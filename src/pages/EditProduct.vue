<script setup>
import {onMounted, ref} from "vue";
import getImgUrl from "../utils/getImageUrl.js";
import {useRoute} from "vue-router";
import {useAppStore} from "../stores/AppStore.js";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import router from "../router/router.js";

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
            <q-carousel-slide v-for="img in product?.imagesIds" :name="img" class="product__main__carousel__slide">
              
              <q-img :src="getImgUrl(img)" class="full-height">
                <div class="absolute-top-right">
                  <q-btn  flat round size="14px" >
                    <q-icon color='white' name="add"/>
                  </q-btn>
                  <q-btn  flat round size="14px" class="q-ml-md" @click="console.log(`Вы удалили картинку с id ${img}`)">
                    <q-icon color='red' name="delete"/>
                  </q-btn>
                </div>
              </q-img>
            </q-carousel-slide>
          
          </q-carousel>
        </div>
        <div class="product__form">
          <q-form
            class="q-gutter-md column wrap justify-center"
            @reset="onReset"
            @submit="onSubmit"
          >
            <q-input
              v-model="product.title"
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              class="text-h6"
              filled
              label="Заголовок"
              lazy-rules
            />
            <q-input
              v-model="product.description"
              filled
              label="Описание"
              type="textarea"
            />
            <q-input
              v-model="product.price"
              class="text-h6"
              filled
              label="Цена"
            />
            
            <q-select v-model="product.category" :options="options" class="col-md-8 text-h6" filled label="Категория"/>
            
            <div class="q-mt-lg">
              <q-btn color="green" label="Изменить" size="17px" type="submit"/>
              <q-btn class="q-ml-sm" color="primary" flat label="Назад" size="17px" @click="router.push('/catalog')"/>
              <q-btn class="q-ml-sm" color="red" flat label="Удалить" size="17px"/>
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
    width: 540px
    height: 580px
    margin-left: 40px
</style>