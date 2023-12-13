<script setup lang="ts">
import {ref} from "vue";
const emit = defineEmits(['on-upload-file'])
const images = ref<object[]>([]);
function addFiles(files: readonly object[]) {
  emit('on-upload-file', files)
}
function deleteFiles(files: readonly object[]) {
  images.value.splice(images.value.findIndex(item => item === files[0]), 1)
  emit('on-upload-file', images.value)
}

</script>

<template>
  <div>
    <q-uploader
      class="uploader"
      v-bind="$attrs"
      hide-upload-btn
      no-thumbnails
      files
      @added="addFiles"
      @removed="deleteFiles"
      label="Загрузите картинки"
    />
  </div>
</template>

<style lang="sass" scoped>
.uploader
  @media (max-width: 575px)
    width: 80vw
</style>