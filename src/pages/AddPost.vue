<script setup>
import {useQuasar} from "quasar";
import { ref} from "vue";
import {useAppStore} from "../stores/AppStore.js";
import FormInputTitle from "../components/FormInputTitle.vue";
import FormInputDescription from "../components/FormInputDescription.vue";
import FormInputImage from "../components/FormInputImage.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import Spinner from "../components/UI/spinner.vue";


const appStore = useAppStore()
const $q = useQuasar()

const title = ref('');
const description = ref('')
const selectedFiles = ref([])


function getImagesName() {
  const arr = []
  for (let item of selectedFiles.value) {
    arr.push(item.name)
  }
  return arr;
}
async function onCreate() {
  if (!selectedFiles.value.length) {
    $q.notify({
      message: 'Загрузите изображение',
      color: 'red',
      timeout: 3000,
      icon: 'warning'
    })
  } else {
    await appStore.addPost(selectedFiles, {
      id: '',
      title: title.value,
      description: description.value,
      postDate: new Date().toISOString(),
      imageId: getImagesName()[0]
    })
    title.value = '';
    description.value = '';
    selectedFiles.value = null;
    
    $q.notify({
      message: 'Пост добавлен!',
      color: 'green',
      timeout: 3000,
    })
  }
  
}
function onUploadFiles(files) {
  selectedFiles.value = files;
}


function onReset() {
  title.value = null
}
</script>

<template>
  <div class="form">
    <DefaultLayout style="width: 900px">
      <q-form
        v-if="!appStore.isLoading"
        class="form__input column wrap justify-center"
        @reset="onReset"
        @submit="onCreate"
      >
        <FormInputTitle v-model="title"/>
        <FormInputDescription v-model="description"/>
        <FormInputImage @on-upload-file="onUploadFiles" max-files="1"/>
        
        <div class="col-md-6 ">
          <q-btn color="primary" label="Submit" size="17px" type="submit"/>
          <q-btn class="q-ml-sm" color="primary" flat label="Reset" size="17px" type="reset"/>
        </div>
      </q-form>
      <Spinner v-else/>
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

</style>