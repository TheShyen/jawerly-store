<script setup>
import {useQuasar} from "quasar";
import { ref} from "vue";
import {useAppStore} from "../stores/AppStore.js";
import { nanoid } from 'nanoid'
import FormInputTitle from "../components/FormInputTitle.vue";
import FormInputDescription from "../components/FormInputDescription.vue";
import FormInputPrice from "../components/FormInputPrice.vue";
import FormInputImage from "../components/FormInputImage.vue";
import FormInputCategory from "../components/FormInputCategory.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const appStore = useAppStore()
const $q = useQuasar()

const title = ref('');
const description = ref('')
const category = ref('');
const price = ref('')
const selectedFiles = ref(null)
const isAddMoreProduct = ref(false)

function getImagesName() {
  const arr = []
  for (let item of selectedFiles.value) {
    arr.push(item.name)
  }
  return arr;
}
async function onCreate() {
  await appStore.addProduct(selectedFiles, {
    id: '',
    title: title.value,
    category: category.value,
    description: description.value,
    price: price.value,
    previewImageId: getImagesName()[0],
    imagesIds: getImagesName()
  })
  
  title.value = '';
  description.value = '';
  category.value = '';
  price.value = '';
  selectedFiles.value = null;
  
  
  
  $q.notify({
    message: 'Товар добавлен!',
    color: 'green',
    timeout: 3000,
  })
}
function onUploadFiles(files) {
  selectedFiles.value = files;
  console.log(selectedFiles.value)
}

function onReset() {
  title.value = null
  category.value = null
}
</script>

<template>
  <div class="form">
    <DefaultLayout style="width: 900px">
      <div>
        <div v-if="!appStore.isLoading" class="column form__input justify-center">
          <FormInputTitle v-model="title"/>
          <FormInputDescription v-model="description"/>
          <FormInputPrice v-model="price"/>
          <FormInputCategory v-model="category"/>
          <FormInputImage @on-upload-file="onUploadFiles"/>
          <q-checkbox v-model="isAddMoreProduct" class="checkbox col-md-6" label="Добавить еще"/>
          <div class="col-md-6 ">
            <q-btn color="primary" label="Создать" size="17px" @click="onCreate"/>
            <q-btn class="q-ml-sm" color="primary" flat label="Очистить" size="17px" @click="onReset"/>
          </div>
        </div>
        <div v-if="appStore.isLoading" class="spinner">
          <q-spinner
            :thickness="10"
            color="primary"
            size="10em"
          />
        </div>
      </div>
    </DefaultLayout>
  </div>

</template>

<style lang="sass" scoped>
.form
  padding: 30px 40px
  min-height: 100vh
  background-color: #F9F9F9
  
  &__input
    row-gap: 25px
.spinner
  width: 8.5vw
  height: 900px
  margin: 25vh auto
  align-items: center
.checkbox
  padding: 0 0
</style>