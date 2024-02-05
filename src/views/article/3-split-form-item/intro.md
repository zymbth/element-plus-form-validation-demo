# 表单项拆分

表单的一个表单项中，可能包含多个输入框、选择框等。表单项的校验结果可能受多个输入的影响，但也有可能仅受其中一部分或一个输入的影响。

这些场景下，仅对此表单项校验可能会导致无法定位错误、校验错误的样式被错误地应用到该表单项内所有输入框上。可参考这个 Demo [深层规则验证-对象](/#/demo/deep-rules-object)

## 基本拆分

假设有这样一个表单，数据、校验规则如下:

```js
const formData = reactive({
  // ...
  person: {
    name: null,
    age: null
  }
})
const baseRules = {
  person: [{ required: true, validator: validateFunc }],
}
function validateFunc(rule, value, callback) {
  // ...
}
```

表单项：

```html
<el-form-item prop="person" label="深层规则验证-对象">
  <el-input v-model="person.name" placeholder="请输入姓名" />
  <el-input v-model="person.age" placeholder="请输入年龄" />
  <!-- other inputs... -->
</el-form-item>
```

可拆分如下：

```html
<el-form-item prop="person.name" label="姓名">
  <el-input v-model="person.name" placeholder="请输入姓名" />
</el-form-item>
<el-form-item prop="person.age" label="年龄">
  <el-input v-model="person.age" placeholder="请输入年龄" />
</el-form-item>
```

校验规则更新：

```js
const baseRules = {
  'person.name': [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  'person.age': [{ required: true, message: '请输入年龄', trigger: 'blur' }],
}
```

## 表单项嵌套

表单验证的执行实际上是遍历验证表单组件中存在校验规则的表单项。如果表单项不存在(被动态移除了，例如，`v-if="false"`)，那就不会校验该表单项内。

嵌套的表单项，校验规则都会执行，它允许我们分别为父子表单项设置校验规则

```html
<el-form-item prop="person" label="深层规则验证-对象">
  <el-form-item prop="person.name" label="姓名">
    <el-input v-model="person.name" placeholder="请输入姓名" />
  </el-form-item>
  <el-form-item prop="person.age" label="年龄">
    <el-input v-model="person.age" placeholder="请输入年龄" />
  </el-form-item>
</el-form-item>
```

```js
const baseRules = {
  person: [{ required: true, validator: validateFunc1 }],
  'person.name': [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  'person.age': [{ required: true, message: '请输入年龄', trigger: 'blur' }],
}
```

与上面的基本拆分相比，仅多了一个非必要添加的上级表单项的校验，它和子表单项的校验是独立进行的。
既然如此，不考虑UI的话，完全可以让他表单项也独立出来，无需嵌套。

**注意**：所有无输入框的表单项，它的验证结果不会自动更新，需要手动执行验证方法。

```html
<el-form-item prop="person" label="深层规则验证-对象"></el-form-item>
<el-form-item prop="person.name" label="姓名">
  <el-input v-model="person.name" placeholder="请输入姓名" />
</el-form-item>
<el-form-item prop="person.age" label="年龄">
  <el-input v-model="person.age" placeholder="请输入年龄" />
</el-form-item>

```
