<script setup>
import { marked } from 'marked'
import elFormApiDoc from '@/assets/form-api.md?raw'

</script>
<template>
  <div>
    <label>Demo list:</label>
    <ul class="no-marker">
      <li
        v-for="p in $router.options.routes
          .find(r => r.path === '/')
          ?.children.filter(r => r.path !== 'home') ?? []"
        :key="p.path">
        <router-link :data-test="p.path" :to="p.path">{{ p.meta?.title || p.path }}</router-link>
      </li>
    </ul>
    <div v-html="marked.parse(elFormApiDoc)"></div>
  </div>
</template>
<style lang="scss" scoped>
:deep table {
  td, th {
    vertical-align: top;
    padding: 2px 6px;
  }
}
</style>