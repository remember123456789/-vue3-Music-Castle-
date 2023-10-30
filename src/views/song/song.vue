<template>
    <div class="container">
        <div class="left">
            <el-card class="box-left">
                <h1 style="font-size: 30px; color: #2D2D2D;">大眠</h1>
                <span style="font-size: 18px;color: #909090;line-height: 18px;margin: 20px 0;display: block;">小了个</span>
                <span style="color: #909090;">专辑：<em style="color: #2D2D2D;">1232</em></span>
            </el-card>
            <el-card class="box-simail">
                <h1 style="width: 100px;height: 5px;border-left: 5px solid orangered;padding: 10px;line-height:5px;">相似歌曲
                </h1>

                <div class="smaill-Music">
                    <span class="item-music" v-for="item in 4">
                        <p style="color: #2D2D2D;font-size: 14px;">还是会想念</p>
                    </span>
                </div>
            </el-card>
        </div>
        <div class="center">
            <el-card class="box-center">
                <h1 style="text-align: center;">歌词</h1>
                <div class="center-ci"></div>
            </el-card>
        </div>
        <div class="right">
            <el-card class="box-right">
                <div class="box-cover">
                    <div class="box-image">
                        <img src="" alt="">
                        <!-- <img src="../../assets/login.jpg" alt=""> -->
                    </div>
                </div>
            </el-card>
            <el-card class="box-gedan">
                <h1 style="width: 150px; height: 5px;padding: 10px; border-left: 5px solid orangered; line-height: 5px;">
                    包含这首歌的歌单</h1>


                <!-- 评论区 -->

            </el-card>
        </div>


    </div>

    <div class="mv-comment">
        <div class="comment-text">
            <div class="text-info">
                <h2 style="font-size: 24px;color: #2D2D2D;">评论</h2>
                <span style="font-size: 14px;color: #999999;margin-left: 20px;line-height: 35px;">共条评论</span>
            </div>
            <textarea name="" id="" cols="30" rows="10" placeholder="期待你的神评论……"></textarea>
            <el-button type="warning">评论</el-button>
        </div>

        <!-- v-for遍历 -->
        <div class="comment-user">
            <el-card class="box-commet">
                <div class="box-image">
                    <!-- <img :src="com.user.avatarUrl" alt=""> -->
                    <img src="" alt="">
                </div>
                <div class="box-info">
                    <h2>123</h2>
                    <span>21111</span>
                    <p style="color: #999999;font-size: 14px;margin-top: 10px;">4564</p>
                </div>
            </el-card>
        </div>

    </div>
</template>


<script setup>
import { ref, reactive } from 'vue';

</script>
<style scoped lang="scss">
.container {
    overflow: hidden;
    margin-top: 20px;
    width: 100%;
    height: 100vh;
    // background-color: antiquewhite;
    display: flex;

    .left {
        width: 30%;
        height: 50%;

        .box-left {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 100%;
        }

        .box-simail {
            margin-top: 20px;
            width: 100%;
            height: 100%;

            .smaill-Music {
                margin-top: 20px;
                width: 100%;
                height: 320px;

                // background-color: black;
                .item-music {
                    display: block;
                    width: 100%;
                    height: 50px;
                    margin: 20px 0;
                    padding: 5px 0;
                    border-bottom: 1px solid #c5c4c4;
                    // background-color: aqua;
                }
            }
        }
    }

    .center {
        width: 30%;
        margin: 0 50px;
        height: 100vh;

        .box-center {
            width: 100%;
            height: 102%;
            border-radius: 10px;

            .center-ci {
                margin-top: 20px;
                height: 700px;
                width: 100%;
                // background-color: black;
            }
        }
    }

    .right {
        width: 30%;
        height: 50%;

        .box-right {
            border-radius: 10px;
            width: 100%;
            height: 100%;

            .box-cover {
                position: relative;
                margin: 40px 40px;
                width: 320px;
                height: 300px;
                // background-color: black;
                background: url(../../assets/js/disc.986e5ec6.png) no-repeat;

                .box-image {
                    position: absolute;
                    top: 38px;
                    left: 38px;
                    width: 170px;
                    height: 170px;
                    background-color: aliceblue;
                    border-radius: 50%;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        display: block;
                    }
                }
            }
        }

        .box-gedan {
            margin-top: 20px;
            width: 100%;
            height: 100%;
            //   评论

        }
    }
}

.mv-comment {
    width: 100%;
    height: auto;
    margin-top: 40px;

    .comment-text {
        width: 100%;
        width: calc(100% - 30px);

        height: 300px;
        margin-bottom: 100px;

        .text-info {
            display: flex;
        }

        textarea {
            resize: none;
            width: calc(100% - 30px);
            padding: 10px 15px;
            line-height: 24px;
            min-height: 50px;
            font-size: 14px;
            color: #333;
            border-radius: 4px;
            white-space: pre-wrap;
            word-wrap: break-word;
            margin: 20px 0;
            border: 1px solid #ccc;
        }
    }

    .comment-user {
        width: 100%;
        height: auto;
        margin-top: 30px;
        display: flex;

        .box-commet {
            width: 100%;
            height: auto;
            border-radius: 10px;
            position: relative;

            .box-image {
                width: 40px;
                height: 40px;
                position: absolute;
                border-radius: 50%;

                img {
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                }
            }

            .box-info {
                width: 70%;
                height: 100%;
                margin-left: 55px;
            }

            .box-info h2 {
                // display: inline-block;
                padding-bottom: 10px;
                line-height: 14px;
                color: #999;
            }

            .box-info span {
                color: #2D2D2D;
                font-size: 14px;
                margin: 10px 0;
            }
        }
    }
}
</style>