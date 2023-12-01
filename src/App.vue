<script setup lang="ts">
import router from "./router/router.js";
import {onMounted, ref, watch} from "vue";
import {useAuthStore} from "./stores/auth.js";
import {useQuasar} from "quasar";
import {useRoute} from "vue-router";
import {AuthUserInfo} from "./types/AuthUserInfo.ts";

const $q = useQuasar();
const authStore = useAuthStore();

const route = useRoute();
const activeRoute = ref<string>(route.path);
const screenWidth = ref(0)
const isOpen = ref(false);
const isRouteActive = (path: string): boolean => {
  return activeRoute.value === path;
};


watch(() => route.path, (newPath: string) => {
  activeRoute.value = newPath;
});
  
 
  onMounted(() => {
    activeRoute.value = route.path;
    updateScreenWidth();
    onScreenResize();
  });

function onScreenResize() {
  window.addEventListener("resize", () => {
    updateScreenWidth();
  });
}
function updateScreenWidth() {
  screenWidth.value = window.innerWidth;
}
  function checkUser(): void  {
    const user: AuthUserInfo | null = JSON.parse(localStorage.getItem('user') || 'null')
    if (user) {
      authStore.userInfo = user;
    }
  }
  checkUser()
 
  function logOut(): void {
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
        <q-toolbar-title class="logo text-h4" shrink @click.stop="isOpen = !isOpen">
          <q-avatar>
            <img alt="logo" src="./static/logo-svgrepo-com.svg">
          </q-avatar>
          SaRoS BiJoU
          <q-drawer show-if-above side="left" v-model="isOpen" :width="200">
            <q-tabs class="vertical-tabs text-h7 q-mt-xs" vertical indicator-color="yellow">
              <q-route-tab class="tab" name="images" @click="router.push('/')" :class="{ 'q-tab--active': isRouteActive('/')}">Главная</q-route-tab>
              <q-route-tab class="tab" name="videos" @click="router.push('/catalog')" :class="{ 'q-tab--active': isRouteActive('/catalog')}">Каталог</q-route-tab>
              <q-route-tab class="tab" name="articles" @click="router.push('/posts')" :class="{ 'q-tab--active': isRouteActive('/posts')}">Посты</q-route-tab>
            </q-tabs>
          </q-drawer>
        </q-toolbar-title>
        <q-tabs class="tabs text-h7 q-mt-xs" v-if="screenWidth >= 700">
          <q-route-tab class="tab" name="images" @click="router.push('/')" :class="{ 'q-tab--active': isRouteActive('/')}">Главная</q-route-tab>
          <q-route-tab class="tab" name="videos" @click="router.push('/catalog')" :class="{ 'q-tab--active': isRouteActive('/catalog')}">Каталог</q-route-tab>
          <q-route-tab class="tab" name="articles" @click="router.push('/posts')" :class="{ 'q-tab--active': isRouteActive('/posts')}">Посты</q-route-tab>
        </q-tabs>
        <div class="login">
          <q-btn v-if="!authStore.isAuth" color="white" flat label="Войти" @click.prevent="router.push('/login')">
            <q-icon class="q-ml-xs" left name="login"></q-icon>
            <div class="login__info"></div>
          </q-btn>
          <q-btn-dropdown
            v-else
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
  @media (max-width: 575px)
    width: 100vw
.logo
  width: 300px
  @media (max-width: 991px)
    width: 200px
    font-size: 22px
  @media (max-width: 767px)
    font-size: 16px
    width: 160px
  @media (max-width: 575px)
    font-size: 14px
.tabs
  width: 500px
  @media (max-width: 1199px)
    width: 300px
  @media (max-width: 991px)
    width: 280px
  @media (max-width: 767px)
    font-size: 14px
.vertical-tabs
  padding: 0 0
  color: white
  margin: 0 0
  background-color: rgba(51, 51, 51, 0.87)
  font-size: 14px

.login
  display: flex
  width: 300px
  flex-direction: column
  flex-wrap: wrap
  @media (max-width: 991px)
    width: 200px
  @media (max-width: 767px)
    width: 150px
  @media (max-width: 575px)
    margin-right: 30px
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
    @media (max-width: 767px)
      font-size: 12px

</style>
