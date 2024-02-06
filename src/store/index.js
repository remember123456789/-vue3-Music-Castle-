import { defineStore } from 'pinia'  
import { ref } from 'vue'  
  
export const useCounterStore = defineStore('counter', () => {  
    let flags = ref(false)  
    let name = ref('')  
    let pic = ref('')  
    let nameMusic = ref('')  
    let id = ref()  
    //loading  
    let Loading=ref(true)  
  
    const showLoading = () => {  
        Loading.value = true;  
    }  
  
    const hideLoading = () => {  
        Loading.value = false;  
    }  
  
    return {   
        flags,   
        name,   
        pic,   
        nameMusic,   
        id,   
        Loading,   
        showLoading,   
        hideLoading   
    }  
})