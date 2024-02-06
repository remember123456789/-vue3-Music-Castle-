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
                    <i :class="['iconfont', `${item.icon}`, { 'iconfontColor': item.path == route.path }]"></i><span>{{
                        item.name
                    }}</span>
                </li>
            </ul>
        </div>
        <div class="Theme-change" @click="ThemeChange">
            <img src="../assets/baitian.png" alt="" class="bai" v-if="ThemeFlag">
            <img src="../assets/dark.png" alt="" class="dark" v-else>
        </div>
        <span><i>切换主题</i></span>

    </div>
</template>
<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTheme } from '../hooks/theme'
const { ThemeChangeColor } = useTheme()
// let ThemeFlag: Ref<boolean> = ref(true)
let ThemeFlag: Ref<Storage | boolean | null> = ref(JSON.parse(localStorage.getItem('ThemeFlag')))

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
const ThemeChange = (e) => {
    if (e.target.getAttribute('src')) {
        if (e.target.getAttribute('class') == 'bai') {
            ThemeChangeColor('dark')
            localStorage.setItem('ThemeFlag', 'false')
            ThemeFlag.value = JSON.parse(localStorage.getItem('ThemeFlag'))
            console.log(typeof ThemeFlag.value);

            // ThemeFlag.value = !ThemeFlag.value
            localStorage.setItem('theme', 'dark')
        } else {
            localStorage.setItem('ThemeFlag', 'true')
            ThemeFlag.value = JSON.parse(localStorage.getItem('ThemeFlag'))
            ThemeChangeColor('')
            // ThemeFlag.value = !ThemeFlag.value
            localStorage.setItem('theme', '')
        }
    }

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

.Theme-change {
    position: relative;
    width: 80px;
    height: 30px;
    margin: 50px;
    border-radius: 10px;
    border: 1px solid #ccc;
    cursor: pointer;

    .bai {
        cursor: pointer;
        position: absolute;
        display: block;
        width: 30px;
        height: 30px;
    }

    .dark {
        position: absolute;
        right: 0;
        width: 30px;
        height: 27px;
    }
}







//设置active


// .lea-menu ul li:nth-child(1) i {
//     
// }
</style>