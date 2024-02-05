<script setup>
import { ref, reactive } from 'vue'
import intro from './intro.md?raw'
import MDViewer from '@/components/md-viewer.vue'

const formRef = ref()
const formData = reactive({
  name: '',
  gender: '',
  tel: '',
})

const regTelPhone = /(^((\+86)|(86))?(1[3-9])\d{9}$)|(^(0\d{2,3})-?(\d{7,8})$)/

const baseRules = {
  name: [{ required: true, message: '请输入患者名称', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  tel: [
    { required: true, message: '请输入电话', trigger: 'blur' },
    { pattern: regTelPhone, message: '请输入正确的电话', trigger: ['change', 'blur'] },
  ],
}

function submitForm(formEl) {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      ElMessage({ type: 'success', message: 'submit!' })
    } else {
      ElMessage({ type: 'error', message: 'error submit!' })
    }
  })
}
function resetForm(formEl) {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<template>
  <div>
    <h3>Demo: 表单验证 - 正则验证</h3>
    <p>
      <i
        >element-plus 采用的 <code>async-validator</code> 提供了很多高级用法，可以使用
        <code>pattern</code> 指定校验的正则</i
      >
    </p>
    <el-form ref="formRef" :model="formData" :rules="baseRules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" style="width: 200px"/>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="formData.gender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model="formData.tel" style="width: 200px"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </el-form-item>
    </el-form>
    <hr />
    <MDViewer :raw-data="intro" />
  </div>
</template>
