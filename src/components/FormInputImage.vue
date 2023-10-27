<script setup>
const emit = defineEmits(['on-upload-file'])

</script>

<template>
  <div class="col-md-6">
    <input type="file" multiple @change="emit('on-upload-file', $event)" accept="image/*" />
  </div>
</template>

<style lang="sass" scoped>

</style>