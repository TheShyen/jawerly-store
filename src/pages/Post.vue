<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import getImgUrl from "../utils/getImageUrl.js";
import {useAppStore} from "../stores/AppStore.js";
import formatDateString from "../utils/formatDateString.js";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const route = useRoute();
const store = useAppStore()
const postId = ref(route.params.postId);
const post = ref({});

onMounted(() => {
  post.value = store.getPost(postId);
})
</script>

<template>
  <div class="post">
    <DefaultLayout>
      <div class="post__main">
        <div class="post__main__img">
          <q-img :src="getImgUrl(post?.imageId)"/>
        </div>
        <div class="post__main__info">
          <div class="post__main__info__date">Дата создания:
            <div class="post__main__info__date__create">{{formatDateString(post?.postDate) }}</div>
          </div>
          <div class="post__main__info__title">{{post?.title}}</div>
          <div class="post__main__info__description">{{post?.text}}</div>
        </div>
      </div>
    </DefaultLayout>
  </div>
</template>

<style lang="sass" scoped>
.post
  background-color: #F9F9F9
  min-height: 100vh
  &__wrapper
    padding: 120px 0
    margin: 0 auto
    width: 1150px
  &__main
    display: flex
    margin-top: 30px
    &__img
      width: 540px
      height: 580px
    &__info
      padding: 0 40px
      max-width: 600px
      &__date
        display: flex
        flex-direction: row
        font-family: Raleway, serif
        font-weight: 600
        font-size: 14px
        color: #333
        &__create
          font-family: Poppins, serif
          font-weight: 400
          margin-left: 10px
      &__title
        margin-top: 10px
        font-family: Raleway, serif
        font-weight: 800
        font-size: 28px
        color: #333
        text-transform: uppercase
      &__description
        margin-top: 20px
        font-family: Raleway, serif
        font-weight: 800
        font-size: 18px
        color: #333
</style>