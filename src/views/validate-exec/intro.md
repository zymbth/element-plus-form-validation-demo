### 代码

#### 执行校验的几种写法

1. `validate` 回调函数

```js
function submitForm1(formEl) {
  if (!formEl) return
  formEl.validate((valid, invalidFields) => {
    if (valid) {
      ElMessage({ type: 'success', message: 'submit!' })
    } else {
      console.log('invalidFields: ', invalidFields)
      ElMessage({ type: 'error', message: 'error submit!' })
      return false
    }
  })
}
```

2. `validate` 期约

```js
function submitForm2(formEl) {
  if (!formEl) return
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
```

3. `async...await...`

```js
async function submitForm3(formEl) {
  if (!formEl) return
  let valid, invalidFields
  try {
    valid = await formEl.validate()
  } catch (error) {
    invalidFields = error
  }
  if (valid) {
    ElMessage({ type: 'success', message: 'submit!' })
  } else {
    console.log('invalidFields: ', invalidFields)
    ElMessage({ type: 'error', message: 'error submit!' })
    return false
  }
}
```

封装 `async...await...` 异常捕捉

```js
async function submitForm4(formEl) {
  if (!formEl) return
  const { resp: valid, err: invalidFields } = await asyncFuncWrapper(formEl.validate)
  if (valid) {
    ElMessage({ type: 'success', message: 'submit!' })
  } else {
    console.log('invalidFields: ', invalidFields)
    ElMessage({ type: 'error', message: 'error submit!' })
    return false
  }
}
async function asyncFuncWrapper(func, ...args) {
  try {
    const resp = await func(...args)
    return { resp }
  } catch (err) {
    return { err }
  }
}
```

#### 验证结果

上面的示例中，`valid` 标识验证是否通过，通过为 `true`，不通过为 `undefined`

`invalidFields` 标识验证未通过所在
