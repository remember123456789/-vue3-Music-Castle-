<template>
    <el-card class="box-card">
        <div class='music-dj' v-for="item in HotDjInfo.DjList" :key="item.id">
            <div class="el-img">
                <img :src="item.picUrl" alt="">
            </div>
            <div class="info">
                <h1><i><img src="../../assets/音乐，歌单，音符.png" alt="" style="width: 18px;height: 18px;"></i> {{
                    item.name
                }}</h1>
                <span>{{ item.rcmdtext }}</span>
                <div class="info-count">
                    <span>共{{ item.programCount }}期</span>
                    <span>订阅多少{{ item.subCount }}次</span>
                </div>
            </div>
        </div>

    </el-card>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';

let { proxy } = getCurrentInstance()
let HotDjInfo = reactive({
    DjList: [],
    Dj_params: { limit: 6 }
})

const getDJinfo = async (params) => {
    let result = await proxy.$http.gethotDj(params)
    if (result.code !== 200) return proxy.$mes.error("请求数据出错")

    try {
        HotDjInfo['DjList'] = result.djRadios
    } catch (error) {

    }
}



onMounted(() => {
    getDJinfo(HotDjInfo['Dj_params'])
})


</script>
<style scoped lang="scss">
.box-card {
    width: 50%;
    // margin: 25px 10px;
    height: 500px;
    border-radius: 10px;
    // display: grid;
    // grid-template-columns: repeat(2,minmax(10rem,1fr));
    display: flex;
   ::v-deep .el-card__body{
        // display: flex;
        display: grid;
        grid-template-columns: repeat(2,50%);
        justify-items: center;
        align-items: center;
        grid-gap: 20px;
    }
    .music-dj {
        width: 240px;
        height: auto;
        display: flex;
        cursor: pointer;

        .el-img {
            width: 100px;
            height: 100px;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .info {
            text-align: center;
            width: 130px;
            height: 100%;
            cursor: pointer;

            span {
                font-size: 14px;
                color: #909090;

            }

            .info-count {
                font-size: 6px;
                margin: 0px 0;

                color: #909090;
            }
        }

    }
}
</style>