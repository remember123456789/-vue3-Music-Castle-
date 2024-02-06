<template>
    <div class="search" @click.passive="showInput">
        <div class="se-input">
            <el-input v-model="input" @change="langdu" placeholder="请输入歌名、歌词、歌手或专辑"
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
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="ruleForm.name" type="text" autocomplete="off" style="width: 536px;" />
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input v-model="ruleForm.pass" type="password" autocomplete="off" style="width: 536px;" />
                </el-form-item>
                <el-form-item label="再次输入密码" prop="checkPass">
                    <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" style="width: 536px;" />
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
import { ref, reactive, type Ref, watchEffect } from 'vue';
import { type FormInstance, type FormRules } from 'element-plus'
import { getSearchMusic } from '../api/search/index'
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
const input = ref('')

const showFlag: Ref<boolean> = ref(false)
type MusicInfo = {
    name: string,
    author: string,
    id: number
}

let searchInfo = ref([])
const showInput = () => {
    showFlag.value = true
}


//实现朗读功能
const langdu = async () => {
    const SearchKeywords = await getSearchMusic(input.value)
    if (SearchKeywords.code == 200) {
        searchInfo.value = SearchKeywords.result.songs
    } else {

    }
}

const checkAge = (rule: any, value: any, callback: any) => {
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'))
        } else {
            callback()
        }
    }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    pass: '',
    checkPass: '',
    name: ''

})

const rules = reactive<FormRules<typeof ruleForm>>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],

})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
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