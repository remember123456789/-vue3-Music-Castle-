<template>
    <el-card class="box-card">
        <div class="text item">
            <span>
                <h1 style="font-size: 28px;color: #2D2D2D;">热门电台</h1>
            </span>
        </div>

        <div class="dj">
            <router-link :to="{ name: 'song', query: { id: item.id } }" :class="['music-dj']"
                v-for="item in HotDjInfo.DjList">
                <div class="el-img">
                    <img :src="item.picUrl" alt="">
                </div>
                <div class="info">
                    <h1><i><img src="../../assets/音乐，歌单，音符.png" alt="" style="width: 18px;height: 18px;"></i> {{ item.name
                    }}</h1>
                    <span>{{ item.rcmdtext }}</span>
                    <div class="info-count">
                        <span>共{{ item.programCount }}期</span>
                        <span>订阅多少{{ item.subCount }}次</span>
                    </div>
                </div>
            </router-link>

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
    width: 580px;
    margin: 25px 10px;
    height: 526px;
    border-radius: 10px;

    .dj {
        width: 100%;
        height: 450px;
        // background-color: aqua;
        margin: 10px;
        display: flex;
        flex-wrap: wrap;
        cursor: pointer;

        .music-dj {
            text-decoration: none;
            color: black;

            display: block;
            width: 240px;
            height: 100px;
            // background-color: black;
            display: flex;
            cursor: pointer;
            margin-left: 10px;

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
}
</style>