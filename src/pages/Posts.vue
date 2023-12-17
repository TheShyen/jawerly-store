<script setup>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import PostsList from "../components/PostsList.vue";
import PostsListItem from "../components/PostsListItem.vue";
import router from "../router/router.ts";
import {useAuthStore} from "../stores/auth.ts";
import {onMounted} from "vue";
import {useAppStore} from "../stores/AppStore.ts";

const store = useAuthStore()
const appStore = useAppStore()

onMounted(() => {
  appStore.getPosts()
})


</script>

<template>
  <div class="posts">
    <DefaultLayout>
      <div class="posts__btn">
        <q-btn v-if="store.isAuth" @click="router.push('/addPost')" color="green" >
          <q-icon name="add"/>
          Добавить пост
        </q-btn>
      </div>
      <PostsList>
        <PostsListItem v-for="post in appStore.posts" :post="post" :key="post.id"/>
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