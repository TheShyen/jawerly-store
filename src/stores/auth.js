import {defineStore} from "pinia";
import axios from 'axios'
export const useAuthStore = defineStore('auth', ()=> {
  async function signIn(payload) {
    try {
      let response = await axios.post('https://saros-api-v3-production.up.railway.app/api/v3/auth/login', {
        ...payload
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