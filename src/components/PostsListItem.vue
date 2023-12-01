<script setup>
import router from "../router/router.ts";
import formatDateString from "../utils/formatDateString.js";
import getImgUrl from "../utils/getImageUrl.js";
import {useAppStore} from "../stores/AppStore.ts";
import {useAuthStore} from "../stores/auth.js";
import MainButton from "./UI/MainButton.vue";

const store = useAppStore();
const authStore = useAuthStore();

function openEditPage(id) {
  router.push('/editPost/' + id);
}

function deletePost(post) {
  store.deletePost(post)
}
</script>

<template>
  <q-card @click="router.push('/posts/' + post.id)" v-for="post in store.posts" class="posts__card" :key="post.id" flat>
    <q-img :src=getImgUrl(post.imageId) class="posts__card__img" />
    <q-card-section class="posts__card__section">
      <div class="posts__card__date">{{ formatDateString(post.postDate) }}</div>
      <div class="posts__card__title">{{ post.title }}</div>
      <div class="posts__card__btns">
        <MainButton @click="router.push('/posts/' + post.id)" style="font-family: Raleway, serif">Подробнее</MainButton>
        <q-btn v-if="authStore.isAuth" class="catalog__card__edit" flat rounded size="14px" @click.stop="openEditPage(post.id)">
          <q-icon color='grey' name="edit"/>
        </q-btn>
        <q-btn v-if="authStore.isAuth" class="catalog__card__edit" flat rounded size="14px" @click.stop="deletePost(post)">
          <q-icon color='red' name="delete"/>
        </q-btn>
      </div>
    </q-card-section>
    
    
  </q-card>
</template>

<style lang="sass" scoped>
.posts__card
  margin-top: 25px
  width: 300px
  height: 450px
  background: #F9F9F9
  &:hover
    background: rgba(0,0,0,.03)
    transition: 0.7s
    cursor: pointer
  &__img
    border-radius: 10px
    height: 220px
  
  &__section
    padding: 5px 5px
  
  &__date
    color: var(--accent, #333)
    font-family: Poppins, serif
    font-size: 14px
    font-weight: 200
    margin-top: 15px
  &__title
    color: var(--accent, #333)
    font-family: Raleway, serif
    height: 60px
    font-size: 18px
    font-weight: 800
    margin-top: 15px
    overflow: hidden
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
  &__btns
    display: flex
    margin-top: 20px
</style>