<script setup lang="ts">
import AddTransactionForm from "@/components/AddTransactionForm/AddTransactionForm.vue";
import TransactionsTable from "@/components/TransactionsTable/TransactionsTable.vue";
import BalanceCard from "@/components/BalanceCard/BalanceCard.vue";
</script>

<template>
  <h1 class="title">Transactions</h1>
  <div class="container-fluid">
    <div class="row mb-3">
      <div class="col-lg-6">
        <AddTransactionForm />
      </div>
      <div class="col-lg-6">
        <BalanceCard />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <TransactionsTable />
      </div>
    </div>
  </div>
</template>
