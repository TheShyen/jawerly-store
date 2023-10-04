<script setup>
import {useQuasar} from "quasar";
import {ref} from "vue";
import {useAuthStore} from "../stores/auth.js";

const $q = useQuasar()
const authStore = useAuthStore();

const email = ref(null)
const password = ref(null)

async function signIn() {
  await authStore.signIn({email: email.value, password: password.value})
}

function onSubmit() {

}

function onReset() {
  email.value = null
  password.value = null
  
}
</script>

<template>
  <div class="form">
    <div class="form__wrapper">
      <div class="form__text">Авторизация</div>
      <q-form
        class=" q-gutter-md"
        @reset="onReset"
        @submit="signIn"
      >
        <q-input
          v-model="email"
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите вашу почту']"
          filled
          hint="Почта"
          label="Ваша почта *"
          lazy-rules
        />
        
        <q-input
          v-model="password"
          filled
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите ваш пароль',
          val => val.length > 6 || 'Пароль должен быть длиннее 6 символов']"
          label="Ваш пароль *"
          lazy-rules
        />
        
        <div>
          <q-btn color="green" label="Войти" type="submit"/>
          <q-btn class="q-ml-sm" color="primary" flat label="Сбросить" type="reset"/>
        </div>
      </q-form>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.form
  background-color: #F9F9F9
  min-height: 100vh
  
  &__wrapper
    margin: 0 auto
    padding-top: 200px
    width: 650px
  
  &__text
    color: var(--accent, #333)
    text-align: center
    font-family: Raleway, serif
    font-size: 28px
    font-weight: 800
    margin-bottom: 60px
</style>