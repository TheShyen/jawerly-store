@ts-ignore
<script setup>
import {date} from 'quasar'
import {computed, onMounted, ref} from "vue";
import {getNews, getProducts} from '../api.js'
import { useNewsStore } from '../stores/NewsStore'
const store = useNewsStore()
const timeStamp = Date.now()
const products = ref(null)
onMounted(() => {
  getProducts()
    .then((data) => {
      products.value = data;
    })
    .catch((error) => {
      console.error('Произошла ошибка:', error);
    });
  getNews()
    .then((data) => {
      store.news = data;
    })
    .catch((error) => {
      console.error('Произошла ошибка:', error);
    });
})
const lastProducts = computed(()=> {
  const copyProducts = products.value;
  return copyProducts?.splice(-6)
})
const getImgUrl = (id)=> {
  return `https://saros-api-v3-production.up.railway.app/api/v3/images/${id}`
}
</script>

<template>
  <div class="products__wrapper">
    <div class="lent">Последние товары</div>
    <div class="products__card column ">
        <q-card v-for="card in lastProducts" class="card" flat bordered square>
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
</template>


<style scoped>
.products__wrapper {
  padding: 80px 0;
}
.products__card {
  max-width: 950px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
}
.lent {
  display: flex;
  justify-content: center;
  color: var(--accent, #333);
  text-align: center;
  font-family: Noto Serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-bottom: 20px;
}



.card {
  margin-top: 10px;
  width: 33%;
  height: 43%;
}

.card__price {
  font-size: 24px;
}
.card__info {
  min-height: 130px;
}
.card__title {
    font-size: 16px;
}

</style>