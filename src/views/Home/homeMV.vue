<template>
    
    <el-card class="box-card" v-load="store.Loading">
        
        <div class="text imtem">
            <span>
                <h1 style="font-size: 28px;color: #2D2D2D;">最新MV</h1>
            </span>
            <div class="nav">
                <li v-for="(item, index) in homeMvinfo.MV_tabs" @click="changeMvtabs(index)"
                    :class="{ 'title-active': index == homeMvinfo['Mv_index'] }">{{ item.name }}</li>
            </div>
        </div>
        <div class="swperr"  >
            <router-link class="swperr-bottom" :to="{ name: 'mvsong', query: { id: itemmv.id } }"
                v-for="itemmv in homeMvinfo.MvList" @mouseover="movebig">
                <div class="el-mv" style="position: relative;">
                    <img :src="itemmv.cover" alt="">


                    <div class="el-top-img">
                        <img src="../../assets/24gf-playSquare.png" alt="" style="width: 60px; height: 60px;">
                    </div>
                </div>

                <div class="el-name" style="color: black;">{{ itemmv.name }}</div>
                <div class="el-artname">{{ itemmv.artistName }}</div>
            </router-link>
            
        </div>
        <!-- <Loading></Loading> -->
    </el-card>
    <!-- <Loading></Loading> -->
    
</template>

<script setup lang="ts">

import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
// import Loading from '../../components/Loading.vue'
import { ElLoading } from 'element-plus'
import {useCounterStore} from '../../store/index'
let store=useCounterStore()

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
    let result: any = await proxy.$http.getmusicMV(area)
    store.showLoading()
    if (result.code !== 200) return proxy.$mes.error("请求数据出错")

    try {
        store.hideLoading()
        homeMvinfo['MvList'] = result.data.splice(0, 10)
    } catch (error) {
        proxy.$mes.error(new Error(error))
    }
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

//移动鼠标图像变大
const movebig = () => {

}


onMounted(() => {
    getMuseicMVList(homeMvinfo['Mv_params'])
    getMuseicMvTabbar()
})




</script>
<style scoped lang="scss">
.box-card {
    width: 1181px;
    margin: 25px 0;
    height: 526px;
    border-radius: 10px;

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
        width: 1109px;
        height: 316px;

        display: flex;
        flex-wrap: wrap;
        // flex-direction: row;
        // justify-content: space-around;
        margin: 0 -10px;

        // font-size: 0;
        .swperr-bottom {
            width: 200px;
            height: 152px;
            margin: 26px 0;
            margin-left: 20px;
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
            // background-color: aqua;
            margin: 10px;

            img {
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