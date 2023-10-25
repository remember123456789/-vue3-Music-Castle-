<template>
    <div class="container">
        <div class="conteainer-left">
            <div class="el-image">
                <el-image style="width: 100%; height: 100%" :src="info['playlist'].coverImgUrl" :fit="fit" />
            </div>

            <el-card class="box-card" style="width: 480px; height: 250px; margin-left: 20px;">
                <h1>{{ info['playlist'].name }}</h1>
                <div class="userinfo">
                    <div class="user-image">
                        <el-image :src="info['playlist'].coverImgUrl" style="width: 32px;height: 32px;"></el-image>
                    </div>
                    <div class="user-name">
                        网易云音乐
                    </div>
                    <div class="updata-time">
                        2014-06-30
                    </div>
                </div>
                <div class="desc">
                    <h2>简介</h2>
                    <span>{{ info['playlist'].description }}</span>
                </div>
            </el-card>
        </div>
        <div class="container-right">
            <div class="rank-aside">
                <div class="rank-type">
                    <span @click="selectMenu('Top')" :class="{ 'active': info['type'] == 'Top' }">Top榜</span>
                    <span @click="selectMenu('Feature')" :class="{ 'active': info['type'] == 'Feature' }">特色榜</span>
                    <span @click="selectMenu('Outher')" :class="{ 'active': info['type'] == 'Outher' }">场景榜</span>
                </div>

                <div class="rank-list">
                    <span v-for="item in info['list']" @click="slectID(item)">
                        <h3 style="margin-left: 15px;text-overflow: ellipsis;">{{ item.name }}</h3>
                        <div class="span-image">
                            <img :src="item.coverImgUrl" alt="" style="width: 40px;height: 40px;border-radius: 10px;">
                        </div>
                    </span>

                </div>
            </div>
        </div>
        <!-- 底部区域 -->
        <SongList :id="info['uid']" ></SongList>
    </div>
</template>
<script setup>
import SongList from '../../components/songList.vue'
import { ref, reactive, getCurrentInstance, onMounted, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
const { proxy } = getCurrentInstance()

const router = useRouter()
let info = reactive({
    list: [],
    type: 'Top',
    listTop: [],
    listFeature: [],
    listOuther: [],
    uid: 19723756,
    playlist: {},
    info_index: 0
})
// 获取rank榜单
const getLIstRANK = async () => {
    let result = await proxy.$http.getAllRankList()
    if (result.code !== 200) proxy.$mes.error("请求数据失败")
    try {
        //所有的Top榜
        info['listTop'] = result.list.filter(item => {
            return item.ToplistType
        })
        // 所有的特色榜单
        info['listFeature'] = result.list.filter(item => {
            return item.name.includes('云音乐')
        })
        // 所有的场景榜单
        info['listOuther'] = result.list.filter(item => {
            return !item.name.includes("云音乐") && !item.ToplistType
        })
        // 如果info.type为真  info['list']=info['list'+info.type]
        info['list'] = info.type ? info['list' + info.type] : info.listTop
        // 默认为空选择飙升榜
        info['uid'] = info['uid'] ? info.uid : info.listTop[0].id 
        getMenu()
    } catch (error) {

    }
}

// 切换选择按钮
const selectMenu = (type) => {
    info['type'] = type
    getLIstRANK()
}
// 选择榜单按钮
const slectID = (item) => {
    info['uid'] = item.id
    router.push({ path: 'rank', query: { id: item.id } })
    getMenu()

}
// 获取歌单详情 需要传递一个id
const getMenu = async () => {
    let result = await proxy.$http.getMenuId({ id: info['uid'] })
    info['playlist'] = result.playlist
}

watch(info['uid'], () => {
    getMenu()
})

onMounted(() => {
    getLIstRANK()
})

</script>
<style scoped lang="scss" deep>
.container {
    display: flex;
    flex-wrap: wrap;
    margin-right: 0;
    padding-right: 0;
    width: 1150px;
    height: 500px;
    margin: 40px 20px;
    // background-color: antiquewhite;

    .conteainer-left {
        display: flex;
        width: 70%;
        height: auto;
        // background-color: aquamarine;

        .el-image {
            border-radius: 30px;
            width: 250px;
            height: 250px;
        }

        .box-card {
            //   头像信息
            border-radius: 10px;

            h1 {
                flex: 1;
                font-size: 24px;
                font-weight: 700;
                /* height: 34px; */
                line-height: 34px;
            }

            .userinfo {
                display: flex;
                padding: 15px 0 10px;
                height: 50px;
                width: auto;
                line-height: 30px;
                vertical-align: middle;

                .user-image {
                    padding: 0 10px;
                    // vertical-align: middle;
                }

                .user-name {
                    padding: 0 10px;
                }
            }


            .desc {
                margin-top: 50px;

                span {
                    line-height: 22px;
                    font-size: 14px;
                    color: #909090;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: break-all;
                }
            }



        }



    }

    // 底部区域


    // 右侧区域
    .container-right {
        width: 30%;
        // background-color: antiquewhite;
        height: auto;

        .rank-aside {
            width: 100%;
            height: 150px;

            .rank-type {
                cursor: pointer;
                display: flex;


                span {
                    margin: 5px;
                    width: 103px;
                    height: 58px;
                    display: block;
                    background-color: #FFFFFF;
                    border-radius: 15px;
                    line-height: 54px;
                    text-align: center;
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }

            .rank-list {
                display: flex;
                flex-wrap: wrap;

                span {
                    cursor: pointer;
                    position: relative;
                    margin: 10px;
                    width: 145px;
                    height: 52px;
                    display: block;
                    // background-color: blueviolet;
                    // background-color: #ffb08e;
                    border-radius: 10px;
                    line-height: 52px;
                    opacity: 1;
                    background: -moz-linear-gradient(-45deg, #ffffff 20%, #ffb08e 100%);
                    background: -webkit-linear-gradient(-45deg, #ffffff 20%, #ffb08e 100%);
                    background: linear-gradient(135deg, #FFFFF9 20%, #ffb08e 100%);
                }


                // text-align: center;
                .span-image {
                    top: 5px;
                    left: 90px;
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;

                }
            }
        }

    }

    .active {
        transition: color .2s ease-in;
        background-color: #ff641e !important;
    }
}
</style>

