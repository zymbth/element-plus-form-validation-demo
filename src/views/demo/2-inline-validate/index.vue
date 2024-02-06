<script setup>
import { ref, reactive } from 'vue'
import intro from './intro.md?raw'
import MDViewer from '@/components/md-viewer.vue'

const formRef = ref()
const formData = reactive({
  name: '',
  gender: '',
  age: '',
})

const baseRules = {
  name: [{ required: true, message: '请输入患者名称', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
}

function submitForm(formEl) {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      ElMessage({ type: 'success', message: '验证通过' })
    } else {
      ElMessage({ type: 'error', message: '验证失败' })
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
    <h3>Demo: 表单验证 - 单项验证</h3>
    <p><i>可在表单的项 (<code>&lt;el-form-item&gt;</code>) 中单独设置验证规则</i></p>
    <el-form ref="formRef" :model="formData" :rules="baseRules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" style="width: 200px"/>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="formData.gender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
          <el-radio label="unknown">产前</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="年龄"
        prop="age"
        :rules="{
          required: formData.gender !== 'unknown',
          message: '请输入年龄',
          trigger: 'change',
        }">
        <el-input v-model="formData.age" style="width: 200px"/>
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
