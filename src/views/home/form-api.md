# Element Plus 表单验证相关API (详见[官网](https://element-plus.org/zh-CN/component/form.html))

Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。

`Form` 组件提供了表单验证的功能，只需为 `rules` 属性传入约定的验证规则，并将 `form-Item` 的 `prop` 属性设置为需要验证的特殊键值即可。更多高级用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。

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

## Form API

### Form Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| model | 表单数据对象 | `object`(`Record<string, any>`) | — |
| rules | 表单验证规则 | `object`(`FormRules`) | — |
| hide-required-asterisk | 是否隐藏必填字段标签旁边的红色星号 | `boolean` | false |
| require-asterisk-position | 星号的位置 | `enum`(`'left' \| 'right'`) | left |
| show-message | 是否显示校验错误信息 | `boolean` | true |
| inline-message | 是否以行内形式展示校验信息 | `boolean` | false |
| status-icon | 是否在输入框中显示校验结果反馈图标 | `boolean` | false |
| validate-on-rule-change | 是否在 `rules` 属性改变后立即触发一次验证 | `boolean` | true |
| scroll-to-error | 当校验失败时，滚动到第一个错误表单项 | `boolean` | false |
| scroll-into-view-options ^(2.3.2) | 当校验有失败结果时，滚动到第一个失败的表单项目 可通过 [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) 配置 | `object`(`Record<string, any>`)/`boolean` | — |

### Form Events

| Name | Description | Type |
| --- | --- | --- |
| validate | 任一表单项被校验后触发 | `Function`(`(prop: FormItemProp, isValid: boolean, message: string) => void`) |

### Form Exposes

| Name | Description | Type |
| --- | --- | --- |
| validate | 对整个表单的内容进行验证。 接收一个回调函数，或返回 `Promise` | `Function`(`(callback?: FormValidateCallback) => Promise<void>`) |
| validateField | 验证具体的某个字段 | `Function`(`(props?: Arrayable<FormItemProp> \| undefined, callback?: FormValidateCallback \| undefined) => FormValidationResult`) |
| resetFields | 重置该表单项，将其值重置为初始值，并移除校验结果 | `Function`(`(props?: Arrayable<FormItemProp> \| undefined) => void`) |
| scrollToField | 滚动到指定的字段 | `Function`(`(prop: FormItemProp) => void`) |
| clearValidate | 清理某个字段的表单验证信息 | `Function`(`(props?: Arrayable<FormItemProp> \| undefined) => void`) |

## FormItem API

### FormItem Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prop | model 的键名。 它可以是一个属性的值(如 `a.b.0` 或 `[a', 'b', '0']`)。 在定义了 `validate`、`resetFields` 的方法时，该属性是必填的 | `string` | — |
| required | 是否为必填项，如不设置，则会根据校验规则确认 | `boolean` | — |
| rules | 表单验证规则, 具体配置见下表, 更多内容可以参考 [async-validator](https://github.com/yiminghe/async-validator). | `object`(`Arrayable<FormItemRule>`) | — |
| error | 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息 | `string` | — |
| show-message | 是否显示校验错误信息 | `boolean` | true |
| inline-message | 是否在行内显示校验信息 | `string`/`boolean` | '' |
| validate-status | formitem 校验的状态 | `enum`(`'' \| 'error' \| 'validating' \| 'success'`) | — |

#### FormItemRule

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| trigger | 验证逻辑的触发方式 | `enum`(`'blur' \| 'change'`) | — |

> Tips:
>
> If you don't want to trigger the validator based on input events, set the `validate-event` attribute as `false` on the corresponding input type components (`<el-input>`, `<el-radio>`, `<el-select>`, ...).

### FormItem Slots

| Name | Description | Type |
| --- | --- | --- |
| error | 验证错误信息的显示内容 | `object`(`{ error: string }`) |

### FormItem Exposes

| Name | Description | Type |
| --- | --- | --- |
| validateMessage | 校验消息 | `object`(`Ref<string>`) |
| validateState | 校验状态 | `object`(`Ref<'' \| 'error' \| 'validating' \| 'success'>`) |
| validate | 验证表单项 | `Function`(`(trigger: string, callback?: FormValidateCallback \| undefined) => FormValidationResult`) |
| resetField | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | `Function`(`() => void`) |
| clearValidate | 移除该表单项的校验结果 | `Function`(`() => void`) |
