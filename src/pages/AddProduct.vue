<script setup>
import {useQuasar} from "quasar";
import { ref} from "vue";
import axios from 'axios';



const $q = useQuasar()

const title = ref(null);
const description = ref('')
const category = ref(null);
const price = ref('')
const model = ref(null);
const selectedFile = ref(null)
const options = [
  'Браслеты', 'Серёжки', 'Цепочки'
]


function onSubmit() {
  console.log(selectedFile.value)
  console.log([...selectedFile.value])
  
  axios
    .post('https://saros-api-v3-production.up.railway.app/api/v3/products', {
      title: title.value,
      category: model.value,
      description: description.value,
      price: price.value
    }, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
    .then(response => {
      console.log(response);
      let imageUrl = response.data.imageUrl;
    })
    .catch(error => {
      console.error( error);
    });
  
  
}
function handleFileUpload(event) {
  selectedFile.value = event.target.files;
}


function onReset() {
  title.value = null
  category.value = null
}
</script>

<template>
  <div>
    <q-form
      class="q-gutter-md q-ma-xl row wrap justify-center"
      @reset="onReset"
      @submit="onSubmit"
    >
      <q-input
        v-model="title"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        class="col-md-6 text-h6"
        filled
        label="Title"
        lazy-rules
      />
      <q-input
        v-model="description"
        filled
        class="col-md-6 text-h6"
        type="textarea"
        label="Описание"
      />
      <q-input
        v-model="price"
        filled
        class="col-md-6 text-h6"
        label="Цена"
      />
      
      <q-select v-model="model" :options="options" class="col-md-6 text-h6" filled label="Category"/>
   
      <div class="col-md-6">
        <input type="file" multiple @change="handleFileUpload" accept="image/*" />
      </div>
      <div class="col-md-6 ">
        <q-btn color="primary" label="Submit" size="17px" type="submit"/>
        <q-btn class="q-ml-sm" color="primary" flat label="Reset" size="17px" type="reset"/>
      </div>
    </q-form>
  </div>
</template>

<style lang="sass" scoped>

</style>