<template>
    <el-card class="box-card">
        <div class="text item">
            <span>
                <h1 style="font-size: 28px;color: #2D2D2D;">热门推荐</h1>
            </span>
            <ul class="nav">
                <li v-for="(item, index) in playListinfo.playListTags" @click.prevent="changetitle(index)"
                    :class="{ 'title-active': index == playListinfo.playList_index }">
                    {{ item.name }}
                    <span></span>
                </li>
            </ul>

            <div class="playlist">
                <router-link v-for="item in playListinfo.playList" :to="{ name: 'playlist', query: { id: item.id } }"
                    :class="['link']">
                    <img :src="item.coverImgUrl" alt="">
                    <span>{{ item.name }}</span>
                </router-link>
            </div>
        </div>
    </el-card>
</template>


<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';

const { proxy }: any = getCurrentInstance();

interface play {
    playListTags: Array<{ name: string }>,
    playList_index: number,
    playList_params: { limit: number, order: string, cat?: string }
    playList: Array<any>
}


let playListinfo: play = reactive({
    playListTags: [],
    playList_index: 0,
    playList_params: { limit: 6, order: 'hot' },
    playList: []
})


//获取导航栏
const getTabs = async () => {
    let result: any = await proxy.$http.selectMenu()

    if (result.code !== 200) return proxy.$mes.error("数据请求失败")

    try {
        result.tags.unshift({ name: "为你推荐" })
        playListinfo['playListTags'] = result.tags.splice(0, 6)
    } catch (error) {
        alert(new Error(error.message))
    }
}

//切换导航栏按钮
const changetitle = (index: number) => {
    playListinfo['playList_index'] = index
    playListinfo['playList_params']['cat'] = playListinfo['playListTags'][index]['name']
    getrcommed(playListinfo['playList_params'])
}
//获取歌单
let getrcommed = async (params: { limit: number, order: string, cat?: string }) => {
    let result: any = await proxy.$http.selectmusic(params)
    if (result.code !== 200) return proxy.$mes.error("获取数据失败")

    try {
        playListinfo['playList'] = result.playlists
    } catch (error) {
        alert(new Error(error.message))
    }
}

onMounted(() => {
    getrcommed(playListinfo['playList_params'])
    getTabs()
})


</script>
<style scoped lang="scss">
.box-card {
    margin: 25px 0;
    height: 336px;
    border-radius: 10px;

    .text {
        position: relative;
        display: flex;

        .playlist {
            position: absolute;
            display: flex;
            margin: 10px 10px;
            top: 52px;
            width: 1000px;
            height: 290px;

            .link {
                display: block;
                width: 135px;
                height: 135px;
                padding: 10px 40px 20px 0;

                text-decoration: none;
                cursor: pointer;

                // background-color: aqua;c
                img {
                    width: 100%;
                    height: 100%;
                }

                span {
                    font-size: 16px;
                    line-height: 22px;
                    margin-top: 15px;
                    font-weight: 400;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: break-all;
                    // margin: 15px 0;
                }
            }
        }

    }

    .nav {
        display: flex;
        margin-left: 50px;


        li {
            cursor: pointer;
            display: inline-block;
            font-size: 16px;
            color: #2D2D2D;
            margin: 15px;
        }
    }


    .title-active {
        font-weight: 800;
        border-bottom: 5px solid orangered;
        z-index: 1;
    }
}
</style>




























