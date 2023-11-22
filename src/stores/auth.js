import {defineStore} from "pinia";
import axios from 'axios'
import {computed, ref} from "vue";
import router from "../router/router.ts";



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
      localStorage.setItem('user', JSON.stringify(userInfo.value))
      errorMassage.value = '';
      router.push('/catalog')
      console.log(response.data)
    }
    catch(err) {
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
  function logOut() {
    localStorage.removeItem("user");
    userInfo.value = {};

  }
  return {
    userInfo,
    isLoading,
    errorMassage,
    isAuth,
    signIn,
    logOut,

  }
})