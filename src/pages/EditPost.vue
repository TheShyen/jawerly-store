<script setup>
import {onMounted, ref} from "vue";
import getImgUrl from "../utils/getImageUrl.js";
import {useRoute} from "vue-router";
import {useAppStore} from "../stores/AppStore.js";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import router from "../router/router.js";
import Spinner from "../components/UI/spinner.vue";
import uploadImages from "../services/uploadImages.js";
import {useQuasar} from "quasar";
import FormInputTitle from "../components/FormInputTitle.vue";
import FormInputDescription from "../components/FormInputDescription.vue";
import FormInputImage from "../components/FormInputImage.vue";

const $q = useQuasar()


const selectedFiles = ref(null)
const route = useRoute();
const postId = ref(route.params.postId);
const store = useAppStore()
const post = ref({});
const isShowModal = ref(false)


onMounted(() => {
  post.value = store.getPost(postId);
})

function onUploadFiles(files) {
  selectedFiles.value = files;
  post.value.imageId = selectedFiles.value[0].name;
}

function deleteCurrentImage() {
  post.value.imageId = ''
}

async function onSave() {
  await store.updatePost(post.value)
  if (selectedFiles.value) {
    await uploadImages(selectedFiles)
  }
    $q.notify({
    message: 'Пост отредактирован!',
    color: 'green',
    timeout: 3000,
  })
}

function onReset() {
}
</script>

<template>
  <div class="post">
    <DefaultLayout>
      <div v-if="!store.isLoading" class="post__main">
        <div v-if="post.imageId" class="post__main__img">
          <q-img :src="getImgUrl(post?.imageId)" class="full-height">
            <div class="absolute-top-right">
              <q-btn flat round size="14px">
                <q-icon color='white' name="add"/>
              </q-btn>
              <q-btn class="q-ml-md" flat round size="14px"
                     @click="deleteCurrentImage">
                <q-icon color='red' name="delete"/>
              </q-btn>
            </div>
          </q-img>
        </div>
        <q-btn v-else class="add-btn" color="green" size="14px" @click="isShowModal = true">
          <q-icon color='white' name="add"/>
          Добавить картинку
        </q-btn>
        <q-dialog v-model="isShowModal" class="column wrap" persistent transition-hide="scale" transition-show="scale">
          <div>
            <FormInputImage @on-upload-file="onUploadFiles" max-files="1"/>
            <q-card-actions align="right">
              <q-btn color="red" size="14px" v-close-popup>
                Закрыть
              </q-btn>
            </q-card-actions>
          </div>
        </q-dialog>
        <div class="form column wrap">
          <FormInputTitle v-model="post.title"/>
          <FormInputDescription v-model="post.description"/>
          <div class="q-mt-lg">
            <q-btn color="green" label="Изменить" size="17px" @click="onSave"/>
            <q-btn class="q-ml-sm" color="primary" flat label="Назад" size="17px" @click="router.push('/posts')"/>
            <q-btn class="q-ml-sm" color="red" flat label="Удалить" size="17px"/>
          </div>
        </div>
      </div>
      <Spinner v-else/>
    </DefaultLayout>
  </div>
</template>

<style lang="sass" scoped>
.post
  background-color: #F9F9F9
  min-height: 100vh
  
  &__main
    display: flex
    justify-content: space-between
    margin-top: 30px
    &__img
      width: 540px
      
.form
  width: 540px
  row-gap: 20px
  
.add-btn
  display: flex
  height: 50px
</style>