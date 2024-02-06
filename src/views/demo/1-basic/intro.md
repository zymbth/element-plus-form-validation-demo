### 代码

```html
<script setup>
import { ref, reactive } from 'vue'

const formRef = ref()
const formData = reactive({
  name: '',
  hospital: '',
  others: {
    gender: '',
  },
})

const baseRules = {
  name: [{ required: true, message: '请输入医生名称', trigger: 'blur' }],
  hospital: [{ required: true, message: '请选择医院', trigger: 'change' }],
  'others.gender': [{ required: true, message: '请选择性别', trigger: 'change' }],
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
    <el-form-item label="医生名称" prop="name">
      <el-input v-model="formData.name" style="width: 200px" />
    </el-form-item>
    <el-form-item label="医院" prop="hospital">
      <el-select v-model="formData.hospital" style="width: 200px">
        <el-option value="H00001" label="北京协和医院" />
        <el-option value="H00002" label="上海协和医院" />
      </el-select>
    </el-form-item>
    <el-form-item label="性别" prop="others.gender">
      <el-radio-group v-model="formData.others.gender">
        <el-radio label="male">男</el-radio>
        <el-radio label="female">女</el-radio>
        <el-radio label="unknown">未知</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
      <el-button @click="resetForm(formRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

```
