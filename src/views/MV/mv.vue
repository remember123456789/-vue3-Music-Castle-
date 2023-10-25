<template>
    <span v-if="mv_info['code'] !== 0" style="font-size: 50px; font-weight: 9000;">无数据 code=400</span>
    <div class="container-mv">
        <div class="mv-left">
            <router-link class="swperr-bottom" :to="{ name: 'mvsong', query: { id: item.id } }"
                v-for="item in mv_info['mv_List']">
                <div class="el-mv" style="position: relative;">
                    <img :src="item.cover" alt="">
                    <div class="el-top-img">
                        <!-- <img src="" alt="" style="width: 60px; height: 60px;"> -->
                    </div>

                </div>

                <div class="el-name" style="color: black;">{{ item.name }}</div>
                <div class="el-artname">{{ item.artistName }}</div>
            </router-link>

        </div>
        <!-- ---------------------------- -->
        <div class="mv-right">
            <el-affix :offset="110">
                <div class="mv-order">
                    <h1>排序</h1>
                    <div class="mv-main">
                        <span v-for="(order, index) in mv_info['info_order']"
                            :class="{ 'active': index == mv_info['order_index'] }" @click="selectOrder(order, index)">{{
                                order
                            }}</span>
                    </div>
                </div>
                <div class="mv-area">
                    <h1>区域</h1>
                    <div class="mv-main">
                        <span v-for="(area, index) in mv_info['info_area']"
                            :class="{ 'active': index == mv_info['area_index'] }" @click="selectArea(area.name, index)">{{
                                area.name }}</span>
                    </div>
                </div>
                <div class="mv-type">
                    <h1>类型</h1>
                    <div class="mv-main">
                        <span v-for="(types, index) in mv_info['info_type']"
                            :class="{ 'active': index == mv_info['type_index'] }" @click="selectType(types.name, index)">{{
                                types.name }}</span>
                    </div>
                </div>
            </el-affix>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, onMounted, watch, watchEffect } from 'vue';

const { proxy } = getCurrentInstance()
let mv_info = reactive({
    info_order: ['上升最快', '最新'],
    info_area: proxy.$common.EV_MV,
    info_type: proxy.$common.EV_MV_LIST,
    order_index: 0,
    area_index: 0,
    type_index: 0,
    params: {
        area: '',
        type: "",
        order: ''
    },
    mv_List: [],
    code: 0
})

// 获取mv列表
const getMVLIsts = async (params) => {
    let result = await proxy.$http.getMVinfo(params)
    if (result.code !== 200) {
        proxy.$mes.error("暂时没有数据");
        mv_info['code'] = result.code
    } else {
        mv_info['code'] = 0
    }


    mv_info['mv_List'] = result.data
}



// 排序切换按钮
const selectOrder = (order, index) => {
    mv_info['order_index'] = index
    mv_info['params']['order'] = order

}
const selectArea = (area, index) => {
    mv_info['area_index'] = index
    mv_info['params']['area'] = area

}
const selectType = (types, index) => {
    mv_info['type_index'] = index
    mv_info['params']['type'] = types

}

watchEffect(() => {
    if (mv_info['params']) {
        getMVLIsts(mv_info['params'])
    }
})


// onMounted(() => {
//     getMVLIsts(mv_info['params'])
// })
</script>
<style scoped lang="scss">
.container-mv {
    margin-top: 20px;
    width: 100vw;
    height: 100vh;
    display: flex;

    .mv-left {
        display: flex;
        flex-wrap: wrap;
        margin: 20px;
        width: 56%;
        height: auto;

        // background-color: aquamarine;

        // font-size: 0;
        .swperr-bottom {

            display: block;
            width: 118px;
            height: 112px;
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
                margin-bottom: 20px;
            }
        }

        .el-mv {
            width: 100%;
            height: 100%;
            // background-color: aqua;
            margin: 10px;

            img {
                width: 100%;
                height: 100%;
            }

            .el-top-img {
                display: block;
                position: absolute;
                top: 30px;
                left: 29px;
                border-radius: 5px;
            }



        }
    }

    .mv-right {
        border-radius: 10px;
        position: fixed;
        margin-top: 10vh;
        margin-left: 59vw;
        background-color: #FFFFFF;
        width: 20%;
        height: 320px;

        .mv-order {
            width: 100%;
            height: 90px;
            margin: 10px;

            .mv-main {
                margin: 15px 0;
                width: 100%;
                height: auto;

                span {
                    padding: 5px 0;
                    margin-right: 15px;
                    font-style: normal;
                    cursor: pointer;
                }
            }
        }

        .mv-area {
            width: 100%;
            height: 90px;
            margin: 10px;

            .mv-main {
                margin: 15px 0;
                width: 100%;
                height: auto;

                span {
                    padding: 5px 0;
                    margin-right: 15px;
                    font-style: normal;
                    cursor: pointer;
                }
            }
        }

        .mv-type {
            width: 100%;
            height: 90px;
            margin: 10px;

            .mv-main {
                margin: 15px 0;
                width: 100%;
                height: auto;

                span {

                    padding: 5px 0px;
                    margin-right: 15px;
                    font-style: normal;
                    cursor: pointer;
                }
            }
        }



    }

    // active
    .active {
        border-bottom: 4px solid orangered;
    }
}
</style>