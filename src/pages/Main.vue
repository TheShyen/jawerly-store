<script lang="ts" setup>
import {date} from 'quasar'
import {computed, onMounted, ref} from "vue";
import {getNews, getProducts} from '../api.js'
import { useNewsStore } from '../stores/NewsStore'
const store = useNewsStore()
const timeStamp = Date.now()
const products = ref(null);
const formattedString = date.formatDate(timeStamp, 'DD.MM.YYYY,HH:mm')
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
  <div>
    <div class="lent">Последние товары</div>
    <div class="products__wrapper column ">
        <q-card v-for="card in lastProducts" class="card" flat>
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
  font-family: "Noto Serif";
  font-size: 30px;
  font-weight: 700;
}

.news_list {
  display: flex;
  flex-direction: column;
  justify-content: center;

}

.news_item {
  display: flex;
  flex-wrap: nowrap;
  height: 100px;
  width: 50vw;
}

.card {
  margin-top: 10px;
  width: 33%;
  height: 43%;
}

.card__price {
  font-size: 24px;
}
.card__title {
    font-size: 16px;
}

</style>