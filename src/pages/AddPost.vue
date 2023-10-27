<script setup>
import {useQuasar} from "quasar";
import { ref} from "vue";
import {useAppStore} from "../stores/AppStore.js";
import uniqid from "uniqid";
import FormInputTitle from "../components/FormInputTitle.vue";
import FormInputDescription from "../components/FormInputDescription.vue";
import FormInputImage from "../components/FormInputImage.vue";


const appStore = useAppStore()
const $q = useQuasar()

const title = ref(null);
const description = ref('')
const category = ref(null);
const price = ref('')
const selectedFiles = ref(null)


function getImagesName() {
  const arr = []
  for (let item of selectedFiles.value) {
    arr.push(item.name)
  }
  return arr;
}
function onSubmit() {
  appStore.addProduct(selectedFiles, {
    id: uniqid(),
    title: title.value,
    category: category.value,
    description: description.value,
    price: price.value,
    previewImageId: getImagesName()[0],
    imagesIds: getImagesName()
  })
  
}
function onUploadFiles(event) {
  selectedFiles.value = event.target.files;
}


function onReset() {
  title.value = null
  category.value = null
}
</script>

<template>
  <div>
    <q-form
      class="q-gutter-md q-ma-xl row wrap justify-center"
      @reset="onReset"
      @submit="onSubmit"
    >
      <FormInputTitle v-model="title"/>
      <FormInputDescription v-model="description"/>
      <FormInputImage @on-upload-file="onUploadFiles"/>
      
      <div class="col-md-6 ">
        <q-btn color="primary" label="Submit" size="17px" type="submit"/>
        <q-btn class="q-ml-sm" color="primary" flat label="Reset" size="17px" type="reset"/>
      </div>
    </q-form>
  </div>
</template>

<style lang="sass" scoped>

</style>