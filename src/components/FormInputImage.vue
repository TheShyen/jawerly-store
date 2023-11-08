<script setup>
import {ref} from "vue";

const emit = defineEmits(['on-upload-file'])
const images = ref([]);
function addFiles(files) {
  images.value = files;
  emit('on-upload-file', images.value)
  console.log(images.value)
}
function deleteFiles(files) {
  images.value.splice(images.value.findIndex(item => item === files[0]), 1)
  emit('on-upload-file', images.value)
  console.log(images.value)
}

</script>

<template>
  <div class="uploader col-lg-6">
    <q-uploader
      v-bind="$attrs"
      no-thumbnails
      files
      @added="addFiles"
      @removed="deleteFiles"
      label="Загрузите картинки"
      multiple
    />
  </div>
</template>

<style lang="sass" scoped>

</style>