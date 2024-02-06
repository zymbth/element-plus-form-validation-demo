### 说明

这个实例（[深层规则验证-数组](/#/demo/deep-rules-array)）中，邮寄地址数组的校验规则只能通过单项验证方式定义在表单项标签内，繁琐且不美观。可以将一个地址独立为一个子表单，在子表单内定义属于它的校验规则，就简洁很多了。

### 代码

```html
<script setup>
import { ref, reactive } from 'vue'
import elementChinaAreaData from 'https://cdn.skypack.dev/element-china-area-data@5.0.2'

const regTelPhone = /(^((\+86)|(86))?(1[3-9])\d{9}$)|(^(0\d{2,3})-?(\d{7,8})$)/

const count = ref(1)
const formRef = ref()
const subFormRef = ref()
const formData = reactive({
  noMail: undefined, // 不邮寄
  formMails: [
    {
      // 地址列表
      key: 0,
      reciever: '', // 收件人
      recieveTel: '', // 收件号码
      address: {
        // 收件地址
        area: [], // 地址区划列表
        detail: '', // 地址详情
      },
    },
  ],
})

const baseRules = {
  noMail: [{ type: 'boolean', required: true, message: '请选择是否邮寄' }],
}
const subFormRules = {
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

function addMail() {
  formData.formMails.push({
    key: count.value++,
    reciever: '',
    recieveTel: '',
    address: {
      area: [],
      detail: null,
    },
  })
}
function deleteMail(index) {
  formData.formMails.splice(index, 1)
}

async function submitForm(formEl) {
  if (!formEl) return
  let valid, invalidFields
  const forms = [formEl, ...subFormRef.value].filter(Boolean)
  await Promise.all(forms.map(form => form.validate()))
    .then(res => (valid = true))
    .catch(error => (invalidFields = error))
  // console.log({ valid, invalidFields })
  if (valid) {
    ElMessage({ type: 'success', message: '验证通过' })
  } else {
    ElMessage({ type: 'error', message: '验证失败' })
  }
}
function resetForm(formEl) {
  if (!formEl) return
  formEl.resetFields()
  subFormRef.value.forEach(r => r.resetFields())
}
</script>
<template>
  <el-form
    :model="formData"
    ref="formRef"
    class="deep-rules-form"
    :rules="baseRules"
    label-position="right"
    label-width="80px">
    <el-form-item label="是否邮寄" prop="noMail">
      <el-radio-group v-model="formData.noMail">
        <el-radio-button :label="false">是</el-radio-button>
        <el-radio-button :label="true">否</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <!-- 邮寄地址 -->
    <el-form-item
      label-width="0"
      prop="formMails"
      :rules="[{ required: !formData.noMail, type: 'array', message: '请添加邮寄地址' }]">
      <div
        v-show="!formData.noMail"
        v-for="(formMail, idx) in formData.formMails"
        :key="formMail.key"
        class="address-container">
        <el-popconfirm title="确定删除吗？" @confirm="deleteMail(idx)">
          <template #reference>
            <div class="btn-delete">×</div>
          </template>
        </el-popconfirm>
        <el-form
          :model="formData.formMails[idx]"
          ref="subFormRef"
          :rules="subFormRules"
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
              <el-cascader
                :options="elementChinaAreaData.regionData"
                v-model="formMail.address.area" />
            </div>
          </el-form-item>
          <el-form-item label="详细地址" prop="address.detail">
            <el-input v-model="formMail.address.detail" />
          </el-form-item>
        </el-form>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button v-show="!formData.noMail" @click="addMail()" type="primary">增加地址</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>
```
