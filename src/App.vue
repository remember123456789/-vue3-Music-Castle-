<template>
  <el-button type="waring" @click="change" style="position: fixed;z-index: 5;">夜间模式</el-button>
  <el-button type="error" style="margin-left: 100px;z-index: 6;position: fixed;" @click="select">沉浸听歌</el-button>
  <div class="common-layout" style="position: relative;">
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
    <div class="mark">正在沉浸式听歌中......</div>
  </div>
  <Bar style="z-index: 2;"></Bar>
</template>
<script setup>
import { ref, reactive } from 'vue';
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import Bar from './views/tabBar/Bar.vue'

let flag = ref(true)
let flag1 = ref(true)
const change = () => {
  let div = document.querySelector('.common-layout');
  flag = !flag
  if (!flag) {
    div.style = 'background-color: #000000;opacity: .9; color:#ffffff;'
  } else {
    div.style = ''
  }
}

const select = () => {
  let mark = document.querySelector('.mark')
  flag1 = !flag1
  if (!flag1) {
    mark.style = 'width: 100vw;height: 100%;background-color: black;opacity: .7;z-index: 4;position: absolute;top: 0; display: flex;align-items: center;justify-content: center;color: #ffffff;font-size: 60px;'

  } else {
    mark.style = ''
  }

}

</script>
<style scoped></style>