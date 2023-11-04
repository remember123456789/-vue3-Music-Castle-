import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
    let flags = ref(false)
    let name = ref('')
    let pic = ref('')
    let nameMusic = ref('')
    let id = ref()
    return { flags, name, pic, nameMusic, id }
})