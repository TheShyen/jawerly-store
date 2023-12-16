<script lang="ts" setup>

import DefaultLayout from "../layouts/DefaultLayout.vue";
import MainButton from "../components/UI/MainButton.vue";
import router from "../router/router.ts";
</script>

<template>
  <DefaultLayout>
    <div class="error">
      <div class="info">
        <div class="info__title">Страница не найдена</div>
        <div class="info__desc">Кажется что-то пошло не так! Страница, которую вы запрашиваете, не существует. Возможно
          она устарела, была удалена, или введен неверный адрес в адресной строке.
        </div>
        <MainButton @click="router.push('/')" class="info__btn">Перейти на главную</MainButton>
      </div>
    </div>
  </DefaultLayout>
  
</template>

<style lang="sass" scoped>
.error
  margin: 200px auto
.info
  display: flex
  justify-content: center
  flex-direction: column
  align-items: center
  &__title
    font-family: Raleway, serif
    font-size: 28px
    font-weight: 900
    text-transform: uppercase
  &__desc
    font-family: Raleway, serif
    font-size: 20px
    font-weight: 500
    text-align: center
  &__btn
    margin-top: 15px
    font-family: Raleway, serif
    font-weight: 900
    text-transform: none
</style>