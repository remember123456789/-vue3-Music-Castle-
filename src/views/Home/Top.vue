<template>
    <div class="card-big">
        <el-card class="box-card" v-for="item in TopInfo.TopList">
            <div class="top-hd">
                <router-link :to="{ name: 'Rank', query: { id: 1} }" :class="['top-hd-title']" >
                    {{ item.name }}
                </router-link>
                <span style="    line-height: 18px;font-weight: 300;color: var(--color-text);">
                    最新更新：{{ item.updateTime }}
                </span>
            </div>
            <!-- ---------------------------------------- -->
            <div class="top-wapper" v-for="songItem in TopInfo.PlayListDetail[item.id]" :key="songItem.id">
                <div class="top-wapper-image">
                    <img :src="songItem.al.picUrl" alt="">
                </div>
                <div class="top-wapper-song" >
                    <router-link :to="{ name: 'song', query: { id: songItem.id } }" style="text-decoration: none; ">
                        <span class="song-name" style="cursor: pointer;">{{ songItem.name }}</span>
                        <p>{{ songItem.al.name }}</p>
                    </router-link>
                </div>
                <div class="top-wapper-Operation">

                </div>
            </div>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
const { proxy }: any = getCurrentInstance()

let idname=ref()
interface TOPINFO {
    TopList: Array<any>,
    PlayListDetail: any
}

let TopInfo: TOPINFO = reactive({
    TopList: [],
    PlayListDetail: {}
})

const getToplist = async () => {
    let result: any = await proxy.$http.getmusicMenu()
    if (result.code !== 200) return proxy.$mes.error("请求数据失败")

    try {
        TopInfo['TopList'] = result.list.splice(0, 4)
        TopInfo['TopList'].forEach(async (item) => {
            let res = await proxy.$http.getmusicContent(item.id)
            TopInfo['PlayListDetail'][item.id] = res.playlist.tracks.splice(0, 6)

        })
    } catch (error) {
        // alert(new Error(error.message))
    }
}
//处理时间函数
const checkTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}




onMounted(() => {
    getToplist()
})


</script>
<style scoped lang="scss">
.card-big {
    width: 1181px;
    width: auto;
    height: auto;

    display: flex;

    .box-card {
        width: 25%;
        // padding-right: 5px;
        margin-right: 15px;
        border-radius: 10px;

        .top-hd-title {
            text-decoration: none;
            display: block;
            font-size: 22px;
            line-height: 30px;
            font-weight: 700;
            padding-bottom: 10px;
        }

        .top-wapper {
            display: flex;
            margin: 20px 0;

            .top-wapper-image {
                flex-shrink: 0;
                width: 48px;
                height: 48px;
                line-height: 48px;
                font-size: 18px;
                border-radius: 8px;
                margin-right: 20px;
                box-shadow: 0 4px 6px #0000001f;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .song-name {
                text-decoration: none;
                line-height: 24px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                word-break: break-all;
                padding-bottom: 5px;
                font-size: 14px;
                transition: all .3s ease-in;
            }
        }

    }
}
</style>