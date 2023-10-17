
<template>
    <el-card class="box-card">
        <div class="text item">
            <span>
                <h1 style="font-size: 28px;color: #2D2D2D;">新碟上架</h1>
            </span>
            <div class="nav">
                <li v-for="(item, index) in albuminfo.album_Menu" @click="changeMenu(index)"
                    :class="{ 'title-active': index == albuminfo['album_index'] }">{{ item.name }}</li>
            </div>


            <div class="album_list">
                <div class="album" v-for="item in albuminfo.album_List">
                    <div class="album-img">
                        <img :src="item.picUrl" alt="">
                    </div>
                    <div class="album-info">
                        <div class="album-type">{{ item.type }}</div>
                        <div class="album-name">{{ item.name }}</div>
                        <div class="artList-name">{{ item.artist.name }}</div>
                    </div>
                </div>
            </div>


        </div>

    </el-card>
</template>

<script setup lang="ts">

import { ref, reactive, getCurrentInstance, onMounted } from 'vue';

const { proxy }: any = getCurrentInstance();

interface albumINfo {
    album_Menu: Array<{ name: string, code: string }>
    album_params: { limit: number },
    album_index: number,
    album_List: Array<any>
}

let albuminfo: albumINfo = reactive({
    album_Menu: proxy.$common.EV_ALBUM,
    album_params: { limit: 12 },
    album_index: 0,
    album_List: []
})

const changeMenu = (index: number) => {
    albuminfo['album_index'] = index
}

//获取专辑
const getAblum = async (params: { limit: number }) => {
    let result: any = await proxy.$http.getAblum(params)
    if (result.code !== 200) return proxy.$mes.error("请求数据失败")

    try {
        albuminfo['album_List'] = result.weekData.splice(0, 12)
        console.log(albuminfo['album_List']);
    } catch (error) {
        // alert(new Error(error.message))
    }
}

onMounted(() => {
    getAblum(albuminfo['album_params'])
})



</script>
<style scoped lang="scss">
.box-card {
    margin: 25px 0;
    height: auto;
    border-radius: 10px;

    .text {
        position: relative;
        display: flex;
        flex-wrap: wrap;

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
                text-decoration: none;

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

        .album_list {

            width: 1109px;
            height: 316px;

            display: flex;
            flex-wrap: wrap;

            .album {
                cursor: pointer;
                display: flex;
                width: 237px;
                height: 78px;
                // background-color: aqua;
                margin: 20px 20px 0;

                .album-img {
                    width: 78px;
                    height: 78px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .album-info {
                    overflow: hidden;
                    margin-left: 40px;
                    width: 50%;
                    height: 100%;
                    position: relative;

                    .album-type {
                        position: absolute;
                        top: 5px;
                        right: -30px;
                        width: 100px;
                        line-height: 24px;
                        font-size: 12px;
                        transform: rotate(45deg);
                        text-align: center;
                        color: #fff;
                        background-color: #ff641e;
                    }

                    .album-name {
                        font-size: 16px;
                        color: #2D2D2D;
                        padding: 15% 20px 10px 0;
                    }

                    .artList-name {
                        font-size: 14px;
                        color: var(--color-text);
                    }
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

