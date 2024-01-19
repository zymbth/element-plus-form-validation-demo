<script setup>
import { marked } from 'marked'
import elFormApiDoc from '@/assets/form-api.md?raw'
</script>
<template>
  <div v-html="marked.parse(elFormApiDoc)"></div>
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
