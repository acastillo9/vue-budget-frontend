<script setup lang="ts">
import { shallowRef, watch } from "vue";
import { useRoute, RouteMeta } from "vue-router";
import Empty from "@/layouts/EmptyLayout/EmptyLayout.vue";

const layout = shallowRef(Empty);
const route = useRoute();

async function loadLayout(meta: RouteMeta) {
  try {
    const component = await import(
      `@/layouts/${meta.layout}/${meta.layout}.vue`
    );
    layout.value = component?.default || Empty;
  } catch (e) {
    layout.value = Empty;
  }
}

watch(() => route.meta, loadLayout);
</script>

<template>
  <component :is="layout">
    <slot />
  </component>
</template>
