<script setup lang="ts">
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
  @media (max-width: 1199px)
    padding: 0 10px
  @media (max-width: 575px)
    padding: 0 0
  &__cards
    display: flex
    flex-wrap: wrap
    justify-content: space-around
    flex-direction: row
    gap: 5px 5px
  &__card
    margin-top: 15px
    width: 350px
    height: 370px
    background: #F9F9F9
    @media (max-width: 575px)
      width: 250px
      height: 270px
    &:hover
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.7)
      transition: 0.6s
      cursor: pointer
      transform: scale(1.03)
    &__img
      height: 370px
      @media (max-width: 575px)
        height: 270px
    
    &__title
      color: #FFF
      text-align: center
      font-family: Raleway, serif
      font-size: 21px
      background: none
      padding-bottom: 22px
      

  
</style>