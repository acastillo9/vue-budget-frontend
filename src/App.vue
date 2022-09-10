<script setup lang="ts">
import { RouterView } from "vue-router";
import AppLayout from "@/layouts/AppLayout/AppLayout.vue";
</script>

<template>
  <ToastsContainer />
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>
