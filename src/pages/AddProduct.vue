<script setup lang="ts">
import {useQuasar} from "quasar";
import { ref} from "vue";
import {useAppStore} from "../stores/AppStore.ts";
import FormInputTitle from "../components/FormInputTitle.vue";
import FormInputDescription from "../components/FormInputDescription.vue";
import FormInputPrice from "../components/FormInputPrice.vue";
import FormInputImage from "../components/FormInputImage.vue";
import FormInputCategory from "../components/FormInputCategory.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import Spinner from "../components/UI/spinner.vue";
import router from "../router/router.ts";
import FormInputGender from "../components/FormInputGender.vue";
import FormInputLink from "../components/FormInputLink.vue";

const appStore = useAppStore()
const $q = useQuasar()

const title = ref('');
const description = ref('')
const category = ref('');
const price = ref('');
const gender = ref('');
const link = ref('');
const selectedFiles = ref<File[]>([]);
const isAddMoreProduct = ref(false);

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
    await appStore.addProduct(selectedFiles.value, {
      id: '',
      title: title.value,
      category: category.value,
      description: description.value,
      price: Number(price.value),
      gender: gender.value,
      link: link.value,
      previewImageId: getImagesName()[0],
      imagesIds: getImagesName()
    })
    onReset()
    
    if (!isAddMoreProduct.value) {
      await router.push('/catalog')
    }
    
    $q.notify({
      message: 'Товар добавлен!',
      color: 'green',
      timeout: 3000,
    })
  }
  
}
function onUploadFiles(files: File[]) {
  selectedFiles.value = files;
}

function onReset() {
  title.value = '';
  description.value = '';
  category.value = '';
  price.value = '';
  gender.value = '';
  link.value = '';
  selectedFiles.value = [];
}
</script>

<template>
  <div class="form">
    <DefaultLayout class="wrapper">
      <div>
        <q-form
          v-if="!appStore.isLoading"
          class="column form__input justify-center"
          @reset="onReset"
          @submit="onCreate"
        >
          <FormInputTitle v-model="title"/>
          <FormInputDescription v-model="description"/>
          <FormInputPrice v-model="price"/>
          <FormInputCategory v-model="category"/>
          <FormInputGender v-model="gender"/>
          <FormInputLink v-model="link"/>
          <FormInputImage @on-upload-file="onUploadFiles" multiple/>
          <q-checkbox v-model="isAddMoreProduct" class="checkbox col-md-6" label="Добавить еще"/>
          <div class="col-md-6 ">
            <q-btn color="primary" label="Создать" size="17px" type="submit"/>
            <q-btn class="q-ml-sm" color="primary" flat label="Очистить" size="17px" type="reset"/>
          </div>
        </q-form>
        <Spinner v-else/>
      </div>
    </DefaultLayout>
  </div>

</template>

<style lang="sass" scoped>

.wrapper
  max-width: 900px
  padding-top: 60px
  padding-bottom: 0
.form
  padding: 30px 40px
  min-height: 100vh
  background-color: #F9F9F9
  
  &__input
    row-gap: 25px
.checkbox
  padding: 0 0
</style>