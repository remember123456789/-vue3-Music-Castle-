<template>
    <div class="mv-container">
        <div class="mv-left">
            <div class="mv-vedio">
                <div class="mv-info">

                    <p style="font-size: 20px;color: #2D2D2D;">{{ mv_info['mv_data'].name }}</p>
                    <span style="font-size: 14px;color: #666666;">{{ mv_info['mv_data'].artistName
                    }}</span>
                </div>
                <div class="mv">
                    <vue3VideoPlay v-bind="mv_info['options']" />
                </div>
            </div>
            <!-- 评论区 -->
            <div class="mv-comment">
                <div class="comment-text">
                    <div class="text-info">
                        <h2 style="font-size: 24px;color: #2D2D2D;">评论</h2>
                        <span style="font-size: 14px;color: #999999;margin-left: 20px;line-height: 35px;">共{{
                            mv_info['total'] }}条评论</span>
                    </div>
                    <textarea name="" id="" cols="30" rows="10" placeholder="期待你的神评论……"></textarea>
                    <el-button type="warning">评论</el-button>
                </div>

                <!-- v-for遍历 -->
                <div class="comment-user" v-for="com in mv_info['comments']">
                    <el-card class="box-commet">
                        <div class="box-image">
                            <img :src="com.user.avatarUrl" alt="">
                        </div>
                        <div class="box-info">
                            <h2>{{ com.user.nickname }}</h2>
                            <span>{{ com.content }}</span>
                            <p style="color: #999999;font-size: 14px;margin-top: 10px;">{{ com.time }}</p>
                        </div>
                    </el-card>
                </div>

            </div>
        </div>
        <div class="mv-right">
            <el-card class="box-jieshao">
                <h2 style="font-size: 16px;color: #2D2D2D;margin-bottom: 10px;"> MV简介</h2>
                <span style="font-size: 12px;color: #909090;">发布时间: {{ mv_info['mv_data'].publishTime }}</span>
                <div class="count" style="font-size: 12px;color: #909090;">播放量：13.1万</div>
                <span style="font-size: 14px;color: #2D2D2D;margin-top: 10px;display: block;">{{ mv_info['mv_data'].desc
                }}</span>
            </el-card>
            <el-card style="height: 70px;width: 400px;border-radius: 10px;font-size: 16px;color: #2D2D2D;">
                <h1>相似MV</h1>
            </el-card>

            <!-- v-for相似MV -->
            <router-link :to="{ name: 'mvsong', query: { id: item.id } }" v-for="item in mv_info['mvs']"
                class="text-decoration: none;">
                <el-card class="box-smailmv">
                    <div class="mv-image">
                        <img :src="item.cover" alt="">
                    </div>
                    <span style="margin-top: 20px;display: block;font-size: 14px;color: #2D2D2D;">{{ item.name }}</span>
                    <p style="font-size: 14px;color:#999999">{{ item.artistName }}</p>
                </el-card>
            </router-link>
        </div>



    </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, onMounted, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const { proxy } = getCurrentInstance()
let route = useRoute()
let mv_info = reactive({
    mv_data: {},
    mvs: [],
    comments: [],
    total: 0,
    options: {
        width: '100%', //播放器高度
        height: '100%', //播放器高度
        color: "#409eff", //主题色
        // currentTime: 0,
        speed: true, //关闭进度条拖动
        title: '', //视频名称
        src: "", //视频源
        poster: 'http://p1.music.126.net/jdg571bfqGpPszOpzl8Puw==/109951164913023487.jpg',
        autoPlay: false
    }
})
// 获取mv数据
const getMvinfo = async () => {
    let result = await proxy.$http.getDataMv(route.query.id)
    mv_info['mv_data'] = result.data
    mv_info['options']['poster'] = result.data.cover
    mv_info['options']['title'] = result.data.name
}
// 获取相似mv
const getSimalMV = async () => {
    let result = await proxy.$http.smaileMV(route.query.id)
    mv_info['mvs'] = result.mvs

}
// 获取评论
const getMvCommemts = async () => {
    let result = await proxy.$http.getComment(route.query.id)
    mv_info['comments'] = result.comments
    mv_info['total'] = result.total
}
// 获取mv地址
const getMVURl = async () => {
    let result = await proxy.$http.getMVVideo(route.query.id)
    mv_info['options']['src'] = result.data.url

}
onMounted(() => {
    getMvinfo()
    getSimalMV()
    getMvCommemts()
    getMVURl()
})

// watch(route.query, () => {
//     getMvinfo()
// }, {
//     deep: true,
//     immediate: true
// })

watchEffect(() => {
    if (route.query.id) {
        getMvinfo()
        getSimalMV()
        getMvCommemts()
        getMVURl()
    }
})



</script>
<style scoped lang="scss">
.mv-container {
    width: 79vw;
    height: auto;

    margin: 20px;
    margin-top: 20px;
    display: flex;

    .mv-left {
        width: 67%;
        height: auto;

        .mv-vedio {
            width: 100%;
            height: 85vh;

            //  background-color: aquamarine;
            .mv-info {
                width: 200px;
                justify-items: center;
                justify-content: center;
                display: flex;
                margin: 10px 0;
                // vertical-align: middle;
            }

            .mv {
                width: 858px;
                height: 550px;
                display: block;
                background-color: black;
            }
        }

        .mv-comment {
            width: 100%;
            height: auto;
            margin-top: 40px;

            .comment-text {
                width: 100%;
                height: 300px;
                margin-bottom: 100px;

                .text-info {
                    display: flex;
                }

                textarea {
                    width: calc(100% - 30px);
                    padding: 10px 15px;
                    line-height: 24px;
                    min-height: 90px;
                    font-size: 14px;
                    color: #333;
                    border-radius: 4px;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    margin: 20px 0;
                }
            }

            .comment-user {
                width: 100%;
                height: auto;
                margin-top: 30px;
                display: flex;

                .box-commet {
                    width: 100%;
                    height: auto;
                    border-radius: 10px;
                    position: relative;

                    .box-image {
                        width: 40px;
                        height: 40px;
                        position: absolute;
                        border-radius: 50%;

                        img {
                            border-radius: 50%;
                            width: 40px;
                            height: 40px;
                        }
                    }

                    .box-info {
                        width: 70%;
                        height: 100%;
                        margin-left: 55px;
                    }

                    .box-info h2 {
                        // display: inline-block;
                        padding-bottom: 10px;
                        line-height: 14px;
                        color: #999;
                    }

                    .box-info span {
                        color: #2D2D2D;
                        font-size: 14px;
                        margin: 10px 0;
                    }
                }
            }
        }
    }

    .mv-right {
        width: 30%;
        height: auto;
        margin-left: 20px;

        .box-jieshao {
            height: 150px;
            width: 400px;
            border-radius: 10px;
            margin: 20px 0;
        }

        .box-smailmv {
            width: 400px;
            height: 300px;
            margin-top: 20px;
            border-radius: 10px;

            .mv-image {
                width: 360px;
                height: 200px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }


    }
}
</style>