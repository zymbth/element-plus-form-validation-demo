# 表单验证方法（`validate`）的使用

下面介绍 `element-plus` 表单组件方法 `validate` 的使用，详情参考 [ElForm源码](https://github.com/element-plus/element-plus/blob/dev/packages/components/form/src/form.vue)

## 一、验证结果说明

`elForm.validate` 验证结果包括两部分

下面的示例中，分别使用 `valid`，`invalidFields` 自定义变量标识验证是否通过以及验证未通过所在

| 自定义变量 | 验证通过 | 验证未通过 |
| --- | --- | --- |
| `valid` | `true` | `false` \| `undefined` |
| `invalidFields` | `undefined` | `object`(`Record<string, Array>`) |

## 二、校验表单并获取验证结果

`elForm.validate` 方法支持两种方式获取校验结果:

- 一种是传入一个回调函数
- 另一种是返回一个 `Promise` 对象

详见 `ElForm` 源码或文末的源码片段

### 1. `validate` 回调函数

传递一个回调函数给 `elForm.validate` 方法，回调函数的参数有两个

```js
function submitForm(formEl) {
  if (!formEl) return
  formEl.validate((valid, invalidFields) => {
    if (valid) {
      // 校验通过，执行后续任务
    } else {
      // 校验未通过，错误处理
    }
  })
}
```

**注意**：验证未通过时，该方法不会抛出异常

### 2. `validate` 期约

处理 `elForm.validate()` 返回的期约，并获取验证结果：

```js
function submitForm(formEl) {
  if (!formEl) return
  formEl
    .validate()
    .then(valid => {
      // 校验通过，执行后续任务
    })
    .catch(invalidFields => {
      // 校验未通过，错误处理
    })
}
```

**注意**：`elForm.validate()` 返回的 `Promise` 如果未 `catch` 异常，验证未通过时会抛出错误，中断程序执行

### 使用 `async...await...` 获取验证结果

> 以下仅作示例，风格与喜好因人而异

不喜欢将业务代码写在回调函数中？对于上述两种方式，都可以结合 `async...await...` 语法 **“提取”** 出校验结果

- `async...await...` + `validate` 回调函数

传入回调函数给 `validate` 方法时，它返回的仍是一个期约，可以使用 `await` 等待异步验证完成

```js
async function submitForm(formEl) {
  if (!formEl) return
  let valid, invalidFields
  await formEl.validate((vd, err) => {
    valid = vd
    invalidFields = err
  })
  if (valid) {
    // 校验通过，执行后续任务
  } else {
    // 校验未通过，错误处理
  }
}
```

- `async...await...` + `validate` 期约

利用期约的特性，可以使用 `await` 等待异步验证完成

```js
async function submitForm(formEl) {
  if (!formEl) return
  let valid, invalidFields
  await formEl
    .validate()
    .then(vd => valid = vd)
    .catch(err => invalidFields = err)
  if (valid) {
    // 校验通过，执行后续任务
  } else {
    // 校验未通过，错误处理
  }
}
```

都用 `async...await...` 语法了，不想 `then/catch` 了？那就使用 `try/catch` 吧：

```js
async function submitForm(formEl) {
  if (!formEl) return
  let valid, invalidFields
  try {
    valid = await formEl.validate()
  } catch (error) {
    invalidFields = error
  }
  if (valid) {
    // 校验通过，执行后续任务
  } else {
    // 校验未通过，错误处理
  }
}
```

想去掉 `try/catch`？可如下封装 `async...await...` 的异常捕捉

```js
// 封装 `async...await...` 的异常捕捉
async function asyncFuncWrapper(func, ...args) {
  try {
    const resp = await func(...args)
    return { resp }
  } catch (err) {
    return { err }
  }
}

async function submitForm(formEl) {
  if (!formEl) return
  const { resp: valid, err: invalidFields } = await asyncFuncWrapper(formEl.validate)
  if (valid) {
    // 校验通过，执行后续任务
  } else {
    // 校验未通过，错误处理
  }
}
```

## 三、validate源码

> [ElForm源码](https://github.com/element-plus/element-plus/blob/dev/packages/components/form/src/form.vue)

第二部分中说到两种方法在源码中很清晰，可直接进入查看。此处截取 `validate` 方法相关源码，并去除ts相关语法：

```js
const validate = async callback => validateField(undefined, callback)

const doValidateField = async (props = []) => {
  if (!isValidatable.value) return false

  const fields = obtainValidateFields(props)
  if (fields.length === 0) return true

  let validationErrors = {}
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (fields) {
      validationErrors = { ...validationErrors, ...fields }
    }
  }

  if (Object.keys(validationErrors).length === 0) return true
  return Promise.reject(validationErrors)
}

const validateField = async (modelProps = [], callback) => {
  const shouldThrow = !isFunction(callback)
  try {
    const result = await doValidateField(modelProps)
    // When result is false meaning that the fields are not validatable
    if (result === true) callback?.(result)
    return result
  } catch (e) {
    if (e instanceof Error) throw e
    callback?.(false, e)
    return shouldThrow && Promise.reject(e)
  }
}
```

注意看 `validateField` 方法，存在有效的 `callback` 时，不会抛出异常
