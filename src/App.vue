<script lang="ts" setup>
  import router from "./router/router.js";
  import {onMounted} from "vue";
  let tabs;
  onMounted(() => {
    tabs = document.querySelectorAll(".tab");
  })
  function removeActiveClassAndRedirect() {
    for(const item of tabs) {
      item.classList.remove("q-tab--active")
    }
    router.push('/login')
  }
  
</script>


<template>
  <q-layout view="hhh lpR fFf">
    <q-header class="text-white header" reveal style="height: 60px">
      <q-toolbar class="justify-around">
        <q-toolbar-title class="logo text-h4" shrink>
          <q-avatar>
            <img alt="logo" src="./static/logo-svgrepo-com.svg">
          </q-avatar>
          SaRoS BiJoU
        </q-toolbar-title>
        <q-tabs class="tabs text-h7 q-mt-xs">
          <q-tab class="tab" name="images" @click="router.push('/')">Главная</q-tab>
          <q-tab class="tab" name="videos" @click="router.push('/catalog')">Каталог</q-tab>
          <q-tab class="tab" name="articles" @click="router.push('/posts')">Посты</q-tab>
        </q-tabs>
        <div class="login">
          <q-btn color="white" flat label="Войти" @click="removeActiveClassAndRedirect()">
            <q-icon class="q-ml-xs" left name="login"></q-icon>
            <div class="login__info">( только для администраторов )</div>
          </q-btn>
          
        </div>
      
      </q-toolbar>
    </q-header>
    <router-view></router-view>
  </q-layout>
</template>


<style lang="sass" scoped>
.header
  background: linear-gradient(0deg, rgba(51, 51, 51, 0.87) 0%, rgba(51, 51, 51, 0.87) 100%), lightgray 50% / cover no-repeat

.logo
  width: 300px
  

.tabs
  width: 500px

.login
  display: flex
  width: 300px
  flex-direction: column
  flex-wrap: wrap
  &__info
    display: flex
    text-align: center
    font-family: Raleway, serif
    font-weight: 400
    font-size: 11px

</style>
