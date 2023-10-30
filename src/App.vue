<script setup>
  import router from "./router/router.js";
  import {onMounted} from "vue";
  import {useAuthStore} from "./stores/auth.js";
  import {useQuasar} from "quasar";
  
  const $q = useQuasar();
  let tabs;
  const authStore = useAuthStore();
  
  function checkUser() {
    const users = JSON.parse(localStorage.getItem('users'))
    if (users) {
      authStore.userInfo = users;
    }
  }
  
  checkUser()
  onMounted(() => {
    tabs = document.querySelectorAll(".tab");
  })
  function removeActiveClassAndRedirect() {
    for(const item of tabs) {
      item.classList.remove("q-tab--active")
    }
    router.push('/login')
  }
  function logOut() {
    authStore.logOut()
    $q.notify({
      message: 'Вы вышли из аккаунта',
      color: 'green',
      timeout: 1500,
      position: 'top'
    })
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
          <q-btn v-if="!authStore.isAuth" color="white" flat label="Войти" @click="removeActiveClassAndRedirect()">
            <q-icon class="q-ml-xs" left name="login"></q-icon>
            <div class="login__info">( только для администраторов )</div>
          </q-btn>
          <q-btn-dropdown
            v-if="authStore.isAuth"
            color="green"
          >
            <template v-slot:label>
              <div class="row items-center no-wrap">
                <q-icon left name="people" />
                <div class="text-center login__text">
                  {{authStore.userInfo.email}}
                </div>
              </div>
            </template>
            
            <q-list>
              <q-item v-ripple clickable v-close-popup @click="logOut()">
                <q-item-section class="justify-center">
                  <q-item-label><q-icon name="logout" class="q-mr-xs"/>Выйти из аккаунта</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
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
  &__text
    font-size: 14px
    text-transform: none
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    max-width: 25ch
    
</style>
