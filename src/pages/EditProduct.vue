<script setup lang="ts">
import {onMounted, ref} from "vue";
import getImgUrl from "../utils/getImageUrl.ts";
import {useRoute} from "vue-router";
import {useAppStore} from "../stores/AppStore.ts";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import FormInputTitle from "../components/FormInputTitle.vue";
import FormInputDescription from "../components/FormInputDescription.vue";
import FormInputPrice from "../components/FormInputPrice.vue";
import FormInputCategory from "../components/FormInputCategory.vue";
import router from "../router/router.ts";
import {useQuasar} from "quasar";
import FormInputImage from "../components/FormInputImage.vue";
import uploadImages from "../services/uploadImages.ts";
import Spinner from "../components/UI/spinner.vue";
import getBlobFromImage from "../services/getImageForBlob.ts";
import {ProductInfo} from "../types/ProductData.ts";
import {generateDefaultProductState} from "../utils/defaultProductState.ts";
import {validationFields} from "../utils/validationFields.ts";
import FormInputGender from "../components/FormInputGender.vue";
import FormInputLink from "../components/FormInputLink.vue";
import DeleteDialog from "../components/DeleteDialog.vue";
import {BlobImage} from "../types/BlobImage.ts";

const $q = useQuasar()

const isShowConfirmDialog = ref(false)
const isShowModal = ref(false)
const slide = ref('')
const blobImages = ref<BlobImage[]>([])
const selectedFiles = ref<File[]>([])
const route = useRoute();
const productId = ref<string>(route.params.productId as string);
const store = useAppStore()
const product = ref<ProductInfo>(generateDefaultProductState());

onMounted(() => {
  product.value = store.getProduct(productId.value);
  if (!product.value.title || !product.value.description) {
    router.replace('/error')
  } else {
    imageConversion()
  }
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

async function loadImageAsBlob(url: string, id: string) {
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
  if (product.value.imagesIds.length && validationFields(product.value)) {
    await store.updateProduct(product.value)
    await uploadImages(selectedFiles.value)
    $q.notify({
      message: 'Товар отредактирован!',
      color: 'green',
      timeout: 3000,
    })
  } else {
    $q.notify({
      message: 'Загрузите изображения и заполните поля',
      color: 'red',
      timeout: 3000,
    })
  }
}


function deleteCurrentImage(img: BlobImage) {
  product.value.imagesIds.splice(product.value.imagesIds.findIndex(item => item === img.id), 1)
  blobImages.value.splice(blobImages.value.findIndex(item => item.blobLink === img.blobLink), 1)
  URL.revokeObjectURL(img.blobLink);
  product.value.previewImageId = product.value.imagesIds[0]
  if (blobImages.value.length) {
    switchSlide()
  }
  
}

function onUploadFiles(files: File[]) {
  selectedFiles.value = files;
  for (let img of selectedFiles.value) {
    product.value.imagesIds?.push(img.name)
    const imageUrl = URL.createObjectURL(img);
    blobImages.value.push({blobLink: imageUrl, id: img.name});
  }
  product.value.previewImageId = product.value.imagesIds[0]
  switchSlide()
}

async function deleteProduct(product: ProductInfo) {
  await store.deleteProduct(product)
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
            navigation
            swipeable
            class="slides"
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
          <FormInputGender v-model="product.gender"/>
          <FormInputLink v-model="product.link"/>
          <div class="q-mt-lg">
            <q-btn color="green" class="button" size="17px" @click="onSave">Сохранить</q-btn>
            <q-btn class="q-ml-sm button" color="primary" flat size="17px" @click="router.push('/catalog')">Назад</q-btn>
            <q-btn class="q-ml-sm button" color="red" flat  size="17px" @click="isShowConfirmDialog = true">Удалить</q-btn>
          </div>
        </div>
      </div>
      <Spinner v-else/>
      <DeleteDialog v-model="isShowConfirmDialog" @delete-item="deleteProduct(product)">Вы уверены, что хотите удалить товар?</DeleteDialog>
    </DefaultLayout>
  </div>
</template>

<style lang="sass" scoped>
.form
  width: 540px
  row-gap: 20px
  @media (max-width: 1199px)
    width: 45vw
  @media (max-width: 767px)
    width: 80vw
    margin-top: 20px
.product
  background-color: #F9F9F9
  min-height: 100vh

  &__main
    display: flex
    justify-content: space-between
    flex-wrap: wrap
    margin-top: 30px
    @media (max-width: 1199px)
      padding: 0 25px
    @media (max-width: 767px)
      justify-content: center
    &__carousel
      width: 540px
      @media (max-width: 1199px)
        width: 450px
      @media (max-width: 991px)
        width: 45vw
      @media (max-width: 767px)
        width: 500px
      &__slide
        padding: 0 0
.add-btn
  display: flex
  height: 50px
.slides
  height: 580px
  @media (max-width: 991px)
    height: 65vh
.button
  @media (max-width: 991px)
    width: 100px
    font-size: 14px !important
  @media (max-width: 575px)
    width: 80px
    font-size: 12px !important
</style>