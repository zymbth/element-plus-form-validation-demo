<script setup>
import { ref, reactive } from 'vue'
import { asyncFuncWrapper } from '@/utils/utils'
import intro from './intro.md?raw'
import MDViewer from '@/components/md-viewer.vue'

const formRef = ref()
const formData = reactive({
  name: '',
  hospital: '',
  gender: '',
})

const baseRules = {
  name: [{ required: true, message: '请输入医生名称', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  hospital: [{ required: true, message: '请选择医院', trigger: 'change' }],
}

function submitForm1(formEl) {
  if (!formEl) return
  // 1. 传入回调函数
  formEl.validate((valid, invalidFields) => {
    if (valid) {
      ElMessage({ type: 'success', message: 'submit!' })
    } else {
      console.log('invalidFields: ', invalidFields)
      ElMessage({ type: 'error', message: 'error submit!' })
    }
  })
}
function submitForm2(formEl) {
  if (!formEl) return
  // 2. 处理返回的 Promise
  formEl
    .validate()
    .then(valid => {
      ElMessage({ type: 'success', message: 'submit!' })
    })
    .catch(invalidFields => {
      console.log('invalidFields: ', invalidFields)
      ElMessage({ type: 'error', message: 'error submit!' })
    })
}
async function submitForm3(formEl) {
  if (!formEl) return
  let valid, invalidFields
  // 3. async...await... & callback
  await formEl.validate((vd, err) => {
    valid = vd
    invalidFields = err
  })
  if (valid) {
    ElMessage({ type: 'success', message: 'submit!' })
  } else {
    console.log('invalidFields: ', invalidFields)
    ElMessage({ type: 'error', message: 'error submit!' })
  }
}
async function submitForm4(formEl) {
  if (!formEl) return
  let valid, invalidFields
  try {
    // 4. async...await... & Promise
    valid = await formEl.validate()
  } catch (error) {
    invalidFields = error
  }
  if (valid) {
    ElMessage({ type: 'success', message: 'submit!' })
  } else {
    console.log('invalidFields: ', invalidFields)
    ElMessage({ type: 'error', message: 'error submit!' })
  }
}
async function submitForm5(formEl) {
  if (!formEl) return
  // 5. async...await...(封装异常捕捉) & Promise
  const { resp: valid, err: invalidFields } = await asyncFuncWrapper(formEl.validate)
  if (valid) {
    ElMessage({ type: 'success', message: 'submit!' })
  } else {
    console.log('invalidFields: ', invalidFields)
    ElMessage({ type: 'error', message: 'error submit!' })
  }
}

function resetForm(formEl) {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<template>
  <div>
    <h3>Demo: 执行表单验证方法的几种方式</h3>
    <el-form ref="formRef" :model="formData" :rules="baseRules">
      <el-form-item label="医生名称" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="医院" prop="hospital">
        <el-select v-model="formData.hospital">
          <el-option value="H00001" label="北京协和医院" />
          <el-option value="H00002" label="上海协和医院" />
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="formData.gender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
          <el-radio label="unknown">未知</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm1(formRef)">Submit</el-button>
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </el-form-item>
    </el-form>
    <hr />
    <MDViewer :raw-data="intro" />
  </div>
</template>
