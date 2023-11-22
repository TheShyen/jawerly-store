<script setup>
import getImgUrl from "../utils/getImageUrl.js";
import {useAppStore} from "../stores/AppStore.ts";
import {computed, onMounted} from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import router from "../router/router.ts";

const store = useAppStore()
onMounted(() => {
  store.getPosts()
})

const firstPosts = computed(() => {
  return store.posts.slice(-6);
})
</script>

<template>
  <div class="posts">
    <DefaultLayout>
      <div>
        <div class="subhead subhead__posts">Полезные статьи и новости</div>
        <div class="head head__posts">Лучшие советы по подбору украшений и акции</div>
      </div>
      
      <div class="posts__cards">
        <q-card class="posts__card" v-for="post in firstPosts" @click="router.push('/posts/' + post.id)" square>
          <q-img :src="getImgUrl(post.imageId)" class="posts__card__img">
            <div class="absolute-bottom posts__card__title">
              {{post.title}}
            </div>
          </q-img>
        </q-card>
      </div>
    </DefaultLayout>
  </div>
</template>

<style lang="sass" scoped>
.posts
  background-color: #F9F9F9
  min-height: 700px

  &__cards
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    flex-direction: row
  &__card
    margin-top: 15px
    width: 350px
    height: 370px
    background: #F9F9F9
    &:hover
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.7)
      transition: 0.6s
      cursor: pointer
      transform: scale(1.03)
    &__img
      height: 370px
    &__title
      color: #FFF
      text-align: center
      font-family: Raleway, serif
      font-size: 21px
      background: none
      padding-bottom: 22px
</style>