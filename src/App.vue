<script lang="ts" setup>
  import router from "./router/router.js";
  
</script>


<template>
  <q-layout view="hhh lpR fFf">
    <q-header class="text-white header" reveal style="height: 60px">
      <q-toolbar class="justify-center">
        <q-toolbar-title class="text-h4" shrink>
          <q-avatar>
            <img alt="logo" src="./static/logo-svgrepo-com.svg">
          </q-avatar>
          SaRoS BiJoU
        </q-toolbar-title>
        <q-tabs class="text-h7 q-mt-xs">
          <q-tab @click="router.push('/')" name="images">Главная</q-tab>
          <q-tab @click="router.push('/catalog')" name="videos">Каталог</q-tab>
          <q-tab name="articles">Articles</q-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <router-view></router-view>
  </q-layout>
</template>


<style lang="sass" scoped>
.header
  background: linear-gradient(0deg, rgba(51, 51, 51, 0.87) 0%, rgba(51, 51, 51, 0.87) 100%), lightgray 50% / cover no-repeat
</style>
