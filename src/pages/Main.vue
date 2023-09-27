<script setup>
import {computed, onMounted, ref} from "vue";
import { useAppStore } from '../stores/AppStore.js'
const store = useAppStore()
onMounted(() => {
  store.getProducts()
  store.getPosts()
})
const lastProducts = computed(()=> {
  return store.products.slice(-6);
})
const firstPosts = computed(() => {
  return store.posts.slice(-6);
})
const getImgUrl = (id)=> {
  return `https://saros-api-v3-production.up.railway.app/api/v3/images/${id}`
}
</script>

<template>
  <div class="promo">
    <div class="promo__wrapper">
      <div class="promo__slogan">Стильно, дорого, богато!</div>
      <q-btn class="promo__btn" >каталог изделий</q-btn>
    </div>
  </div>
  <div class="products">
    <div class="products__wrapper">
      <div class="lent">Последние товары</div>
      <div class="products__card column ">
        <q-card v-for="card in lastProducts" :key="card.id" class="card" flat bordered square>
          <q-img :src = getImgUrl(card.previewImageId)>
            <div class="card__info absolute-bottom text-h6">
              <div class="card__price text-white">
                {{card.price}} ₽
              </div>
              <div class=" card__title self-center text-white">
                {{card.title}}
              </div>
            </div>
          </q-img>
        
        </q-card>
      </div>
    </div>
  </div>
  <div class="questions">
    <div>
      <div class="subhead subhead__questions">Есть вопросы?</div>
      <div class="head head__questions">Напишите нам в социальных сетях</div>
      <q-btn class="questions__btn">Наши соцсети</q-btn>
    </div>
  </div>
  <div class="posts">
    <div class="posts__wrapper">
      <div>
        <div class="subhead subhead__posts">Полезные статьи и новости</div>
        <div class="head head__posts">Лучшие советы по подбору украшений и акции</div>
      </div>
      
      <div class="posts__cards">
        <q-card class="posts__card" v-for="post in firstPosts" square>
          <q-img :src="getImgUrl(post.imageId)" class="posts__card__img">
            <div class="absolute-bottom posts__card__title">
              {{post.title}}
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
    
  </div>
  
</template>


<style lang="sass" scoped>
.subhead
  text-align: center
  font-family: Raleway, serif
  font-size: 21px
  font-weight: 400
  &__questions
    color: var(--white, #FFF)
  &__posts
    color: var(--accent, #333)

.head
  text-align: center
  font-family: 'Noto Serif'
  font-size: 30px
  font-weight: 700
  margin-top: 15px
  &__questions
    color: var(--white, #FFF)
  &__posts
    color: var(--accent, #333)

.promo
  min-height: 730px
  margin: 0 auto
  color: #fff
  background: url(../static/bgc.png) center (center/cover) no-repeat
  &__wrapper
    display: flex
    flex-direction: column
  
  &__slogan
    display: flex
    justify-content: center
    color: #FFF
    margin-top: 500px
    font-family:'Noto Serif', serif
    font-size: 36px
    font-weight: 700
  
  &__btn
    display: flex
    margin: 20px auto
    font-family: Raleway, serif
    font-size: 18px
    font-weight: 500
    text-transform: uppercase
    border: 2px solid var(--white, #FFF)
    background: var(--accent, #333)
.products
  background-color: #F9F9F9

.products__wrapper
  padding: 80px 0

.products__card
  max-width: 950px
  margin: 0 auto
  display: flex
  flex-wrap: wrap
  justify-content: space-around
  flex-direction: row

.lent
  display: flex
  justify-content: center
  color: var(--accent, #333)
  font-family: Noto Serif
  font-size: 30px
  font-weight: 700
  padding-bottom: 20px

.card
  margin-top: 15px
  width: 300px
  height: 300px
  &__title
    font-size: 16px
    
.questions
  background: url(../static/Rectangle.png) center (center/cover) no-repeat
  min-height: 400px
  padding: 100px 0
  
  &__btn
    display: flex
    margin: 20px auto
    font-family: Raleway, serif
    font-size: 18px
    font-weight: 500
    text-transform: uppercase
    border: 1px solid var(--accent, #333)
    background: var(--white, #FFF)
.posts
  background-color: #F9F9F9
  min-height: 700px
  padding: 60px 0
  &__wrapper
    max-width: 1100px
    margin: 0 auto
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