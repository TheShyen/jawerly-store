<script setup>

</script>

<template>
  <div class="questions">
    <div>
      <div class="subhead subhead__questions">Есть вопросы?</div>
      <div class="head head__questions">Напишите нам в социальных сетях</div>
      <q-btn href='#socials' class="questions__btn">Наши соцсети</q-btn>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.questions
  background: url(../static/Rectangle.png) center (center/cover) no-repeat
  min-height: 400px
  padding: 100px 0
  
  &__btn
    width: 12%
    display: flex
    margin: 20px auto
    font-family: Raleway, serif
    font-size: 18px
    font-weight: 500
    text-transform: uppercase
    border: 1px solid var(--accent, #333)
    background: var(--white, #FFF)
</style>