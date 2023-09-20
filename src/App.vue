<script lang="ts" setup>

import Main from "./pages/Main.vue";
</script>


<template>
  <q-layout view="hhh lpR fFf">
    <q-header class="text-white header" reveal style="height: 60px">
      <q-toolbar class="justify-center">
        <q-toolbar-title class="text-h4" shrink>
          <q-avatar>
            <img alt="logo" src="../src/static/logo-svgrepo-com.svg">
          </q-avatar>
          SaRoS BiJoU
        </q-toolbar-title>
        <q-tabs class="text-h7 q-mt-xs">
          <q-tab name="images">Главная</q-tab>
          <q-tab name="videos">Каталог</q-tab>
          <q-tab name="articles">Articles</q-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>
    
      <div class="promo">
        <div class="promo__wrapper">
          <div class="promo__slogan">Стильно, дорого, богато!</div>
          <q-btn class="promo__btn" >каталог изделий</q-btn>
        </div>
      </div>
      <div class="products">
        <Main/>
      </div>
      
    
  
  </q-layout>
</template>


<style lang="sass" scoped>
.header
  background: linear-gradient(0deg, rgba(51, 51, 51, 0.87) 0%, rgba(51, 51, 51, 0.87) 100%), lightgray 50% / cover no-repeat

.promo
  min-height: 730px
  margin: 0 auto
  color: #fff
  background: url(./static/bgc.png) center (center/cover) no-repeat
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
  

</style>
