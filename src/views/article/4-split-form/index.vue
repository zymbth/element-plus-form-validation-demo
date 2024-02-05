<script setup>
import intro from './intro.md?raw'
import MDViewer from '@/components/md-viewer.vue'

</script>
<template>
  <MDViewer :raw-data="intro" />
</template>
