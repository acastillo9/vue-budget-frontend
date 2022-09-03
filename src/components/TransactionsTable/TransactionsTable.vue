<script setup lang="ts">
import { ref } from "vue";
import { find, remove } from "@/api/transactions/transactions.api";
import Transaction from "@/api/transactions/transaction";
import { formatCurrency } from "@/helpers/formatter";

const transactions = ref<Transaction[]>([]);

async function findTransactions() {
  transactions.value = await find();
}
findTransactions();

async function deleteTransaction(id: string) {
  await remove(id);
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-3">Transactions</h5>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Amount</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction._id">
              <td
                :class="[
                  'amount',
                  {
                    incoming: transaction.transactionType === 'I',
                    outgoing: transaction.transactionType === 'O',
                  },
                ]"
              >
                {{ formatCurrency(transaction.amount) }}
              </td>
              <td>{{ transaction.description }}</td>
              <td>
                <ul class="d-flex">
                  <li>
                    <button class="btn">
                      <font-awesome-icon icon="fa-solid fa-pen" />
                    </button>
                  </li>
                  <li>
                    <button
                      class="btn"
                      @click="deleteTransaction(transaction._id)"
                    >
                      <font-awesome-icon icon="fa-solid fa-trash" />
                    </button>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table tr td {
  vertical-align: middle;

  &.amount {
    &.incoming {
      color: #198754;
    }
    &.outgoing {
      color: #dc3545;
    }
  }

  .fa-plus {
    color: green;
  }
  .fa-minus {
    color: red;
  }
  ul li {
    list-style: none;
  }
}
</style>
