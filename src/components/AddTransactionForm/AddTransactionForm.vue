<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import { getTransactionTypes, save } from "@/api/transactions/transactions.api";
import TransactionType from "@/api/transactions/transaction-type";
import type Toaster from "@/plugins/toast";

const toast = inject<Toaster>("toast");
const transactionTypes = ref<TransactionType[]>([]);
const transactionType = ref("");
const description = ref("");
const amount = ref("");
const date = ref(null);
const emit = defineEmits(["transactionSaved"]);

onMounted(() => {
  getTransactionTypes().then((response: TransactionType[]) => {
    transactionTypes.value = response;
  });
});

async function saveTransaction() {
  const transaction = {
    transactionType: transactionType.value,
    description: description.value,
    amount: amount.value,
    date: date.value,
  };
  await save(transaction);
  transactionType.value = "";
  description.value = "";
  amount.value = "";
  date.value = null;
  toast.success("Transaction saved");
  emit("transactionSaved");
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-3">Add transaction</h5>
      <form @submit.prevent="saveTransaction">
        <div class="form-floating mb-3">
          <select
            class="form-select"
            id="transactionType"
            v-model="transactionType"
          >
            <option value="" selected>Select the transaction type</option>
            <option
              v-for="transactionType in transactionTypes"
              :key="transactionType._id"
              :value="transactionType._id"
            >
              {{ transactionType.description }}
            </option>
          </select>
          <label for="transactionType">Transaction type</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="description"
            placeholder="Transaction description"
            v-model="description"
          />
          <label for="description">Description</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            id="amount"
            placeholder="Transaction amount"
            v-model="amount"
          />
          <label for="amount">Amount</label>
        </div>
        <div class="form-floating mb-3">
          <date-picker
            v-model="date"
            placeholder="date"
            :enableTimePicker="false"
            inputClassName="py-3"
          />
          <!--
          <input
            type="date"
            class="form-control"
            id="date"
            placeholder="Transaction date"
            v-model="date"
          />
          -->
          <!-- <label for="date">Date</label> -->
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>
  </div>
</template>
