<template>
    <div class="hea-top" style="height: 90vh; overflow: hidden;position: fixed;">
        <div class="hea-left">
            <router-link to="/">
                <img src="../assets/login.jpg" alt="">
            </router-link>
        </div>

        <div class="lea-menu">
            <ul class="nav">
                <li v-for="item in menu" :key="item.path" @click="select(item.path)"
                    :class="{ 'active': route.path == item.path }">
                    <i :class="['iconfont', `${item.icon}`,{'iconfontColor':item.path==route.path}]"></i><span>{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()



const menu = ref([
    {
        name: "首页",
        path: '/',
        icon: 'icon-shouye-tianchong'
    },
    {
        name: "排行榜",
        path: '/rank',
        icon: 'icon-paixingbang'
    },
    {
        name: "歌单",
        path: '/playlist',
        icon: 'icon-gedan'
    },
    {
        name: "MV",
        path: '/mv',
        icon: 'icon-mv-fill'
    },
    {
        name: "歌手",
        path: '/singer',
        icon: 'icon-geshou'
    },
    {
        name: "我的音乐",
        path: '/my',
        icon: 'icon-music'
    },
])
const select = (path: any) => {
    router.push(path)
}



</script>
<style scoped lang="scss">
.hea-left {
    margin: 50px;
}

.lea-menu {
    width: 100%;
}

.nav {
    margin: 0 25px;

    li {
        width: 200px;
        height: 52px;
        // background-color: #FFFFFF;
        line-height: 52px;
        display: flex;
        margin-bottom: 1px;
        cursor: pointer;

        & i {
            position: relative;
            display: block;
            margin: 10px;
            line-height: 52px;
            width: 32px;
            height: 32px;
            background-color: #FFFFFF;
            border-radius: 5px;
            box-shadow: 0 20px 27px #0000000d
        }

        & i::before {
            position: absolute;
            top: -7px;
            left: 8px;
            display: block;
        }

        .iconfontColor {
            background-color: #FF641E;


        }
    }

    .active {
        background-color: #FFFFFF;
        border-radius: 15px;
        box-shadow: 0 20px 27px #0000000d
    }


}







//设置active


// .lea-menu ul li:nth-child(1) i {
//     
// }
</style>