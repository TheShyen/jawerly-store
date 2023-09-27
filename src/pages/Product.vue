<script setup>
  import {ref} from "vue";
  
  const slide = ref(1)
</script>

<template>
  <div class="product">
    <div class="product__wrapper">
      <div class="product__main">
        <div class="product__main__carousel">
          <q-carousel
            height="580px"
            swipeable
            animated
            v-model="slide"
            thumbnails
            infinite
          >
            <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
            <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
          </q-carousel>
        </div>
        <div class="product__main__info">
          <div class="product__main__border__one">
            <div class="product__main__border__two"></div>
          </div>
          
        </div>
      </div>
      
    </div>
  </div>
</template>

<style lang="sass" scoped>
.product
  background-color: #F9F9F9
  min-height: 800px
  &__wrapper
    padding: 120px 0
    margin: 0 auto
    width: 1150px
  &__main
    display: flex
    justify-content: space-between
    &__carousel
      width: 540px
      height: 580px
    &__info
      display: flex
      flex-direction: row
    &__border
      display: flex
      justify-content: space-between
      &__one
        width: 540px
        height: 580px
        border: 2px solid var(--grey, #D6D6D6)
      &__two
        margin: 8px auto
        width: 520px
        height: 560px
        border: 2px solid var(--grey, #D6D6D6)
      

</style>