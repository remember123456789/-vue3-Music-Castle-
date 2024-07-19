<template>
    <div class="bottom-bar">
        <div class="bar-img" @click="currentImg">
            <img :src="audio_info['urlPic']" alt="">
        </div>
        <div class="bar-info">
            <span>{{ audio_info['musicName'] }}</span>
            <p style="margin-top: 20px;">{{ audio_info['name'] }}</p>
        </div>
        <div class="play">
        </div>
        <div class="audio">
            <el-button type="success" @click="changeplay"> <el-icon>
                    <Service />
                </el-icon>立即播放/暂停</el-button>
            <audio :src="audio_info['url']" ref="audio" class="audio-sty">11</audio>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, watchEffect, onMounted, } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { proxy } = getCurrentInstance()

import { useCounterStore } from '../../store/index'
// 引入pinia
const store = useCounterStore()
const route = useRoute()
const router = useRouter()
let audio = ref()
let audio_info = reactive({
    url: '',
    urlPic: '',
    name: '',
    musicName: '',
    id: null
})

const getMUsic = async () => {
    proxy.$mes.error('正在加载中');
    let result = await proxy.$http.getMusciUrl(route.query.id || audio_info['id'])
    audio_info['url'] = result.data[0].url
}



// 点击播放     
const changeplay = () => {
    let audio = document.querySelector('.audio-sty')
    store.flags = !store.flags
    if (store.flags == false) {
        audio.pause();
    } else {

        // 找到当前这一句歌词的索引
        function FindIndex() {
            let currentTime = audio.currentTime
            for (var i = 0; i < store.lyicWords.length; i++) {
                if (currentTime < store.lyicWords[i].time) {
                    return i - 1
                }
            }
            return store.lyicWords.length - 1
        }
        // 计算偏移量 
        /**
         * 偏移量
         * @containerHeight //容器高度
         * @PHeight   //单个歌词高度
         */
        function Setoffset() {
            var index = FindIndex()
            var offset = index * store.PHeight + store.PHeight / 2 - store.containerHeight / 2
            if (offset < 0) {
                offset = 0
            }
            store.index = index
            store.Offset = offset
        }

        // audio 时间变化事件
        audio.addEventListener('timeupdate', Setoffset)
        getMUsic().then(() => {
            audio.play()
            audio_info['urlPic'] = store.pic
            audio_info['name'] = store.name
            audio_info['musicName'] = store.nameMusic
            audio_info['id'] = store.id
        }).finally(() => {
            proxy.$mes.success('加载成功')
        })
    }

}





// 跳转当前歌曲详情
const currentImg = () => {
    if (!store.id) {
        proxy.$mes.warning('请选择歌曲')
    } else {
        router.push({ name: 'song', query: { id: store.id } })
    }

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
        cursor: pointer;

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

    .audio {
        line-height: 70px;
        // text-align: center;
        margin-left: 200px;
    }

    .audio-sty {
        margin-top: 10px;
        margin-left: 200px;
    }
}
</style>