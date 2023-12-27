<script setup>
const formAttrs = [
  { name: 'model', intro: '表单数据对象', type: 'object', default: '' },
  { name: 'rules', intro: '表单验证规则', type: 'object(FormRules)', default: '' },
  {
    name: 'hide-required-asterisk',
    intro: '是否隐藏必填字段标签旁边的红色星号',
    type: 'boolean',
    default: 'false',
  },
  { name: 'require-asterisk-position', intro: '星号的位置', type: 'enum', default: 'left' },
  { name: 'show-message', intro: '是否显示校验错误信息', type: 'boolean', default: 'true' },
  {
    name: 'inline-message',
    intro: '是否以行内形式展示校验信息',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'status-icon',
    intro: '是否在输入框中显示校验结果反馈图标',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'validate-on-rule-change',
    intro: '是否在 rules 属性改变后立即触发一次验证',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'scroll-to-error',
    intro: '当校验失败时，滚动到第一个错误表单项',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'scroll-into-view-options(v2.3.2)',
    intro: '当校验有失败结果时，滚动到第一个失败的表单项目 可通过 scrollIntoView 配置',
    type: 'object/boolean',
    default: '',
  },
]
const formEvents = [{ name: 'validate', intro: '任一表单项被校验后触发', type: 'Function' }]
const formExposes = [
  { name: 'validate', intro: '对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise', type: 'Function' },
  { name: 'validateField', intro: '验证具体的某个字段', type: 'Function' },
  { name: 'resetFields', intro: '重置该表单项，将其值重置为初始值，并移除校验结果', type: 'Function' },
  { name: 'scrollToField', intro: '滚动到指定的字段', type: 'Function' },
  { name: 'clearValidate', intro: '清理某个字段的表单验证信息', type: 'Function' },
]
const formItemAttrs = [
  { name: 'prop', intro: "model 的键名。 它可以是一个属性的值(如 a.b.0 或 [a', 'b', '0'])。 在定义了 validate、resetFields 的方法时，该属性是必填的", type: 'string/string[]', default: '' },
  { name: 'required', intro: '是否为必填项，如不设置，则会根据校验规则确认', type: 'boolean', default: '' },
  { name: 'rules', intro: '表单验证规则, 具体配置见下表, 更多内容可以参考async-validator', type: 'object', default: '' },
  { name: 'error', intro: '表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息', type: 'string', default: '' },
  { name: 'show-message', intro: '是否显示校验错误信息', type: 'boolean', default: 'true' },
  { name: 'inline-message', intro: '是否在行内显示校验信息', type: 'string/boolean', default: '""' },
  { name: 'validate-status', intro: 'formitem 校验的状态', type: 'enum', default: '' },
]
const formItemRule = [{ name: 'trigger', intro: '验证逻辑的触发方式', type: 'enum', default: '' }]
const formItemSlots = [
  { name: 'error', intro: '验证错误信息的显示内容', type: 'object' },
]
const formItemExposes = [
  { name: 'validateMessage', intro: '校验消息', type: 'object' },
  { name: 'validateState', intro: '校验状态', type: 'object' },
  { name: 'validate', intro: '验证表单项', type: 'Function' },
  { name: 'resetField', intro: '对该表单项进行重置，将其值重置为初始值并移除校验结果', type: 'Function' },
  { name: 'clearValidate', intro: '移除该表单项的校验结果', type: 'Function' },
]

const tbs = [
  { title: 'Form Attributes', list: formAttrs },
  { title: 'Form 事件', list: formEvents },
  { title: 'Form Exposes', list: formExposes },
  { title: 'FormItem Attributes', list: formItemAttrs },
  { title: 'FormItemRule', list: formItemRule },
  { title: 'FormItem Slots', list: formItemSlots },
  { title: 'FormItem Exposes', list: formItemExposes },
]
</script>
<template>
  <div>
    <h3>Demos:</h3>
    <ul class="no-marker">
      <li
        v-for="p in $router.options.routes
          .find(r => r.path === '/')
          ?.children.filter(r => r.path !== 'home') ?? []"
        :key="p.path">
        <router-link :data-test="p.path" :to="p.path">{{ p.meta?.title || p.path }}</router-link>
      </li>
    </ul>
    <h3>
      Element Plus 表单验证相关API (详见<a
        href="https://element-plus.org/zh-CN/component/form.html"
        target="_blank"
        >官网</a
      >)
    </h3>
    <p>Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。</p>
    <p>
      <code>Form</code> 组件提供了表单验证的功能，只需为
      <code>rules</code> 属性传入约定的验证规则，并将 <code>form-Item</code> 的
      <code>prop</code> 属性设置为需要验证的特殊键值即可。更多高级用法可参考
      <a href="https://github.com/yiminghe/async-validator" target="_blank">async-validator</a>。
    </p>
    <template v-for="tb in tbs">
      <h4>{{ tb.title }}</h4>
      <table border="1px" rules="all">
        <thead>
          <tr>
            <th v-for="(_, th) in tb.list[0]">{{ th }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in tb.list">
            <td v-for="td in row">{{ td }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>
