<script setup lang="ts">
import { computed, ref } from "vue";
import { formatCurrency } from "@/helpers/formatter";
import { getBalance } from "@/api/transactions/transactions.api";

const balance = ref(0);

const formatedBalance = computed(() => {
  return formatCurrency(balance.value);
});

getBalance().then((balanceResponse) => {
  balance.value = balanceResponse;
});
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-3">Balance</h5>
      <p class="hg-balance">{{ formatedBalance }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hg-balance {
  font-size: 38px;
  font-weight: bold;
}
</style>
