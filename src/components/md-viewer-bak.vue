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
const isCollapsed = ref(true)

onMounted(() => {
  // isCollapsed.value
  console.log(getComputedStyle(mdViewerRef.value).height)
  mdViewerRef.value.querySelectorAll('pre code').forEach(el => {
    hljs.highlightElement(el)
  })
})

function triggleMask() {
  isCollapsed.value = !isCollapsed.value
}
</script>
<template>
  <div :class="['rc-info', { 'is-collapse': isCollapsed }]">
    <!-- <font-awesome-icon
      class="icon-link icon-see-more"
      icon="angles-down"
      size="xl"
      :style="{ transform: !isCollapsed ? 'rotate(180deg)' : 'unset' }"
      @click="triggleMask()" /> -->
    <div class="rc-info-wrap">
      <div ref="mdViewerRef" class="markdown-body" v-html="marked.parse(rawData)" />
    </div>
    <div class="see-more-mask" @click="triggleMask()">
      <p>
        <span v-if="isCollapsed">Click to see full data</span>
        <span v-else>Click to collapse table</span>
        <!-- <font-awesome-icon
            icon="angles-down"
            size="1x"
            :style="{ marginLeft: '4px', transform: !isCollapsed ? 'rotate(180deg)' : 'unset' }" /> -->
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep table {
  td,
  th {
    vertical-align: top;
    padding: 2px 6px;
  }
}
// .markdown-body.is-collapse {
//   max-height: 200px;
// }

.rc-info {
  position: relative;
  overflow: auto;
}
.icon-see-more {
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s;
}
.rc-info-wrap {
  display: flex;
  column-gap: 20px;
  font-size: 14px;
  min-width: 1000px;
}
.rc-info.is-collapse .rc-info-wrap {
  max-height: 200px;
  overflow-y: hidden;
}
.see-more-mask {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 16px;
  height: 50px;
  color: #666;
  cursor: pointer;
  user-select: none;
}
.rc-info.is-collapse .see-more-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  z-index: 3000;
  > p {
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:hover > p {
    opacity: 1;
  }
}
</style>
