<script setup lang="ts">
import { inject, ref } from "vue";
import type { ToastMessage, Toaster } from "@/plugins/toast";

type ToastData = ToastMessage & {
  animateFn(timestamp: number): void;
  start?: number;
  elapsed?: number;
  requestAnimationFrame?: number;
};

const toast = inject<Toaster>("toast");
const toasts = ref<ToastData[]>([]);
const duration = 5000;
const backgroundColor = ref<{ [index: string]: string }>({
  success: "text-bg-success",
  warning: "text-bg-warning",
  info: "text-bg-info",
  error: "text-bg-danger",
});

toast?.emitter.on("toast-message", (toastMessage: ToastMessage) => {
  addToast(toastMessage);
});

function addToast(toast: ToastMessage) {
  const toastData: ToastData = {
    ...toast,
    options: {
      duration,
      ...toast.options,
    },
    animateFn: function (timestamp: number) {
      if (!this.start) {
        this.start = this.elapsed ? timestamp - this.elapsed : timestamp;
      }
      this.elapsed = timestamp - this.start;
      if (
        this.elapsed <
        (this.options && this.options.duration
          ? this.options.duration
          : duration)
      ) {
        toastData.requestAnimationFrame = requestAnimationFrame((timestamp) =>
          this.animateFn(timestamp)
        );
      } else {
        toasts.value = toasts.value.filter((t) => t.id !== this.id);
      }
    },
  };
  toastData.requestAnimationFrame = requestAnimationFrame((timestamp) =>
    toastData.animateFn(timestamp)
  );
  toasts.value.push(toastData);
}

function removeToast(toastId: number) {
  const toastData = toasts.value.find((t) => t.id === toastId);
  if (toastData && toastData.requestAnimationFrame) {
    cancelAnimationFrame(toastData.requestAnimationFrame);
    toasts.value = toasts.value.filter((t) => t.id !== toastId);
  }
}

function pauseToast(toastId: number) {
  const toastData = toasts.value.find((t) => t.id === toastId);
  if (toastData && toastData.requestAnimationFrame) {
    cancelAnimationFrame(toastData.requestAnimationFrame);
    toastData.start = undefined;
  }
}

function resumeToast(toastId: number) {
  const toastData = toasts.value.find((t) => t.id === toastId);
  if (toastData && toastData.animateFn) {
    toastData.requestAnimationFrame = requestAnimationFrame((timestamp) =>
      toastData.animateFn(timestamp)
    );
  }
}
</script>

<template>
  <div class="toast-container position-fixed end-0">
    <TransitionGroup name="toasts" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast show mb-1', backgroundColor[toast.type]]"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        @mouseover="() => pauseToast(toast.id)"
        @mouseleave="() => resumeToast(toast.id)"
      >
        <div class="toast-body">{{ toast.message }}</div>
        <button
          type="button"
          class="btn-close btn-close-white"
          aria-label="Close"
          @click="() => removeToast(toast.id)"
        ></button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
.toast {
  position: relative;

  .btn-close {
    position: absolute;
    right: 5px;
    top: 11px;
    color: #ffffff;
  }
}
.toasts-move,
.toasts-enter-active,
.toasts-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.toasts-enter-from,
.toasts-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}
</style>
