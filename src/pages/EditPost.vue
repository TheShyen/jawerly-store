<script setup>
import {onMounted, ref} from "vue";
import getImgUrl from "../utils/getImageUrl.js";
import {useRoute} from "vue-router";
import {useAppStore} from "../stores/AppStore.ts";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import router from "../router/router.ts";
import Spinner from "../components/UI/spinner.vue";
import uploadImages from "../services/uploadImages.js";
import {useQuasar} from "quasar";
import FormInputTitle from "../components/FormInputTitle.vue";
import FormInputDescription from "../components/FormInputDescription.vue";
import FormInputImage from "../components/FormInputImage.vue";
import getBlobFromImage from "../services/getImageForBlob.js";

const $q = useQuasar()


const selectedFiles = ref(null)
const route = useRoute();
const postId = ref(route.params.postId);
const store = useAppStore()
const post = ref({});
const isShowModal = ref(false)
const blobImage = ref({})

onMounted(() => {
  post.value = store.getPost(postId);
  imageConversion()
})

function onUploadFiles(files) {
  selectedFiles.value = files;
  const img = selectedFiles.value[0];
  post.value.imageId = img.name;
  const imageUrl = URL.createObjectURL(img);
  blobImage.value = {blobLink: imageUrl, id: img.name};
}

function deleteCurrentImage(blobLink) {
  post.value.imageId = ''
  blobImage.value = null
  URL.revokeObjectURL(blobLink);
}


async function imageConversion() {
  store.isLoading = true;
  await loadImageAsBlob(getImgUrl(post.value.imageId), post.value.imageId)
  store.isLoading = false;
}

async function loadImageAsBlob(url, id) {
  try {
    const response = await getBlobFromImage(url)
    blobImage.value = {
      blobLink: URL.createObjectURL(response.data),
      id: id
    };
  } catch (error) {
    console.error(error)
  }
}
async function onSave() {
  if (post.value.imageId) {
    await store.updatePost(post.value)
    await uploadImages(selectedFiles)
    $q.notify({
      message: 'Пост отредактирован!',
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

</script>

<template>
  <div class="post">
    <DefaultLayout>
      <div v-if="!store.isLoading" class="post__main">
        <div v-if="post.imageId" class="post__main__img">
          <q-img :src="blobImage.blobLink" class="full-height">
            <div class="absolute-top-right">
              <q-btn  flat round size="14px"
                     @click="deleteCurrentImage(blobImage.blobLink)">
                <q-icon color='red' name="delete"/>
              </q-btn>
            </div>
          </q-img>
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
              <FormInputImage @on-upload-file="onUploadFiles" max-files="1"/>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn v-close-popup color="red" size="14px">
                Закрыть
              </q-btn>
            </q-card-actions>
          </q-card>
        
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
  row-gap: 23px
  
.add-btn
  display: flex
  height: 50px
</style>