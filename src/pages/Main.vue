<script setup>
import MainPromo from "../components/MainPromo.vue";
import MainPreviewProducts from "../components/MainPreviewProducts.vue";
import MainQuestions from "../components/MainQuestions.vue";
import MainPreviewPosts from "../components/MainPreviewPosts.vue";
import MainFooter from "../components/MainFooter.vue";


</script>

<template>
  <MainPromo/>
  <MainPreviewProducts/>
  <MainQuestions/>
  <MainPreviewPosts/>
  <MainFooter/>
</template>


<style lang="sass">
.subhead
  text-align: center
  font-family: Raleway, serif
  font-size: 21px
  font-weight: 400
  &__questions
    color: var(--white, #FFF)
  &__posts
    color: var(--accent, #333)

.head
  text-align: center
  font-family: 'Noto Serif'
  font-size: 30px
  font-weight: 700
  margin-top: 15px
  &__questions
    color: var(--white, #FFF)
  &__posts
    color: var(--accent, #333)
  @media (max-width: 575px)
    font-size: 18px
</style>