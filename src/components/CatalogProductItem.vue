<script setup>
import router from "../router/router.js";
import getImgUrl from "../utils/getImageUrl.js";
import {useAuthStore} from "../stores/auth.js";
import {useAppStore} from "../stores/AppStore.js";
import {ref} from "vue";

const authStore = useAuthStore();
const store = useAppStore();
defineProps(['card'])

const isShowConfirmDialog = ref(false)
function openEditPage(id) {
  router.push('/editProduct/' + id);
}
function deleteProduct(card) {
  store.deleteProduct(card)
}

</script>

<template>
  <q-card class="catalog__card" flat square @click="router.push('/product/' + card.id)">
    <q-img :src=getImgUrl(card.previewImageId) class="catalog__card__img" ></q-img>
    <q-card-section class="catalog__card__section">
      <div class="catalog__card__category">{{ card.category }}</div>
      <div class="catalog__card__title">{{ card.title }}</div>
      <div class="catalog__card__btns">
        <q-btn class="catalog__card__btn">{{ card.price + ' ₽' }}</q-btn>
        <q-btn v-if="authStore.isAuth" class="catalog__card__edit" flat rounded size="14px" @click.stop="openEditPage(card.id)">
          <q-icon color='grey' name="edit"/>
        </q-btn>
        <q-btn v-if="authStore.isAuth" class="catalog__card__edit" flat rounded size="14px" @click.stop="isShowConfirmDialog = true">
          <q-icon color='red' name="delete"/>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
  <q-dialog v-model="isShowConfirmDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="text-h6">Хотите удалить товар?</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Отмена" color="grey" v-close-popup />
        <q-btn label="Удалить" color="red" v-close-popup @click="deleteProduct(card)"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="sass" scoped>
.catalog__card
  margin-top: 15px
  width: 300px
  height: 450px
  background: #F9F9F9
  &:hover
    background: rgba(0,0,0,.03)
    transition: 0.7s
    cursor: pointer
  
  &__section
    padding: 0 0
  
  &__img
    height: 220px
  
  &__category
    color: var(--accent, #333)
    text-align: center
    font-family: Raleway, serif
    font-size: 14px
    font-weight: 600
    margin-top: 15px
  &__title
    color: var(--accent, #333)
    text-align: center
    font-family: Raleway, serif
    font-size: 20px
    font-weight: 800
    height: 60px
  
  &__btns
    display: flex
    margin-top: 20px
  &__btn
    margin: auto
    padding: 10px 20px
    font-family: Poppins, serif
    font-size: 18px
    font-weight: 500
    text-transform: uppercase
    border: 2px solid var(--white, #FFF)
    background: var(--accent, #333)
    color: var(--white, #FFF)
    &:hover
      transform: scale(1.05)
      transition: 0.6s
    

</style>