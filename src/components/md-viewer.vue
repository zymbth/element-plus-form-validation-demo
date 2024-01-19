<script setup>
import { onMounted } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js/lib/core'

/**
 * markdown file viewer
 *
 * @prop {string} rawData - markdown file content
 */

const props = defineProps(['rawData'])

onMounted(() => {
  document.querySelectorAll('pre code').forEach(el => {
    hljs.highlightElement(el)
  })
})

</script>
<template>
  <div v-html="marked.parse(rawData)" />
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
