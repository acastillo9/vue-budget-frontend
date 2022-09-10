import mitt, { type Emitter } from "mitt";
import type { App } from "vue";
import ToastsContainer from "@/components/ToastsContainer/ToastsContainer.vue";

export type ToastMessage = {
  id: number;
  message: string;
  type: string;
  options?: {
    duration?: number;
  };
};

type Events = {
  "toast-message": ToastMessage;
};

export type Toaster = {
  emitter: Emitter<Events>;
  send(message: string, type: string): void;
  success(message: string): void;
  warning(message: string): void;
  info(message: string): void;
  error(message: string): void;
};

const emitter: Emitter<Events> = mitt<Events>();
let counter = 0;

const Toast = {
  install(app: App) {
    app.config.globalProperties.$toast = {
      emitter,
      send(message: string, type: string) {
        emitter.emit("toast-message", {
          id: ++counter,
          message,
          type,
        });
      },
      success(message: string) {
        this.send(message, "success");
      },
      warning(message: string) {
        this.send(message, "warning");
      },
      info(message: string) {
        this.send(message, "info");
      },
      error(message: string) {
        this.send(message, "danger");
      },
    };
    app.component("ToastsContainer", ToastsContainer);
    app.provide("toast", app.config.globalProperties.$toast);
  },
};

export default Toast;
