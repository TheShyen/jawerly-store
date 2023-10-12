import {defineStore} from "pinia";
import axios from 'axios'
import {ref} from "vue";
export const useAuthStore = defineStore('auth', ()=> {
  const userInfo = ref({});
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  async function signIn(payload) {
    try {
      let response = await axios.post('http://147.78.66.209:8080/api/v3/auth/login', {
        ...payload
      },{
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "text/html",
        },
        withCredentials: true,

      });
      console.log(response.data)
    }
    catch(err) {
      console.log(err.response)
    }
  }
  return {
    signIn
  }
})