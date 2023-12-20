<script setup lang="ts">
import {onMounted, ref} from "vue";
import getImgUrl from "../utils/getImageUrl.ts";
import {useRoute} from "vue-router";
import {useAppStore} from "../stores/AppStore.ts";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import router from "../router/router.ts";
import Spinner from "../components/UI/spinner.vue";
import uploadImages from "../services/uploadImages.ts";
import {useQuasar} from "quasar";
import FormInputTitle from "../components/FormInputTitle.vue";
import FormInputDescription from "../components/FormInputDescription.vue";
import FormInputImage from "../components/FormInputImage.vue";
import getBlobFromImage from "../services/getImageForBlob.ts";
import {PostInfo} from "../types/PostData.ts";
import {generateDefaultPostState} from "../utils/defaultPostState.ts";
import {validationFields} from "../utils/validationFields.ts";

const $q = useQuasar()


const selectedFiles = ref<File[]>([])
const route = useRoute();
const postId = ref<string>(route.params.postId as string);
const store = useAppStore()
const post = ref<PostInfo>(generateDefaultPostState());
const isShowModal = ref(false)
const blobImage = ref<{ blobLink: string; id: string }>({ blobLink: "", id: "" })

onMounted(() => {
  post.value = store.getPost(postId.value);
  if (!post.value.title || !post.value.description) {
    router.replace('/error')
  } else {
    imageConversion()
  }
})

function onUploadFiles(files: File[]) {
  selectedFiles.value = files;
  const img = selectedFiles.value[0];
  post.value.imageId = img.name;
  const imageUrl = URL.createObjectURL(img);
  blobImage.value = {blobLink: imageUrl, id: img.name};
}

function deleteCurrentImage(blobLink: string) {
  post.value.imageId = ''
  blobImage.value = { blobLink: "", id: "" }
  URL.revokeObjectURL(blobLink);
}


async function imageConversion() {
  store.isLoading = true;
  await loadImageAsBlob(getImgUrl(post.value.imageId), post.value.imageId)
  store.isLoading = false;
}

async function loadImageAsBlob(url: string, id: string) {
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
  if (validationFields(post.value)) {
    await store.updatePost(post.value)
    await uploadImages(selectedFiles.value)
    $q.notify({
      message: 'Пост отредактирован!',
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

async function deletePost(post: PostInfo) {
  await store.deletePost(post)
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
            <q-btn color="green" class="button" label="Изменить" size="17px" @click="onSave"/>
            <q-btn class="q-ml-sm button" color="primary" flat label="Назад" size="17px" @click="router.push('/posts')"/>
            <q-btn class="q-ml-sm button" color="red" flat label="Удалить" size="17px" @click="deletePost(post)"/>
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
    flex-wrap: wrap
    @media (max-width: 1199px)
      padding: 0 25px
    @media (max-width: 767px)
      justify-content: center
    &__img
      width: 540px
      @media (max-width: 1199px)
        width: 450px
      @media (max-width: 991px)
        width: 45vw
      @media (max-width: 767px)
        width: 500px

.form
  width: 540px
  row-gap: 23px
  @media (max-width: 1199px)
    width: 45vw
  @media (max-width: 767px)
    width: 80vw
    margin-top: 20px

.add-btn
  display: flex
  height: 50px
.button
  @media (max-width: 991px)
    width: 100px
    font-size: 14px !important
  @media (max-width: 575px)
    width: 80px
    font-size: 12px !important
</style>