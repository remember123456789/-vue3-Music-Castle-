<template>
    <div class="hea-top" style="height: 90vh; overflow: hidden;position: fixed;">
        <div class="hea-left">
            <router-link to="/">
                <img src="../assets/login.webp" alt="">
            </router-link>
        </div>

        <div class="lea-menu">
            <ul class="nav">
                <li v-for="item in menu" :key="item.path" @click="select(item.path)"
                    :class="{ 'active': route.path == item.path }">
                    <i :class="['iconfont', `${item.icon}`, { 'iconfontColor': item.path == route.path }]"></i>
                    <p>{{
                        item.name
                    }}</p>
                </li>
            </ul>
        </div>
        <div class="Theme-change" @click="ThemeChange">
            <img src="../assets/baitian.webp" alt="" class="bai" v-if="ThemeFlag">
            <img src="../assets/qingyewan.webp" alt="" class="dark" v-else>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, type Ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTheme } from '../hooks/theme'
const { ThemeChangeColor } = useTheme()

let ThemeFlag: Ref<boolean | null> = ref(null)

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
        icon: 'icon-paixingbang',
        id: 19723756
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
    if (path == '/rank') {
        router.push({ name: 'Rank', query: { id: 1 } })
    } else {
        router.push(path)
    }
}
const ThemeChange = (e ) => {
    if (e.target.getAttribute('src')) {
        if (e.target.getAttribute('class') == 'bai') {
            ThemeChangeColor('dark')
            localStorage.setItem('ThemeFlag', 'false')
            localStorage.setItem('theme', 'dark')
        } else {
            localStorage.setItem('ThemeFlag', 'true')
            ThemeChangeColor('')
            localStorage.setItem('theme', '')
        }
        ThemeFlag.value = JSON.parse(localStorage.getItem('ThemeFlag') as string)
    }
}
watchEffect(() => {
    let flag = JSON.parse(localStorage.getItem('ThemeFlag') as string)
    if (flag == null) {
        ThemeFlag.value = true
    } else {
        ThemeFlag.value = flag
    }
})





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
// }</style>