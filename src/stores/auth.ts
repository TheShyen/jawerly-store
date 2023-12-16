import {defineStore} from "pinia";
import axios from 'axios'
import {computed, ref} from "vue";
import router from "../router/router.ts";
import {useQuasar} from "quasar";


const apiKey = import.meta.env.VITE_API_KEY;
export const useAuthStore = defineStore('auth', ()=> {
    const $q = useQuasar()
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

    async function signIn(payload: { email: string, password: string }) {
    try {
      let response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          ...payload,
          returnSecureToken: true
      })
        $q.notify({
            message: 'Вы авторизовались!',
            color: 'green',
            timeout: 3000,
            position: 'top',
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

    } catch (err: unknown) {
      const error = err as Error;
      if (error.message == 'Network Error') {
        console.error('Произошла ошибка:', error.message);
        errorMassage.value = 'Нет интернета'
      } else {
        console.error('Произошла ошибка:', error.message);
        errorMassage.value = 'Неверная почта или пароль'
      }

    }
    finally {
      isLoading.value = false;
    }
  }
  function logOut() {
    localStorage.removeItem("user");
      userInfo.value = {token: '', email: '', userId: '', expiresIn: '', refreshToken: ''};

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