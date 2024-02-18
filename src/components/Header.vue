<template>
    <div class="search">
        <div class="se-input" @blur="showFlag = false">
            <el-input v-model="input" @focus="showFlag = true" @keyup="langdu" placeholder="请输入歌名、歌词、歌手或专辑"
                style="width: 250px;height: 40px; border-bottom: 1px solid black;" />
        </div>
        <el-button text @click="dialogTableVisible = true" style="margin-top: 5px;font-size: 16px;">
            登录
        </el-button>
        <el-card class="searchFrom" v-if="showFlag">
            <router-link v-for="item in searchInfo" :to="{
                'name': 'song', query: { id: item.id }
            }" class="search-input">
                <p>{{ item.name }}</p>
            </router-link>
        </el-card>

        <el-dialog v-model="dialogTableVisible">
            <div class="login"><img src="../assets/login.jpg" alt=""></div>
            <!-- 表单 -->
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                class="demo-ruleForm">
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="ruleForm.phone" type="number" autocomplete="off" style="width: 536px;" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password" autocomplete="off" style="width: 536px;" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                    <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, type Ref, watchEffect, watch } from 'vue';
import { type FormInstance, type FormRules, ElMessage } from 'element-plus'
import { getSearchMusic } from '../api/search/index'
import { Userlogin } from '../api/login/index'
import { useCounterStore } from '../store/index'
import { useRoute, useRouter } from 'vue-router'
const store = useCounterStore()
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
const input = ref('')
const router = useRouter()
const showFlag: Ref<boolean> = ref(false)


let searchInfo = ref([])

watchEffect(() => {
    if (input.value === '') {
        showFlag.value = false
    }
})

//搜索
const langdu = async () => {

    try {
        const SearchKeywords = await getSearchMusic(input.value)
        if (SearchKeywords.code == 200) {
            searchInfo.value = SearchKeywords.result.songs
        } else {
            ElMessage({
                showClose: true,
                message: '操作过于频繁，请稍后再输入',
                type: 'warning',
            })
        }

    } catch (error) {
        // ElMessage({
        //     showClose: true,
        //     message: 'Warning, this is a warning message.',
        //     type: 'warning',
        // })
    }
}
// login



const ruleForm = reactive({
    password: '',
    phone: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
    phone: [{ required: true, message: '宝贝记得输入手机号哦', trigger: 'blur' }],
    password: [{ required: true, message: '宝贝记得输入密码哦', trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            if (sessionStorage.getItem('token')) {
                alert('你已经登录过了，请勿重复登录')
            } else {
                //登录成功处理逻辑 
                const result = await Userlogin(ruleForm)
                if (result.code == 200) {
                    dialogTableVisible.value = false
                    ruleForm.password = ''
                    ruleForm.phone = ''
                    sessionStorage.setItem('token', result.token)
                    store.userinfo = result
                    router.push('/my')
                } else if (result.code == 400) {
                    alert('服务器返回http状态码为400，请稍后再重新登录')
                } else {
                    alert('你的账号或者密码错误，请重新输入')
                }
            }
        } else {
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>
<style scoped lang="scss">
.search {
    display: flex;
    width: 300px;
    position: relative;
    left: 850px;
    top: 40px;

    .searchFrom {
        z-index: 2;
        width: 300px;
        height: 300px;
        position: absolute;
        top: 40px;

        .searchInput {
            display: flex;
            width: 100%;
            ;
            height: 50px;

        }
    }

    .se-input {}

    .login {
        text-align: center;
        margin: 15px 0;
    }


}
</style>