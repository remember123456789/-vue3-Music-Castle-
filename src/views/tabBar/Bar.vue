<template>
    <div class="bottom-bar">
        <div class="bar-img">
            <img src="" alt="">
        </div>
        <div class="bar-info">
            <span>123</span>
            <p style="margin-top: 20px;">12321</p>
        </div>
        <div class="play">
            <i class="iconfont icon-bofangbeifen13" @click="getUrl"></i>
        </div>
        <div class="audio">
            <button @click="changeplay">点击</button>
            <audio
                src="http://m801.music.126.net/20231031211341/e548ed0d71c220d36e4260202a9a7527/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/17718433824/acca/41eb/8112/efa4dce840121844afcb957bcb2d4fd1.mp3"
                autoplay controls ref="audio">11</audio>
        </div>

    </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, } from 'vue';
import { useRoute } from 'vue-router';

const { proxy } = getCurrentInstance()
const route = useRoute()
const audio = ref(null)

let audio_info = reactive({

})

const getMUsic = async () => {
    let result = await proxy.$http.getMusciUrl(route.query.id)
    // console.log(result);
}

const changeplay = () => {  
    audio.play()
}

const getUrl = () => {
    getMUsic()
}









</script>
<style scoped lang="scss">
// @font-face {
//     font-family: "iconfont";
//     /* Project id  */
//     src: url('iconfont.ttf?t=1698747946343') format('truetype');
// }

// .iconfont {
//     font-family: "iconfont" !important;
//     font-size: 16px;
//     font-style: normal;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
// }

.bottom-bar {
    display: flex;
    width: 100vw;
    height: 70px;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;

    .bar-img {
        margin: 10px 20px 10px 50px;
        width: 50px;
        height: 50px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .bar-info {
        margin: 10px 0;
    }

    .play {
        width: 50px;
        height: 50px;
        margin-left: 250px;
        line-height: 70px;

        i {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}
</style>