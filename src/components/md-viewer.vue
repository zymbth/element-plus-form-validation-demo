<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js/lib/core'

/**
 * markdown file viewer
 *
 * @prop {string} rawData - markdown file content
 * @example
 * // 引入组件及markdown文档raw数据
 * import intro from './intro.md?raw'
 * import MDViewer from '@/components/md-viewer.vue'
 * // 组件属性绑定
 * <MDViewer :raw-data="intro" />
 */

const props = defineProps(['rawData'])

const mdViewerRef = ref()

onMounted(() => {
  mdViewerRef.value.querySelectorAll('pre code').forEach(el => {
    hljs.highlightElement(el)
  })
})

</script>
<template>
  <div ref="mdViewerRef" class="markdown-body" v-html="marked.parse(rawData)" />
</template>
<style lang="scss" scoped>
:deep table {
  td,
  th {
    vertical-align: top;
    padding: 2px 6px;
  }
}
</style>
