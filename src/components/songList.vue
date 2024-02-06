<template>
    <div class="container-bottom" style="border-radius: 30px;" v-load="store.Loading">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <el-button type="warning" style="margin-left: 500px;"><el-icon>
                            <CaretRight />
                        </el-icon>播放全部</el-button>
                    <el-button round><el-icon>
                            <ElementPlus />
                        </el-icon>收藏</el-button>
                </div>
            </template>

            <el-table :data="songList['tableData']" v-loading="songList['isLoading']" element-loading-text="Loading..."
                style="width: 100%;font-size: 14px;" @row-click="handleRowClick">
                <el-table-column prop="id" label="序号" width="70" />
                <el-table-column prop="date" label="歌曲" width="160" />
                <el-table-column prop="songer" label="歌手" width="160" />
                <el-table-column prop="name" label="专辑" width="180" />
                <el-table-column prop="time" label="时常" />
            </el-table>

        </el-card>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, watch, watchEffect, defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const { proxy }: any = getCurrentInstance()
const route = useRoute()
const router = useRouter()
import { useCounterStore } from '../store/index'
const store = useCounterStore()

let prox = defineProps({
    id: {
        type: Number,
        default: 19723756
    }
})


interface SongLIst {
    song: Array<any>,
    tableData: Array<{ id: number, date: string, songer: string, name: string, time: number, menuicId: number, songerid: number }>,

}

let songList: SongLIst = reactive({
    song: [],
    tableData: [],

})

function toHHmmss(date: any): any {
    var minutes = parseInt((date % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (date % (1000 * 60)) / 1000;
    var time = (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
    return time;
}



const getSongList = async (): Promise<void> => {
    if (songList['tableData'].length !== 0) {
        songList['tableData'] = []
    }
store.showLoading()
    let result = await proxy.$http.getMenuSongList({ id: prox.id })
    
    try {
        result.songs.map(item => {
            songList['tableData'].push({
                id: songList['tableData'].length + 1,
                date: item.name,
                songer: item.ar[0].name,
                name: item.al.name,
                time: toHHmmss(item.dt),
                menuicId: item.id,
                songerid: item.ar.id
            })
            songList['isLoading'] = false
        })
        store.hideLoading()
    } catch (error) {

    }
}

// 点击歌曲按钮
const handleRowClick = (row) => {
    router.push({ name: 'song', query: { id: row.menuicId } })
}
//  使用高级侦听器 检测到query发生变化就发一次请求

// watch(route.query, () => {
//     getSongList()
//     songList['isLoading'] = false
// }, {
//     deep: true,
//     immediate: true
// })
watchEffect(() => {
    if (route.query.id) {
        getSongList()

    }

})

// onMounted(() => {
//     getSongList()
// })




</script>
<style scoped lang="scss">
.container-bottom {
    border-radius: 10px;
    width: 65%;
    height: auto;
    // background-color: wheat;
    margin-top: 20px;

    .card-header {
        width: 100%;
        height: 70px;
        line-height: 70px;
        display: flex;
        // justify-content: space-between;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .box-card {
        width: 100%;
        height: 100%;
    }
}
</style>
