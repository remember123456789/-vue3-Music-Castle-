<template>
    <el-container>
      <el-aside width="270px" style="height: 100vh;">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  <Bar style="z-index: 2;"></Bar>
</template>
<script setup>
import { ref, reactive } from 'vue';
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import Bar from './views/tabBar/Bar.vue'



</script>
<style scoped></style>