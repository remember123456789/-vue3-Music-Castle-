<template>
    <div>
        <el-card class="box-card">
            <div class="text item">
                <span>
                    <h1 style="font-size: 28px;color: #2D2D2D;">热门推荐</h1>
                </span>
                <ul class="nav">
                    <li v-for="(item, index) in tabs" @click="changetitle(item)"
                        :class="{ 'title-active': item.current == 1 }">
                        {{ item.name }}
                        <span></span>
                    </li>
                </ul>
            </div>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';

let tabs: any = reactive([
    {
        name: '为你推荐',
        current: 1
    },
    {
        name: '华语',
        current: 0
    },
    {
        name: '流行',
        current: 0
    },
    {
        name: '摇滚',
        current: 0
    },
    {
        name: '民谣',
        current: 0
    },
    {
        name: '电子',
        current: 0
    },

])


const changetitle = (item) => {
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].current = 0;
    }
    item.current = 1   
}


</script>
<style scoped lang="scss">
.box-card {
    margin: 25px 0;
    height: 336px;
    border-radius: 10px;

    .text {
        display: flex;
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