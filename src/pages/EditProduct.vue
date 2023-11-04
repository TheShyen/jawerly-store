<script setup>
import {onMounted, ref} from "vue";
import getImgUrl from "../utils/getImageUrl.js";
import {useRoute} from "vue-router";
import {useAppStore} from "../stores/AppStore.js";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import FormInputTitle from "../components/FormInputTitle.vue";
import FormInputDescription from "../components/FormInputDescription.vue";
import FormInputPrice from "../components/FormInputPrice.vue";
import FormInputCategory from "../components/FormInputCategory.vue";
import router from "../router/router.js";

const slide = ref('')
const route = useRoute();
const productId = ref(route.params.productId);
const store = useAppStore()
const product = ref({});


onMounted(() => {
  product.value = store.getProduct(productId);
  slide.value = product.value.previewImageId;
})

function onSave() {
  store.updateProduct(product.value)
}

function deleteCurrentImage(id) {
  product.value.imagesIds.splice(product.value.imagesIds.findIndex(item => item === id), 1)
  product.value.previewImageId = product.value.imagesIds[0]
  slide.value = product.value.imagesIds[0]
  
}
</script>

<template>
  <div class="product">
    <DefaultLayout>
      <div class="product__main">
        <div class="product__main__carousel" >
          <q-carousel
            v-model="slide"
            animated
            arrows
            control-color="black"
            height="580px"
            navigation
            swipeable
          >
            <q-carousel-slide v-for="img in product?.imagesIds" :name="img" :key="img" class="product__main__carousel__slide">
              <q-img :src="getImgUrl(img)" class="full-height">
                <div class="absolute-top-right">
                  <q-btn  flat round size="14px" >
                    <q-icon color='white' name="add"/>
                  </q-btn>
                  <q-btn  flat round size="14px" class="q-ml-md" @click="deleteCurrentImage(img)">
                    <q-icon color='red' name="delete"/>
                  </q-btn>
                </div>
              </q-img>
            </q-carousel-slide>
          </q-carousel>
        </div>
        <div class="form column wrap">
          <FormInputTitle v-model="product.title"/>
          <FormInputDescription v-model="product.description"/>
          <FormInputPrice v-model="product.price"/>
          <FormInputCategory v-model="product.category"/>
          <div class="q-mt-lg">
            <q-btn color="green" label="Сохранить" size="17px" @click="onSave"/>
            <q-btn class="q-ml-sm" color="primary" flat label="Назад" size="17px" @click="router.push('/catalog')"/>
            <q-btn class="q-ml-sm" color="red" flat label="Удалить" size="17px"/>
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
    justify-content: space-between
    margin-top: 30px
    &__carousel
      width: 540px
      &__slide
        padding: 0 0
       
</style>