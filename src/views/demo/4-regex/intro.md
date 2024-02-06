### 代码

```html
<script setup>
import { ref, reactive } from 'vue'

const formRef = ref()
const formData = reactive({
  name: '',
  gender: '',
  tel: '',
})

const reg_tel_phone = /(^((\+86)|(86))?(1[3-9])\d{9}$)|(^(0\d{2,3})-?(\d{7,8})$)/

const baseRules = {
  name: [{ required: true, message: '请输入患者名称', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  tel: [
    { required: true, message: '请输入电话', trigger: 'blur' },
    { pattern: reg_tel_phone, message: '请输入正确的电话', trigger: ['change', 'blur'] },
  ],
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
</template>
```
