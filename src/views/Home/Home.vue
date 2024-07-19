<template>
    <div>
        <Banner ></Banner>
        <Top></Top>
        <!-- <Album></Album> -->
        <HomeMV></HomeMV>
        <footer style="display: flex;">
            <HotDj></HotDj>
            <HotSonger></HotSonger>
        </footer>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import Banner from './banner.vue'
// import Album from './album.vue'
import Top from './Top.vue'
import HomeMV from './homeMV.vue'
import HotDj from './hotdj.vue'
import HotSonger from './hostSonger.vue'
</script>
<style scoped lang="ts">

</style>