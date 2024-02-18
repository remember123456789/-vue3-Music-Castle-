import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useCounterStore = defineStore('counter', () => {
    let flags = ref(false)
    let name = ref('')
    let pic = ref('')
    let nameMusic = ref('')
    let id = ref()
    //loading  
    let Loading = ref(true)

    const showLoading = () => {
        Loading.value = true;
    }

    const hideLoading = () => {
        Loading.value = false;
    }

    let userinfo = reactive({})

    // 歌词信息 
    let lyicWords = ref()
    //  容器高度 
    let containerHeight = ref()
    let PHeight = ref()
    // 偏移量
    let index = ref()
    let Offset = ref()
    return {
        flags,
        name,
        pic,
        nameMusic,
        id,
        Loading,
        userinfo,
        lyicWords,
        containerHeight,
        PHeight,
        index,
        Offset,
        showLoading,
        hideLoading
    }
})