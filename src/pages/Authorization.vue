<script setup lang="ts">
import {ref} from "vue";
import {useAuthStore} from "../stores/auth.ts";
import {validationEmail, validationPassword} from "../utils/validation.js";
import Spinner from "../components/UI/spinner.vue";

const authStore = useAuthStore();

const email = ref<string>('test@mail.ru')
const password = ref<string>("12345678")
const isPasswordVisible = ref<boolean>(true)

async function signIn() {
  authStore.isLoading = true;
  await authStore.signIn({email: email.value, password: password.value})
}


function onReset() {
  email.value = ""
  password.value = ""
  
}
</script>

<template>
  
  <div class="form">
    <div class="form__wrapper">
      
      <div class="form__text">Авторизация</div>
      <q-form
        v-if="!authStore.isLoading"
        class="q-gutter-md"
        @reset="onReset"
        @submit="signIn"
      >
        <q-input
          v-model="email"
          :rules="validationEmail()"
          filled
          hint="Почта"
          label="Ваша почта *"
          lazy-rules
        />
        
        <q-input v-model="password"
          :rules="validationPassword()"
          :type="isPasswordVisible ? 'password' : 'text'"
          filled
          label="Ваш пароль *"
          lazy-rules>
          <template v-slot:append>
            <q-icon
              :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPasswordVisible = !isPasswordVisible"
            />
          </template>
        </q-input>
        
        <div>
          <q-btn color="green" label="Войти" type="submit"/>
          <q-btn class="q-ml-sm" color="primary" flat label="Сбросить" type="reset"/>
        </div>
        <q-banner  v-if="authStore.errorMassage" dense inline-actions class="errorMassage text-white bg-red">
          <div class="errorMassage__text">{{authStore.errorMassage}}</div>
        </q-banner>
      </q-form>
      <Spinner v-if="authStore.isLoading"/>
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
    @media (max-width: 767px)
      width: 80vw
  
  &__text
    color: var(--accent, #333)
    text-align: center
    font-family: Raleway, serif
    font-size: 28px
    font-weight: 800
    margin-bottom: 60px

.errorMassage
  margin-top: 20px
  text-align: center
  height: 40px
  &__text
    font-size: 20px
</style>