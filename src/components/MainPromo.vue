<script setup>

</script>

<template>
  <div class="promo">
    <div class="promo__wrapper">
      <div class="promo__slogan">Стильно, дорого, богато!</div>
      <q-btn class="promo__btn" >каталог изделий</q-btn>
    </div>
    
  </div>
</template>

<style lang="sass" scoped>
.promo
  min-height: 730px
  margin: 0 auto
  color: #fff
  background: url(../static/bgc.png) center (center/cover) no-repeat
  &__wrapper
    display: flex
    flex-direction: column
  
  &__slogan
    display: flex
    justify-content: center
    color: #FFF
    margin-top: 500px
    font-family:'Noto Serif', serif
    font-size: 36px
    font-weight: 700
  
  &__btn
    display: flex
    margin: 20px auto
    font-family: Raleway, serif
    font-size: 18px
    font-weight: 500
    text-transform: uppercase
    border: 2px solid var(--white, #FFF)
    background: var(--accent, #333)
</style>