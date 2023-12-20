<script setup lang="ts">
import router from "../router/router.ts";
import getImgUrl from "../utils/getImageUrl.ts";
import {useAuthStore} from "../stores/auth.ts";
import {useAppStore} from "../stores/AppStore.js";
import {ProductInfo} from "../types/ProductData.js";
import {ref} from "vue";
import MainButton from "./UI/MainButton.vue";
import redirect from "../utils/redirect.ts";
import DeleteDialog from "./DeleteDialog.vue";



const authStore = useAuthStore();
const store = useAppStore();
defineProps<{
  product: ProductInfo
}>();

const isShowConfirmDialog = ref(false)
function openEditPage(id: string): void {
  router.push('/editProduct/' + id);
}
function deleteProduct(product: ProductInfo): void {
  store.deleteProduct(product)
}

</script>

<template>
  <q-card class="catalog__card" flat square @click="router.push('/product/' + product.id)">
    <q-img :src=getImgUrl(product.previewImageId) class="catalog__card__img" ></q-img>
    <q-card-section class="catalog__card__section">
      <div class="catalog__card__category">{{ product.category }}</div>
      <div class="catalog__card__title">{{ product.title }}</div>
      <div class="catalog__card__btns">
        <MainButton @click.stop="redirect(product.link)">{{ product.price + ' ₽' }}</MainButton>
        <q-btn v-if="authStore.isAuth" class="catalog__card__edit" flat rounded size="14px" @click.stop="openEditPage(product.id)">
          <q-icon color='grey' name="edit"/>
        </q-btn>
        <q-btn v-if="authStore.isAuth" class="catalog__card__edit" flat rounded size="14px" @click.stop="isShowConfirmDialog = true">
          <q-icon color='red' name="delete"/>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
  <DeleteDialog v-model="isShowConfirmDialog" @delete-item="deleteProduct(product)">Вы уверены, что хотите удалить товар?</DeleteDialog>
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

    

</style>