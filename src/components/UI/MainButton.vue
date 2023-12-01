<script setup>

</script>

<template>
  <q-btn class="btn">
    <slot/>
  </q-btn>
</template>

<style lang="sass" scoped>
.btn
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