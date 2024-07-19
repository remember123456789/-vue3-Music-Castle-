<template>
    <div class="card-big">
        <el-card class="box-card" v-for="item in TopInfo.TopList" :key="item.id">
            <div v-if="loading">
                 <div class="top-hd">
                <router-link :to="{ name: 'Rank', query: { id: 1 } }" :class="['top-hd-title']">
                    {{ item.name }}
                </router-link>
                <span style="    line-height: 18px;font-weight: 300;color: var(--color-text);">
                    最新更新：{{ getTime(item.updateTime) }}
                </span>
            </div>
            <!-- ---------------------------------------- -->
            <div class="top-wapper" v-for="songItem in TopInfo.PlayListDetail[item.id]" :key="songItem.id">
                <div class="top-wapper-image">
                    <img :src="songItem.al.picUrl" alt="">
                </div>
                <div class="top-wapper-song">
                    <router-link :to="{ name: 'song', query: { id: songItem.id } }" style="text-decoration: none; ">
                        <span class="song-name" style="cursor: pointer;">{{ songItem.name }}</span>
                        <p>{{ songItem.al.name }}</p>
                    </router-link>
                </div>
                <div class="top-wapper-Operation">

                </div>
            </div>
            </div>
            <!-- 骨架屏 -->
            <template  v-else>
                <el-skeleton style="width: 240px ;display:flex;margin-top: 30px;" v-for="item in 5" animated>
                    <template #template>
                        <el-skeleton-item variant="image" style="width: 50px; height: 50px" />
                        <el-skeleton-item variant="text" style="width: 30%;margin: 20px;" />
                    </template>

                </el-skeleton>
            </template>

        </el-card>
    </div>


</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, onActivated } from 'vue';
const { proxy }: any = getCurrentInstance()
let loading = ref(false)
let idname = ref()
interface TOPINFO {
    TopList: Array<any>,
    PlayListDetail: any
}

let TopInfo: TOPINFO = reactive({
    TopList: [],
    PlayListDetail: {}
})

function getTime(n) {
    return new Date(n).toLocaleString().replace(/\//g, '-')
}
const getToplist = async () => {
    loading.value=false
    proxy.$http.getmusicMenu().then((result) => {
        if (result.code !== 200) return proxy.$mes.error("请求数据失败")
        TopInfo['TopList'] = result.list.splice(0, 4)
        TopInfo['TopList'].forEach(async (item) => {
            let res = await proxy.$http.getmusicContent(item.id)
            TopInfo['PlayListDetail'][item.id] = res.playlist.tracks.splice(0, 6)
            loading.value = true
        })
    }).finally(() => {
        // loading.value = tru
            })

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
        height: 78vh;
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