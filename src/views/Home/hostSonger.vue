<template>
    <el-card class="box-card">
        <div class="text item">
            <span>
                <h1 style="font-size: 28px;color: #2D2D2D;">热门歌手</h1>
            </span>
        </div>
        <div class="Songer-buttom">
            <router-link :to="{ name: 'singer', query: { id: item.id } }" :class="['songer']" v-for="item in hotSonger['hotList']">
                <img :src="item.picUrl" alt="">
            </router-link>

        </div>

        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>

    </el-card>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';

let { proxy } = getCurrentInstance()
let hotSonger = reactive({
    hotList: []
})

const getHostSonger = async () => {
    let result = await proxy.$http.hostSonger()
    if (result.code !== 200) proxy.$mes.error("请求数据出错")

    try {
        hotSonger['hotList']=result.artists.splice(0,12)
    } catch (error) {

    }
}

onMounted(()=>{
    getHostSonger()
})



</script>
<style scoped lang="scss">
.box-card {
    width: 580px;
    margin: 25px 15px;
    height: 526px;
    border-radius: 10px;

    .Songer-buttom {
        width: 520px;
        height: 410px;
        // background-color: aqua;
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;

        .songer {
            width: 100px;
            height: 100px;
            margin: 10px;
            border-radius: 5px;

            img {
                width: 100px;
                height: 100px;
            }
        }
    }

    ul {
        width: 200px;
        height: 5px;
        display: flex;
        text-align: center;
        margin-left: 200px;

        li {
            width: 40px;
            height: 2px;
            background-color: #C0C4CC;
            cursor: pointer;
            margin-left: 5px;
        }

        li:hover {
            background-color: black;
        }
    }
}
</style>