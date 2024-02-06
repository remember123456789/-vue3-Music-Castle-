<template>
    <div class="container">
        <div class="left">
            <el-card class="box-left" style="position: relative;">
                <h1 style="font-size: 30px; color: #2D2D2D;">{{ songList['songs'].name }}</h1>
                <span style="font-size: 18px;color: #909090;line-height: 18px;margin: 20px 0;display: block;">{{
                    songList['songs_ar'] }}</span>
                <span style="color: #909090;">专辑 <em style="color: #2D2D2D;">{{ songList['songs_albue'] }}</em></span>
            </el-card>
            <!-- 相似歌曲 -->
            <el-card class="box-simail">
                <h1 style="width: 100px;height: 5px;border-left: 5px solid orangered;padding: 10px;line-height:5px;">相似歌曲
                </h1>
                <div class="smaill-Music">
                    <span class="item-music" v-for="item in songList['smail_songs']">
                        <p style="color: orangered;font-size: 14px;cursor: pointer;" @click="changeSmail(item)">{{ item.name
                        }}</p>
                        <span>{{ item.album.artists[0].name }}</span>
                    </span>
                </div>
            </el-card>
        </div>
        <div class="center">
            <el-card class="box-center">
                <h1 style="text-align: center;">歌词</h1>
                <div class="center-ci" style="overflow: auto;">

                    <p v-for="item in songList['txt']" v-if="songList['txt'].length != 0">{{ item }}</p>
                    <p v-else>纯音乐，无歌词</p>
                </div>
            </el-card>
        </div>
        <div class="right">
            <el-card class="box-right">
                <div class="box-cover">
                    <div class="box-image">
                        <img :src="songList['pic_Url']" alt="">
                    </div>
                </div>
            </el-card>
            <el-card class="box-gedan">
                <h1 style="width: 150px; height: 5px;padding: 10px; border-left: 5px solid orangered; line-height: 5px;">
                    包含这首歌的歌单</h1>

                <!-- 评论区 -->

            </el-card>
        </div>


    </div>

    <div class="mv-comment">
        <div class="comment-text">
            <div class="text-info">
                <h2 style="font-size: 24px;color: #2D2D2D;">评论</h2>
                <span style="font-size: 14px;color: #999999;margin-left: 20px;line-height: 35px;">共条评论</span>
            </div>
            <textarea name="" id="" cols="30" rows="10" placeholder="期待你的神评论……"></textarea>
            <el-button type="warning">评论</el-button>
        </div>

        <!-- v-for遍历 -->
        <div class="comment-user">
            <el-card class="box-commet" v-for="(item, index) in songList['hotcomments']" :key="index">
                <div class="box-image">
                    <!-- <img :src="com.user.avatarUrl" alt=""> -->
                    <img :src="item.user.avatarUrl" alt="">
                </div>
                <div class="box-info">
                    <h2>{{ item.user.nickname }}</h2>
                    <span>{{ item.content }}</span>
                    <p style="color: #999999;font-size: 14px;margin-top: 10px;">{{ getTime(item.time)  }}</p>
                </div>
            </el-card>
        </div>

    </div>
</template>


<script setup >
import { ref, reactive, getCurrentInstance, onMounted, watchEffect } from 'vue';
const { proxy } = getCurrentInstance()
import LyricParser from "lyric-parser";
// console.log(proxy.$utlis);
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

// 引入pinia
import { useCounterStore } from '../../store/index'


let store = useCounterStore()

let songList = reactive({
    songs: [],
    songs_ar: '',
    songs_albue: '',
    smail_songs: [],
    pic_Url: '',
    lyric: '',
    lyr: false,
    hotcomments: [],
    txt: []
})

function getTime(n) {
    return new Date(n).toLocaleString().replace(/\//g, '-')
}

const getUserInfo = async () => {
    // 将当前页面id存入pinia中
    store.id = route.query.id
    // 获取歌曲详情
    let result = await proxy.$http.getSongerInfo(route.query.id)
    if (result.code !== 200) return proxy.$mes.error('获取数据失败')
    songList['songs'] = result.songs[0]
    songList['songs_ar'] = result.songs[0].ar[0].name
    songList['songs_albue'] = result.songs[0].al.name
    songList['pic_Url'] = result.songs[0].al.picUrl

    store.pic = result.songs[0].al.picUrl;
    store.name = result.songs[0].ar[0].name
    store.nameMusic = result.songs[0].name

    //获取相似专辑
    let res = await proxy.$http.smialMusic(route.query.id)
    songList['smail_songs'] = res.songs
    // 获取歌词
    let success = await proxy.$http.geciSmail(route.query.id)
    setlyc(success.lrc.lyric)

    // 获取评论
    let content = await proxy.$http.getCommentMusic(route.query.id)
    songList['hotcomments'] = content.comments
    // songList['hotcomments'] = content.comments.foreach((item) => {
    //     console.log(item);
    // })
    // content.comments.forEach(item => {
    //     songList['hotcomments'].push(item)
    // })
    // console.log(songList['hotcomments']);
}

// 处理歌词
const setlyc = (lyric) => {
    if (songList['txt'].length != 0) {
        songList['txt'] = []
    }
    let value = new LyricParser(lyric, handle)

    function handle({ lineNum, txt }) {
        console.log(lineNum);
    }

    value.lines.forEach((item) => {
        songList['txt'].push(item.txt)
    })

}

// 相似歌曲跳转
const changeSmail = (item) => {
    router.push({ name: 'song', query: { id: item.id } })
}

// 立即播放
const playMusci = () => {
    store.flags = !store.flags
}

watchEffect(() => {
    if (route.query.id) {
        getUserInfo()
    }
})

onMounted(() => {
    getUserInfo()
})


</script>
<style scoped lang="scss">
.container {
    overflow: hidden;
    margin-top: 20px;
    width: 100%;
    height: 120vh;
    // background-color: antiquewhite;
    display: flex;

    .left {
        width: 30%;
        height: 50%;

        .box-left {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 100%;
        }

        .box-simail {
            margin-top: 20px;
            width: 100%;
            height: 95%;
            overflow: hidden;

            .smaill-Music {
                margin-top: 20px;
                width: 100%;
                height: 320px;

                // background-color: black;
                .item-music {
                    display: block;
                    width: 100%;
                    height: 50px;
                    margin: 20px 0;
                    padding: 5px 0;
                    border-bottom: 1px solid #c5c4c4;
                    // background-color: aqua;
                }
            }
        }
    }

    .center {
        width: 30%;
        margin: 0 50px;
        height: 116vh;

        .box-center {
            width: 100%;
            height: 102%;
            border-radius: 10px;

            .center-ci {
                margin-top: 20px;
                height: 800px;
                width: 100%;

                // background-color: black;
                p {
                    text-align: center;
                }
            }
        }
    }

    .right {
        width: 30%;
        height: 50%;

        .box-right {
            border-radius: 10px;
            width: 100%;
            height: 100%;

            .box-cover {
                position: relative;
                margin: 40px 40px;
                width: 320px;
                height: 300px;
                // background-color: black;
                background: url(../../assets/js/disc.986e5ec6.png) no-repeat;

                .box-image {
                    position: absolute;
                    top: 38px;
                    left: 38px;
                    width: 170px;
                    height: 170px;
                    background-color: aliceblue;
                    border-radius: 50%;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        display: block;
                    }
                }
            }
        }

        .box-gedan {
            margin-top: 20px;
            width: 100%;
            height: 90%;
            //   评论

        }
    }
}

.mv-comment {
    width: 100%;
    height: auto;
    margin-top: 40px;

    .comment-text {
        width: 100%;
        width: calc(100% - 30px);

        height: 300px;
        margin-bottom: 100px;

        .text-info {
            display: flex;
        }

        textarea {
            resize: none;
            width: calc(100% - 30px);
            padding: 10px 15px;
            line-height: 24px;
            min-height: 50px;
            font-size: 14px;
            color: #333;
            border-radius: 4px;
            white-space: pre-wrap;
            word-wrap: break-word;
            margin: 20px 0;
            border: 1px solid #ccc;
        }
    }

    .comment-user {
        width: 100%;
        height: auto;
        margin-top: 30px;
        display: flex;

        flex-wrap: wrap;

        .box-commet {
            margin: 10px 0;
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
</style>


