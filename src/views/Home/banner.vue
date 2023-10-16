<template>
  <swiper :modules="modules" :slides-per-view="4" :space-between="50" Navigation :pagination="{ clickable: true }">
    <swiper-slide @click="changeMenu(item)" v-for="(item, index) in banner.value" :key="index"><img :src="item.imageUrl"
        alt=""></swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
// Import Swiper Vue.js components
import { Navigation, Pagination } from 'swiper/modules';
import { ref, reactive } from 'vue'
import { onMounted } from 'vue';
import { getbanner } from '@/api/server.js'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

const modules = [Navigation, Pagination]
let banner: any = reactive([])
// Import Swiper styles
import 'swiper/css'
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const getban = async function () {
  const result = await getbanner()
  if (result.code == 200) {
    //  console.log(result);
    banner.value = result.banners
  }
}
const changeMenu = (item) => {

  window.location.assign(item.url);
}

onMounted(() => {
  getban().then(() => { // 输出响应式数组的值需要在 async 函数中完成  
  });
})
</script>
<style scoped  lang="scss">
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  padding: 40px 0;
  width: 100%;
  height: 100%;


}

.swiper-slide {
  width: 240px;
  height: 89px;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  cursor: pointer;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
</style>