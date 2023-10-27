import {defineStore} from "pinia";
import axios from 'axios'
import {computed, ref} from "vue";
import router from "../router/router.js";

const apiKey = import.meta.env.VITE_API_KEY;
export const useAuthStore = defineStore('auth', ()=> {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: ''
  });
  const isAuth = computed(() => {
    return !!userInfo.value.userId;
  })
  const isLoading = ref(false)
  const errorMassage = ref('')
   async function signIn(payload) {
      // mockLogin(username, password)
      //   .then(response => {
      //   console.log('Успешная авторизация:', response);
      //   userInfo.value = response;
      //   console.log(userInfo.value);
      //   isLoading.value = true
      //   router.push('/catalog')
      // })
      //   .catch(error => {
      //     console.error('Ошибка авторизации:', error.message);
      //   });



    try {
      let response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          ...payload,
          returnSecureToken: true
      })
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }
      errorMassage.value = '';
      router.push('/catalog')
      console.log(response.data)
    }
    catch(err) {
      console.log(err.response.data.error.message)
      switch (err.response.data.error.message) {
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMassage.value = 'Неверная почта или пароль'
          break;
        default:
          errorMassage.value = 'Ошибка'
          break;
      }
      console.log(err.response)
    }
    finally {
      isLoading.value = false;
    }
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
    errorMassage,
    isAuth,
    signIn,

  }
})