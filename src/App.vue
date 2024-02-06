<template>
  <el-container @click="hideInput">
    <el-aside width="270px" style="height: 100vh;">
      <Aside></Aside>
    </el-aside>
    <el-container>
      <el-header>
        <Header :Flag="FlagOther"></Header>
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

let FlagOther = ref(false)
const hideInput = (e) => {
  if (e.target.getAttribute('class') === 'el-input__inner' || e.target.getAttribute('class') === 'el-card is-always-shadow searchFrom') {
    return
  } else {
    FlagOther.value = false
  }

}


</script>
<style scoped></style>