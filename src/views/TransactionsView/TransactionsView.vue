<script setup lang="ts">
import { ref } from "vue";
import AddTransactionForm from "@/components/AddTransactionForm/AddTransactionForm.vue";
import TransactionsTable from "@/components/TransactionsTable/TransactionsTable.vue";
import BalanceCard from "@/components/BalanceCard/BalanceCard.vue";

const transactionTable = ref(null);
const balanceCard = ref(null);

function notifyTransactionSaved() {
  transactionTable.value?.refresh();
  balanceCard.value?.refresh();
}

function notifyTransactionDeleted() {
  balanceCard.value?.refresh();
}
</script>

<template>
  <h1 class="title">Transactions</h1>
  <div class="container-fluid">
    <div class="row mb-3 flex-lg-row-reverse">
      <div class="col-lg-6 mb-3">
        <BalanceCard ref="balanceCard" />
      </div>
      <div class="col-lg-6">
        <AddTransactionForm @transaction-saved="notifyTransactionSaved" />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 mb-3">
        <TransactionsTable
          ref="transactionTable"
          @transaction-deleted="notifyTransactionDeleted"
        />
      </div>
    </div>
  </div>
</template>
