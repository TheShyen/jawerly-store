<script setup>
import router from "../router/router.js";
import formatDateString from "../utils/formatDateString.js";
import getImgUrl from "../utils/getImageUrl.js";
import {useAppStore} from "../stores/AppStore.js";
import {useAuthStore} from "../stores/auth.js";

const store = useAppStore();
const authStore = useAuthStore();

function openEditPage(id) {
  router.push('/editPost/' + id);
}
</script>

<template>
  <q-card @click="router.push('/posts/' + post.id)" v-for="post in store.posts" class="posts__card" :key="post.id" flat>
    <q-img :src=getImgUrl(post.imageId) class="posts__card__img" />
    <q-card-section class="posts__card__section">
      <div class="posts__card__date">{{ formatDateString(post.postDate) }}</div>
      <div class="posts__card__title">{{ post.title }}</div>
      <div class="posts__card__btns">
        <q-btn class="posts__card__btn" @click="router.push('/posts/' + post.id)">Подробнее</q-btn>
        <q-btn v-if="authStore.isAuth" class="catalog__card__edit" flat rounded size="14px" @click.stop="openEditPage(post.id)">
          <q-icon color='grey' name="edit"/>
        </q-btn>
        <q-btn v-if="authStore.isAuth" class="catalog__card__edit" flat rounded size="14px">
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
  &__btn
    display: flex
    padding: 10px 20px
    margin-right: 10px
    font-family: Raleway, serif
    font-size: 18px
    font-weight: 500
    text-transform: uppercase
    border: 2px solid var(--white, #FFF)
    border-radius: 30px
    background: var(--accent, #333)
    color: var(--white, #FFF)
</style>