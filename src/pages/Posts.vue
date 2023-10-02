<script setup>
import {useAppStore} from "../stores/AppStore.js";
import router from "../router/router.js";
import formatDateString from "../utils/formatDateString.js";


const store = useAppStore()


const getImgUrl = (id) => {
  return `https://saros-api-v3-production.up.railway.app/api/v3/images/${id}`
}
</script>

<template>
  <div class="posts">
    <div class="posts__wrapper">
      <div class="posts__cards">
        <q-card @click="router.push('/posts/' + post.id)" v-for="post in store.posts" class="posts__card" :key="post.id" flat>
          <q-img :src=getImgUrl(post.imageId) class="posts__card__img" />
          <q-card-section class="posts__card__section">
            <div class="posts__card__date">{{ formatDateString(post.postDate) }}</div>
            <div class="posts__card__title">{{ post.title }}</div>
            
          </q-card-section>
          <q-btn class="posts__card__btn" @click="router.push('/posts/' + post.id)">Подробнее</q-btn>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.posts
  background-color: #F9F9F9
  min-height: 800px
  &__wrapper
    padding: 120px 0
    margin: 0 auto
    max-width: 1050px
  &__cards
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    flex-direction: row
  &__card
    margin-top: 25px
    width: 300px
    height: 450px
    background: #F9F9F9
    &__img
      border-radius: 10px
      height: 220px
   
    &__section
      padding: 15px 15px
      
    &__date
      color: var(--accent, #333)
      font-family: Poppins, serif
      font-size: 14px
      font-weight: 200
      margin-top: 15px
    &__title
      color: var(--accent, #333)
      font-family: Raleway, serif
      font-size: 18px
      font-weight: 800
      margin-top: 15px
      overflow: hidden
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
    
    &__btn
      display: flex
      padding: 10px 20px
      position: absolute
      top: 380px
      left: 10px
      font-family: Raleway, serif
      font-size: 18px
      font-weight: 500
      text-transform: uppercase
      border: 2px solid var(--white, #FFF)
      border-radius: 30px
      background: var(--accent, #333)
      color: var(--white, #FFF)
  
</style>