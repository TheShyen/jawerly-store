<script setup>

</script>

<template>
  <q-input
    :rules="[ val => val && val.length > 0 || 'Please type something']"
    class="col-md-6 text-h6"
    filled
    label="Title"
    lazy-rules
  />
</template>

<style lang="sass" scoped>

</style>