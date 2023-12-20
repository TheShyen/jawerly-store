<script setup lang="ts">
  defineEmits(['delete-item'])
</script>

<template>
  <q-dialog persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="text-h6"><slot></slot></span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Отмена" color="grey" v-close-popup />
        <q-btn label="Удалить" color="red" v-close-popup @click="$emit('delete-item')"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped>
</style>