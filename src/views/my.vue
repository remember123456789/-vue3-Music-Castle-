<template>
    <div class="back">
        <el-card class="user">
            <div class="user-img">
                <img :src="store.userinfo.profile.avatarUrl" alt="" srcset="">
            </div>
            <div class="user-info">
                <p>{{ store.userinfo.profile.nickname }}</p>
                <span>关注 {{ store.userinfo.profile.followeds }} | 粉丝 {{ store.userinfo.profile.follows }}</span>
            </div>
        </el-card>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { useCounterStore } from '../store';
const store = useCounterStore()
console.log(store.userinfo);


</script>
<style scoped lang="scss">
.back {
    width: 100vw;
    height: 100vh;
    background-image: url();
    background-position: right top;

    .user {
        width: 600px;
        height: 300px;
        position: relative;

        .user-img {
            margin-top: 30px;
            width: 200px;
            height: 200px;
            background-color: antiquewhite;
            border-radius: 50%;

            img {
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 50%;

            }
        }

        .user-info {
            position: absolute;
            top: 40px;
            right: 30px;
            width: 250px;
            height: 200px;

            p {
                color: black;
                font-size: 29px;
                font-weight: 700;
            }

            span {
                display: block;
                margin-top: 20px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            // background-color: aqua;
        }
    }
}
</style>