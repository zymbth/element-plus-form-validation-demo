<script setup>
import { ref, reactive } from 'vue'
import intro from './intro.md?raw'
import MDViewer from '@/components/md-viewer.vue'

const formRef = ref()
const formData = reactive({
  name: '',
  hospital: '',
  gender: '',
})

async function submitForm(formEl) {
  if (!formEl) return
  let valid, invalidFields
  await formEl.validate((vd, err) => {
    valid = vd
    invalidFields = err
  })
  if (valid) {
    ElMessage({ type: 'success', message: 'submit!' })
  } else {
    console.log('invalidFields: ', invalidFields)
    ElMessage({
      type: 'error',
      message: '以下信息必填：' + Object.keys(invalidFields).join('、')
    })
  }
}
function resetForm(formEl) {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<template>
  <div>
    <h3>Demo: 基本表单验证</h3>
    <p><i>极简的表单验证，以最少的配置完成校验</i></p>
    <el-form class="simple-form" ref="formRef" :model="formData" :show-message="false">
      <el-form-item label="医生名称" prop="name" required>
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="医院" prop="hospital" required>
        <el-select v-model="formData.hospital">
          <el-option value="H00001" label="北京协和医院" />
          <el-option value="H00002" label="上海协和医院" />
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="gender" required>
        <el-radio-group v-model="formData.gender">
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
    <hr />
    <MDViewer :raw-data="intro" />
  </div>
</template>
<style>
.simple-form .el-form-item.is-error .el-form-item__label {
  color: var(--el-color-danger);
  font-weight: bold;
}
</style>
