<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import getImgUrl from "../utils/getImageUrl.ts";
import {useAppStore} from "../stores/AppStore.ts";
import formatDateString from "../utils/formatDateString.ts";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import {PostInfo} from "../types/PostData.ts";
import {defaultPostState} from "../utils/defaultPostState.ts";
import router from "../router/router.ts";

const route = useRoute();
const store = useAppStore()
const postId = ref<string>(route.params.postId as string);
const post = ref<PostInfo>(defaultPostState);

onMounted(() => {
  post.value = store.getPost(postId.value);
  if (!post.value.title || !post.value.description) {
    router.push('/error')
  }
})
</script>

<template>
  <div class="post">
    <DefaultLayout>
      <div class="post__main">
        <div class="post__main__img">
          <q-img :src="getImgUrl(post?.imageId)" class="post__main__img"/>
        </div>
        <div class="post__main__info">
          <div class="post__main__info__date">Дата создания:
            <div class="post__main__info__date__create">{{formatDateString(post?.postDate) }}</div>
          </div>
          <div class="post__main__info__title">{{post?.title}}</div>
          <div class="post__main__info__description">{{post?.description}}</div>
        </div>
      </div>
    </DefaultLayout>
  </div>
</template>

<style lang="sass" scoped>
.post
  background-color: #F9F9F9
  min-height: 100vh
  &__main
    display: flex
    margin-top: 30px
    padding: 0 20px
    @media (max-width: 767px)
      flex-wrap: wrap
      justify-content: center
    &__img
      width: 540px
      height: 580px
      @media (max-width: 991px)
        width: 45vw
        height: 48vh
      @media (max-width: 767px)
        width: 80vw
        height: 50vh
    &__info
      padding: 0 40px
      max-width: 600px
      @media (max-width: 767px)
        margin-top: 40px
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
        @media (max-width: 991px)
          font-size: 24px
        @media (max-width: 575px)
          font-size: 20px
      &__description
        margin-top: 20px
        font-family: Raleway, serif
        font-weight: 800
        font-size: 18px
        color: #333
        @media (max-width: 575px)
          font-size: 15px
</style>