<template>
    <div>
        <Banner ></Banner>
        <Top></Top>
        <HomeMV></HomeMV>
        <footer style="display: flex;gap: 0.5rem;">
            <HotDj></HotDj>
            <HotSonger></HotSonger>
        </footer>
    </div>
</template>
<script setup>
import { ref, reactive,onActivated ,onDeactivated} from 'vue';
import Banner from './banner.vue'
// import Album from './album.vue'
import Top from './Top.vue'
import HomeMV from './homeMV.vue'
import HotDj from './hotdj.vue'
import HotSonger from './hostSonger.vue'


onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
  console.log('首次载入');
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
  console.log('组件卸载');
})
</script>
<style scoped lang="ts">

</style>