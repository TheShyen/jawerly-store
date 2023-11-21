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
import {useQuasar} from "quasar";
import FormInputImage from "../components/FormInputImage.vue";
import uploadImages from "../services/uploadImages.js";
import Spinner from "../components/UI/spinner.vue";
import getBlobFromImage from "../services/getImageForBlob.js";

const $q = useQuasar()

const isShowModal = ref(false)
const slide = ref('')
const blobImages = ref([])
const selectedFiles = ref([])
const route = useRoute();
const productId = ref(route.params.productId);
const store = useAppStore()
const product = ref({});

onMounted(() => {
  product.value = store.getProduct(productId);
  imageConversion()
})

function switchSlide() {
  slide.value = blobImages.value[0].blobLink
}

async function imageConversion() {
  store.isLoading = true;
  const loadImage = product.value.imagesIds.map(async (img) => {
    return loadImageAsBlob(getImgUrl(img), img);
  });
  await Promise.all(loadImage);
  store.isLoading = false;
  switchSlide()
}

async function loadImageAsBlob(url, id) {
  try {
    const response = await getBlobFromImage(url)
    blobImages.value.push({
      blobLink: URL.createObjectURL(response.data),
      id: id
    })
  } catch (error) {
    console.error(error)
  }
}


async function onSave() {
  if (product.value.imagesIds.length) {
    await store.updateProduct(product.value)
    await uploadImages(selectedFiles)
    $q.notify({
      message: 'Товар отредактирован!',
      color: 'green',
      timeout: 3000,
    })
  } else {
    $q.notify({
      message: 'Загрузите изображения',
      color: 'red',
      timeout: 3000,
    })
  }
}


function deleteCurrentImage(img) {
  product.value.imagesIds.splice(product.value.imagesIds.findIndex(item => item === img.id), 1)
  blobImages.value.splice(blobImages.value.findIndex(item => item.blobLink === img.blobLink), 1)
  URL.revokeObjectURL(img.blobLink);
  product.value.previewImageId = product.value.imagesIds[0]
  if (blobImages.value.length) {
    switchSlide()
  }
  
}

function onUploadFiles(files) {
  selectedFiles.value = files;
  for (let img of selectedFiles.value) {
    product.value.imagesIds?.push(img.name)
    const imageUrl = URL.createObjectURL(img);
    blobImages.value.push({blobLink: imageUrl, id: img.name});
  }
  product.value.previewImageId = product.value.imagesIds[0]
  switchSlide()
}
</script>

<template>
  <div class="product">
    <DefaultLayout>
      <div v-if="!store.isLoading" class="product__main">
        <div v-if="blobImages.length" class="product__main__carousel">
          <q-carousel
            v-model="slide"
            animated
            arrows
            control-color="accent"
            height="580px"
            navigation
            swipeable
          >
            
            <q-carousel-slide v-for="img in blobImages" :key="img.blobLink" :name="img.blobLink" class="product__main__carousel__slide">
              <q-img :src="img.blobLink" class="full-height">
                <div class="absolute-top-right">
                  <q-btn flat round size="14px" @click="isShowModal = true">
                    <q-icon color='white' name="add"/>
                  </q-btn>
                  <q-btn class="q-ml-md" flat round size="14px" @click="deleteCurrentImage(img)">
                    <q-icon color='red' name="delete"/>
                  </q-btn>
                </div>
              </q-img>
            </q-carousel-slide>
          </q-carousel>
        </div>
        <q-btn v-else class="add-btn" color="green" size="14px" @click="isShowModal = true">
          <q-icon color='white' name="add"/>
          Добавить картинку
        </q-btn>
        <q-dialog v-model="isShowModal" transition-hide="scale" transition-show="scale">
          <q-card>
            <q-card-section>
              <div class="text-h6">Форма для загрузки изображений</div>
            </q-card-section>
            <q-separator />
            <q-card-section >
              <FormInputImage @on-upload-file="onUploadFiles" multiple/>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn v-close-popup color="red" size="14px">
                Закрыть
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
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
      <Spinner v-else/>
    </DefaultLayout>
  </div>
</template>

<style lang="sass" scoped>
.form
  width: 540px
  row-gap: 20px
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


.add-btn
  display: flex
  height: 50px

</style>