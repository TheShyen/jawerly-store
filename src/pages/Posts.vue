<script setup>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import PostsList from "../components/PostsList.vue";
import PostsListItem from "../components/PostsListItem.vue";





</script>

<template>
  <div class="posts">
    <DefaultLayout>
      <PostsList>
        <PostsListItem/>
      </PostsList>
    </DefaultLayout>
  </div>
</template>

<style lang="sass" scoped>
.posts
  background-color: #F9F9F9
  min-height: 800px
  
</style>