import {defineStore} from "pinia";
import axios from 'axios'
import {computed, ref} from "vue";
import router from "../router/router.js";
export const useAuthStore = defineStore('auth', ()=> {
  const userInfo = ref(null);
  const isAuth = computed(() => {
    return userInfo.value?.role === 'Admin';
  })
  const isLoading = ref(true)

   function signIn(username, password) {
      mockLogin(username, password)
        .then(response => {
        console.log('Успешная авторизация:', response);
        userInfo.value = response;
        console.log(userInfo.value);
        isLoading.value = true
        router.push('/catalog')
      })
        .catch(error => {
          console.error('Ошибка авторизации:', error.message);
        });



    // try {
    //   let response = await axios.post('http://147.78.66.209:8080/api/v3/auth/login', {
    //     ...payload
    //   })
    //   console.log(response.data)
    // }
    // catch(err) {
    //   console.log(err.response)
    // }
  }

  function mockLogin(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'test@mail.ru' && password === '12345678') {
          resolve({
            id: 1,
            username: 'Ruslan',
            token: 'exampleToken',
            role: "Admin"
          });
        } else {
          reject(new Error('Неверное имя пользователя или пароль'));
        }
      }, 1000);
    });
  }
  return {
    userInfo,
    isLoading,
    isAuth,
    signIn,

  }
})