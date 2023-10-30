<script setup>
import {onMounted, ref} from "vue";
import getImgUrl from "../utils/getImageUrl.js";
import {useRoute} from "vue-router";
import {useAppStore} from "../stores/AppStore.js";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import router from "../router/router.js";

const slide = ref('')
const route = useRoute();
const postId = ref(route.params.postId);
const store = useAppStore()
const post = ref({});


onMounted(() => {
  post.value = store.getPost(postId);
  slide.value = post.value.imageId;
  
  
})

function onSubmit() {
}

function onReset() {
}
</script>

<template>
  <div class="product">
    <DefaultLayout>
      <div class="product__main">
        <div class="product__main__img">
          <q-img :src="getImgUrl(post?.imageId)" class="full-height">
            <div class="absolute-top-right">
              <q-btn flat round size="14px">
                <q-icon color='white' name="add"/>
              </q-btn>
              <q-btn class="q-ml-md" flat round size="14px"
                     @click="console.log(`Вы удалили картинку с id ${post?.imageId}`)">
                <q-icon color='red' name="delete"/>
              </q-btn>
            </div>
          </q-img>
        
        </div>
        <div class="product__form">
          <q-form
            class="q-gutter-md column wrap justify-center"
            @reset="onReset"
            @submit="onSubmit"
          >
            <q-input
              v-model="post.title"
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              class="text-h6"
              filled
              label="Заголовок"
              lazy-rules
            />
            <q-input
              v-model="post.description"
              filled
              label="Описание"
              type="textarea"
            />
            
            <div class="q-mt-lg">
              <q-btn color="green" label="Изменить" size="17px" type="submit"/>
              <q-btn class="q-ml-sm" color="primary" flat label="Назад" size="17px" @click="router.push('/posts')"/>
              <q-btn class="q-ml-sm" color="red" flat label="Удалить" size="17px"/>
            </div>
          </q-form>
        </div>
      </div>
    </DefaultLayout>
  </div>
</template>

<style lang="sass" scoped>
.product
  background-color: #F9F9F9
  min-height: 100vh
  
  &__main
    display: flex
    justify-content: space-between
    margin-top: 30px
    &__img
      width: 540px
      
  &__form
    width: 540px
    height: 580px
    margin-left: 40px
</style>