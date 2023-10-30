<template>
    <div class="container">
        <div class="container-left">
            <router-link class="songer-box" :to="{ name: '' }" v-for="item in songerINFO['arList']">
                <div class="item"><em class="circle"></em><a href="/singer?id=3684" class="faceImg">
                        <div class="el-image"><img
                                :src="item.picUrl"
                                class="el-image__inner"><!--v-if--></div>
                    </a>
                    <div class="info" data-v-7a5b151f="">
                        <div class="info-header" data-v-7a5b151f=""><a href="/singer?id=3684" class="name"
                                data-v-7a5b151f="">{{ item.name }}</a><i class="iconfont icon-collect" data-v-7a5b151f=""></i></div>
                        <div class="info-num" data-v-7a5b151f=""><span class="albumSize" data-v-7a5b151f=""><em
                                    data-v-7a5b151f="">专辑</em>66</span><span class="musicSize" data-v-7a5b151f=""><em
                                    data-v-7a5b151f="">单曲</em>582</span><span class="fansSize" data-v-7a5b151f=""><em
                                    data-v-7a5b151f="">粉丝</em>{{ item.fansCount }}</span></div>
                    </div>
                </div>
            </router-link>
        </div>
    
    </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, onUnmounted, onMounted } from 'vue';
let { proxy } = getCurrentInstance()

let songerINFO = reactive({
    arList: []
})

const getSongerList = async () => {
    let result = await proxy.$http.getSonger()
    songerINFO['arList'] = result.artists
}

onMounted(() => {
    getSongerList()
})


</script>
<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    // background-color: antiquewhite;

    margin-top: 20px;

    .container-left {
        width:90%;
        height: 500px; //auto
        // background-color: azure;
        display: flex;
        flex-wrap: wrap;

        .songer-box {
            text-decoration: none;
            width: 106px;
            height: 100px;
            background-color: aliceblue;
            margin: 40px;
            .songer {
                padding: 20px;
                width: 246px;
                height: 150px;
                display: flex;
                // position: relative;

                .song-left {
                    width: 100px;
                    height: 102px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .song-right {
                    width: 100px;
                    height: 100px;
                    background-color: aqua;
                }
            }

        }
    }


}
</style>