<script setup lang="ts">
import { shallowRef, watch, ref } from "vue";
import { useRoute, RouteMeta } from "vue-router";
import EmptyLayout from "@/layouts/EmptyLayout/EmptyLayout.vue";

const loading = ref(true);
const layout = shallowRef(EmptyLayout);
const route = useRoute();

async function loadLayout(meta: RouteMeta) {
  try {
    const component = await import(
      `@/layouts/${meta.layout}/${meta.layout}.vue`
    );
    layout.value = component?.default || EmptyLayout;
  } catch (e) {
    layout.value = EmptyLayout;
  } finally {
    loading.value = false;
  }
}

watch(() => route.meta, loadLayout);
</script>

<template>
  <component v-if="!loading" :is="layout">
    <slot />
  </component>
</template>
