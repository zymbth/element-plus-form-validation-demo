### 代码

template:

```html
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
    <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
    <el-button @click="resetForm(formRef)">Reset</el-button>
  </el-form-item>
</el-form>
```

setup:

```javascript
import { ref, reactive } from 'vue'

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

function submitForm(formEl) {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      ElMessage({ type: 'success', message: 'submit!' })
    } else {
      ElMessage({ type: 'error', message: 'error submit!' })
      return false
    }
  })
}
function resetForm(formEl) {
  if (!formEl) return
  formEl.resetFields()
}
```
