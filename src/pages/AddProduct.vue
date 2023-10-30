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
async function onSubmit() {
  await appStore.addProduct(selectedFiles, {
    id: nanoid(),
    title: title.value,
    category: category.value,
    description: description.value,
    price: price.value,
    previewImageId: getImagesName()[0],
    imagesIds: getImagesName()
  })
  if(isAddMoreProduct) {
    title.value = '';
    description.value = '';
    category.value = '';
    price.value = '';
    selectedFiles.value = null;
  }
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
  <div>
    <q-form
      v-if="!appStore.isLoading"
      class="form q-gutter-md row wrap justify-center"
      @reset="onReset"
      @submit="onSubmit"
    >
      
      <FormInputTitle v-model="title"/>
      <FormInputDescription v-model="description"/>
      <FormInputPrice v-model="price"/>
      <FormInputCategory v-model="category"/>
      <FormInputImage @on-upload-file="onUploadFiles"/>
      <q-checkbox class="checkbox col-md-6" v-model="isAddMoreProduct" label="Добавить еще"/>
      <div class="col-md-6 ">
        <q-btn color="primary" label="Submit" size="17px" type="submit"/>
        <q-btn class="q-ml-sm" color="primary" flat label="Reset" size="17px" type="reset"/>
      </div>
    </q-form>
    <div class="spinner" v-if="appStore.isLoading">
      <q-spinner
        color="primary"
        size="10em"
        :thickness="10"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.form
  padding: 100px 40px
  min-height: 100vh
  background-color: #F9F9F9
.spinner
  width: 8.5vw
  height: 900px
  margin: 39vh auto
  align-items: center
.checkbox
  padding: 0 0
</style>