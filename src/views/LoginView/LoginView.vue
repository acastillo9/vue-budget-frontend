<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const username = ref("");
const password = ref("");
const error = ref("");

function signIn() {
  const authStore = useAuthStore();
  authStore.login(username.value, password.value).catch((errorMessage) => {
    error.value = errorMessage;
  });
}
</script>

<template>
  <div class="vh-100 d-flex justify-content-center align-items-center p-3">
    <div class="card">
      <div class="card-body">
        <h1>Budget</h1>
        <div
          v-if="error"
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {{ error }}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            @click="() => (error = '')"
          ></button>
        </div>
        <form @submit.prevent="signIn">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="username"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
            />
          </div>
          <button type="submit" class="btn btn-primary">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 300px;
  max-width: 100%;
}
</style>
