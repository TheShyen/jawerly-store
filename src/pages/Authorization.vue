<script setup>
import {useQuasar} from "quasar";
import {ref} from "vue";

const $q = useQuasar()

const login = ref(null)
const password = ref(null)



function onSubmit() {

}

function onReset() {
  login.value = null
  password.value = null
  
}
</script>

<template>
  <div class="form">
    <div class="form__wrapper">
      <q-form
        class=" q-gutter-md"
        @reset="onReset"
        @submit="onSubmit"
      >
        <q-input
          v-model="login"
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите ваш логин']"
          filled
          hint="Логин"
          label="Ваш логин *"
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
</style>