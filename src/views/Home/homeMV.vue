<template>

    <el-card class="box-card">
        <div class="text imtem">
            <span>
                <h1 style="font-size: 28px;color: #2D2D2D;">最新MV</h1>
            </span>
            <div class="nav">
                <li v-for="(item, index) in homeMvinfo.MV_tabs" @click="changeMvtabs(index)"
                    :class="{ 'title-active': index == homeMvinfo['Mv_index'] }">{{ item.name }}</li>
            </div>
        </div>
        <div class="swperr">
            <router-link class="swperr-bottom" :to="{ name: 'mvsong', query: { id: itemmv.id } }"
                v-for="itemmv in homeMvinfo.MvList" :key="itemmv.id">
                <div v-if="Loading">
                    <!-- 播放图片 -->

                    <div class="el-mv">
                        <el-image class="img" fit="cover" :src="itemmv.cover"></el-image>
                    </div>

                    <div class="el-name" style="color: black;">{{ itemmv.name }}</div>
                    <div class="el-artname">{{ itemmv.artistName }}</div>
                </div>

                <!-- 骨架屏 -->

                <el-skeleton v-else style="width: 240px" animated>
                    <template #template>
                        <el-skeleton-item variant="image" style="width: 150px; height: 150px" />
                        <el-skeleton-item variant="text" style="margin-right: 6px" />
                        <el-skeleton-item variant="text" style="width: 20%" />
                    </template>
                </el-skeleton>
            </router-link>
        </div>
    </el-card>
</template>

<script setup lang="ts">

import { ref, reactive, getCurrentInstance, onMounted, onActivated } from 'vue';
import { useCounterStore } from '../../store/index'
let store = useCounterStore()
let Loading = ref(false)
const { proxy }: any = getCurrentInstance()

interface HOMEINfo {
    MV_tabs: Array<{ name: string }>
    MvList: Array<any>,
    Mv_index: number,
    Mv_params: any,
}


let homeMvinfo: HOMEINfo = reactive({
    MV_tabs: [],
    MvList: [],
    Mv_index: 0,
    Mv_params: {},
})


//获取mv列表
const getMuseicMVList = async (area: string) => {
    Loading.value = false
    proxy.$http.getmusicMV(area).then((result) => {
        if (result.code !== 200) return proxy.$mes.error("请求数据出错")
        homeMvinfo['MvList'] = result.data.splice(0, 10)
    }).finally(() => {
        Loading.value = true
    })
}


//获取mv分类导航
const getMuseicMvTabbar = () => {
    let res = proxy.$common.EV_MV
    homeMvinfo['MV_tabs'] = res
}

//切换导航栏
const changeMvtabs = (index: number) => {
    homeMvinfo['Mv_index'] = index
    homeMvinfo['Mv_params']['area'] = homeMvinfo['MV_tabs'][index]['name']
    getMuseicMVList(homeMvinfo['Mv_params'])
}

onMounted(() => {
    getMuseicMVList(homeMvinfo['Mv_params'])
    getMuseicMvTabbar()
})



</script>
<style scoped lang="scss">
.box-card {
    margin: 25px 0;
    height: 30rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

    .text {
        position: relative;
        display: flex;
        flex-wrap: wrap;

        .nav {
            display: flex;
            margin-left: 50px;
            cursor: pointer;

            li {
                display: inline-block;
                font-size: 16px;
                color: #2D2D2D;
                margin: 15px;
            }
        }

    }

    //   点击切换导航栏样式
    .title-active {
        font-weight: 800;
        border-bottom: 5px solid orangered;
        z-index: 1;
    }

    .swperr {
        width: 100%;
        //   grid布局
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        ;
        grid-gap: 1rem 20px;

        .swperr-bottom {
            width: 15rem;
            height: 11rem;
            text-decoration: none;
            color: black;
            font-weight: 700;


            .el-name {
                margin-left: 10px;
                display: block;
                font-size: 14px;
                text-overflow: ellipsis;
                height: 20px;
                overflow: hidden;
                white-space: nowrap;
            }

            .el-artname {
                margin-left: 10px;
                display: block;
                line-height: 24px;
                font-size: 14px;
                color: #999;
            }
        }

        .el-mv {
            width: 200px;
            height: 123px;
            margin: 10px;

            .img {
                width: 100%;
                height: 100%;
            }

            .el-top-img {
                display: block;
                position: absolute;
                top: 35px;
                left: 70px;
                border-radius: 5px;
            }

            .el-top-img:hover {
                display: block;
                position: absolute;
                top: 35px;
                left: 70px;
            }
        }
    }
}
</style>