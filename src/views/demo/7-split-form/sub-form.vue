<script setup>
import { ref, computed } from 'vue'
import elementChinaAreaData from 'https://cdn.skypack.dev/element-china-area-data@5.0.2'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const regTelPhone = /(^((\+86)|(86))?(1[3-9])\d{9}$)|(^(0\d{2,3})-?(\d{7,8})$)/

const formRef = ref()
const formMail = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const baseRules = {
  reciever: [{ required: true, message: '请选择收件人', trigger: 'blur' }],
  recieveTel: [
    { required: true, message: '请输入收件号码' },
    { pattern: regTelPhone, message: '电话号码不正确' },
  ],
  'address.area': [
    {
      required: true,
      type: 'array',
      message: '请输入省市区',
      defaultField: { required: true, message: '区域码错误' },
    },
  ],
  'address.detail': [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
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
defineExpose({ resetForm, formRef })
</script>
<template>
  <el-form
    :model="formMail"
    ref="formRef"
    class="deep-rules-form"
    :rules="baseRules"
    label-position="right"
    label-width="80px">
    <el-form-item label="收件人" prop="reciever">
      <el-input v-model="formMail.reciever" style="width: 200px" />
    </el-form-item>
    <el-form-item label="收件号码" prop="recieveTel">
      <el-input v-model="formMail.recieveTel" placeholder="" style="width: 200px" />
    </el-form-item>
    <el-form-item label="收件地址" prop="address.area">
      <div>
        <el-cascader :options="elementChinaAreaData.regionData" v-model="formMail.address.area" />
      </div>
    </el-form-item>
    <el-form-item label="详细地址" prop="address.detail">
      <el-input v-model="formMail.address.detail" />
    </el-form-item>
  </el-form>
</template>
