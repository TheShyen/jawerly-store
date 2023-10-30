<script setup>
import {useQuasar} from "quasar";
import {ref} from "vue";
import {useAuthStore} from "../stores/auth.js";
import {validationEmail, validationPassword} from "../utils/validation.js";


const $q = useQuasar()
const authStore = useAuthStore();

const email = ref('test@mail.ru')
const password = ref(12345678)
const isPasswordVisible = ref(true)

async function signIn() {
  authStore.isLoading = true;
  await authStore.signIn({email: email.value, password: password.value})
  $q.notify({
    message: 'Вы авторизовались!',
    color: 'green',
    timeout: 3000,
    position: 'top'
  })
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
      <div class="spinner" v-if="authStore.isLoading">
        <q-spinner
          color="primary"
          size="5sem"
          :thickness="10"
        />
      </div>
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
    
.spinner
  width: 70px
  height: 100px
  margin: 120px auto
.errorMassage
  margin-top: 20px
  text-align: center
  height: 40px
  &__text
    font-size: 20px
</style>