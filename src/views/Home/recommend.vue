<template>
    <el-card class="box-card">
        <div class="text item">
            <span>
                <h1 style="font-size: 28px;color: #2D2D2D;">热门推荐</h1>
            </span>
            <ul class="nav">
                <li v-for="(item, index) in tabs" @click.prevent="changetitle(item)"
                    :class="{ 'title-active': item.current == 1 }">
                    {{ item.name }}
                    <span></span>
                </li>
            </ul>

            <div class="playlist">
                <router-link v-for="item in playList" :to="{ name: 'playlist', query: { id: item.id } }" :class="['link']">
                    <img :src="item.coverImgUrl" alt="">
                    <span>{{ item.name }}</span>
                </router-link>
            </div>
        </div>
    </el-card>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, watch, onBeforeMount, onUpdated, nextTick } from 'vue';
// const instance = getCurrentInstance();
import { selectmusic } from '@/api/server.js'

let para = reactive({
    limit: 6,
    order: 'hot',
    cat: '为你推荐'
})


let tabs = reactive([
    {
        name: '为你推荐',
        current: 1,
    },
    {
        name: '华语',
        current: 0,

    },
    {
        name: '流行',
        current: 0,

    },
    {
        name: '摇滚',
        current: 0,

    },
    {
        name: '民谣',
        current: 0,

    },
    {
        name: '电子',
        current: 0,

    },

])

let playList = reactive([])



//切换导航栏按钮
const changetitle = (item) => {
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].current = 0;
    }

    item.current = 1

    para.cat = item.name
    getrcommed(para)

}

const getrcommed = async (params) => {
    let result = await selectmusic(params)

    if (result.code == 200) {
        playList = result.playlists
        
    }

}



onMounted(() => {
    getrcommed(para)
    // 这里的代码将会在 DOM 更新后执行  
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
                width: 129px;
                height: 129px;
                padding: 10px 40px 20px 0;

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
        cursor: pointer;

        li {
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




























