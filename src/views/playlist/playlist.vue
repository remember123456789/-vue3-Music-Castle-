<template>
    暂无数据
</template>
<script setup>
import { ref, reactive } from 'vue';

</script>
<style scoped lang="scss">
.playList {
    width: 70vw;
    height: 100vh;

    .box-card {
      
        width: 1100px;
        height: 156px;
        display: flex ;

        border-radius: 10px;
        padding: 0px 10px 20px;
        margin-top: 50px;
        margin-left: 20px;


        .box-splide {
            height: 130px;
            width: 100px;
            display: block;
            border-right: 1px solid #ccc;
            background-color: aquamarine;

            // background-color: aquamarine;
            .splide-title {
                margin-bottom: 10px;
                font-size: 18px;
                font-weight: 800;
            }

            .splide-Classification {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                height: 100%;

                span {
                    margin: 5px 5px;
                }


            }
        }
    }
}
</style>