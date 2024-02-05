### 说明

只做必填校验，不定义校验规则并绑定到表单。

默认会显示校验错误信息，注意，这种情况下，会显示默认的英文（xxx is required），elementplus国际化无用，应该是async-validator中返回的。

英文提示可以通过设置 `:show-message="false"` 隐藏。但是，这种情况下，在用户看来，未校验通过的表单项只能通过校验失败的样式（element-plus输入框、选择框边框变红）来定位。如果表单项中使用的不是这些组件，那么只能通过在校验失败后消息提示给用户，并让用户自行定位。

element-plus 对于未校验通过的表单项添加了 `is-error` 类，可以利用它，根据自己的项目需求做一个统一的校验失败样式（例如label变红、label下加下标箭头等等）。

element-plus 未校验失败样式：

```css
.el-form-item.is-error .el-input__wrapper,
.el-form-item.is-error .el-input__wrapper.is-focus,
.el-form-item.is-error .el-input__wrapper:focus,
.el-form-item.is-error .el-input__wrapper:hover,
.el-form-item.is-error .el-select__wrapper,
.el-form-item.is-error .el-select__wrapper.is-focus,
.el-form-item.is-error .el-select__wrapper:focus,
.el-form-item.is-error .el-select__wrapper:hover,
.el-form-item.is-error .el-textarea__inner,
.el-form-item.is-error .el-textarea__inner.is-focus,
.el-form-item.is-error .el-textarea__inner:focus,
.el-form-item.is-error .el-textarea__inner:hover {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}
```

### 代码

template:

```html
<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

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
</template>
<style>
.simple-form .el-form-item.is-error .el-form-item__label {
  color: var(--el-color-danger);
  font-weight: bold;
}
</style>
```
