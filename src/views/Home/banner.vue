<template>
  <swiper :modules="modules" :slides-per-view="4" :space-between="50" Navigation :pagination="{ clickable: true }">
    <swiper-slide  v-for="(item, index) in banner.value" :key="index"><img :src="item.imageUrl"
        alt=""></swiper-slide>
  </swiper>
</template>

<script setup>
// Import Swiper Vue.js components
import { Navigation, Pagination } from 'swiper/modules';
import { ref, reactive, onActivated } from 'vue'
import { onMounted } from 'vue';
import { getbanner } from '@/api/server.js'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
const modules = [Navigation, Pagination]
let banner = reactive([])
import 'swiper/css'
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const getban = async function () {
  const result = await getbanner()
  if (result.code == 200) {
    banner.value = result.banners
  }
}

onMounted(() => {
  getban()
})



</script>
<style scoped lang="scss">


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