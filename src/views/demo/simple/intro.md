### 代码

template:

```html
<el-form ref="formRef" :model="formData" :show-message="false">
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
```

setup:

```js
import { ref, reactive } from 'vue'
import { asyncFuncWrapper } from '@/utils/utils'

const formRef = ref()
const formData = reactive({
  name: '',
  hospital: '',
  gender: '',
})

async function submitForm(formEl) {
  if (!formEl) return
  const { resp: ck, err } = await asyncFuncWrapper(formEl.validate)
  if (!ck) {
    ElMessage({ type: 'error', message: 'error submit!' })
    return
  }
  ElMessage({ type: 'success', message: 'submit!' })
}
function resetForm(formEl) {
  if (!formEl) return
  formEl.resetFields()
}
```
