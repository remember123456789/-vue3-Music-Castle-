<template>
    <el-skeleton style="width: 240px">
        <template #template>
            <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
            <div style="padding: 14px">
                <el-skeleton-item variant="p" style="width: 50%" />
                <div style="">
                    <div class="playlist">
                        <router-link>
                            <el-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
                        </router-link>
                    </div>
                    <el-skeleton-item variant="text" style="margin-right: 16px" />
                    <el-skeleton-item variant="text" style="width: 30%" />
                </div>
            </div>
        </template>
    </el-skeleton>
</template>
<script setup>
import { ref, reactive } from 'vue';

</script>
<style scoped lang="scss">
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
</style>