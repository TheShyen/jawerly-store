<script setup>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import PostsList from "../components/PostsList.vue";
import PostsListItem from "../components/PostsListItem.vue";
import router from "../router/router.js";
import {useAuthStore} from "../stores/auth.js";

const store = useAuthStore()




</script>

<template>
  <div class="posts">
    <DefaultLayout>
      <div class="posts__btn">
        <q-btn v-if="store.isAuth" @click="router.push('/add')" color="green" >
          <q-icon name="add"/>
          Добавить пост
        </q-btn>
      </div>
      <PostsList>
        <PostsListItem/>
      </PostsList>
    </DefaultLayout>
  </div>
</template>

<style lang="sass" scoped>
.posts
  background-color: #F9F9F9
  min-height: 100vh
  &__btn
    display: flex
    justify-content: center
    margin-bottom: 15px
</style>