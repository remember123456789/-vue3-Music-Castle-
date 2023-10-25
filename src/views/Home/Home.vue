<template>
    <div>
        <Banner></Banner>
        <recommed></recommed>
        <Album></Album>
        <Top></Top>
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
import recommed from './recommend.vue'
import Album from './album.vue'
import Top from './Top.vue'
import HomeMV from './homeMV.vue'
import HotDj from './hotdj.vue'
import HotSonger from './hostSonger.vue'
</script>
<style scoped lang="ts">

</style>