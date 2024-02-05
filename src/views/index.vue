<script setup>
import RoutePageUl from '@/components/route-page-ul.vue'

</script>
<template>
  <div>
    <h3>Read list:</h3>
    <RoutePageUl
      :routes="$router.options.routes.find(r => r.name === 'Home')?.children"
      basePath="/" />
  </div>
</template>
