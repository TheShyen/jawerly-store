<script setup>

</script>

<template>
  <div class="socials" id="socials">
    <div class="head head__questions">Мы в социальных сетях</div>
    <div class="socials__links">
      <img alt="vk" class="socials__links__img" src="../assets/vk.svg"/>
      <img alt="instagram" class="socials__links__img" src="../assets/instagram.svg"/>
      <img alt="telegram" class="socials__links__img" src="../assets/telegram.svg"/>
    </div>
  
  </div>
</template>

<style lang="sass" scoped>
.socials
  background: url(../static/Rectangle.png) center (center/cover) no-repeat
  min-height: 250px
  padding: 30px 0
  
  &__links
    display: flex
    justify-content: space-evenly
    width: 30%
    margin: 40px auto
    
    &__img
      width: 50px
      height: 50px
      &:hover
        transition: 0.6s
        cursor: pointer
        transform: scale(1.1)
</style>