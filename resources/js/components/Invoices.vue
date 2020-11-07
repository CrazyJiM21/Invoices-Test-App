<template>
  <div>
    <div class="form-group">
      <router-link :to="{ name: 'create' }" class="btn btn-success"
        >Add Invoice</router-link
      >
    </div>
    <h1>Invoices</h1>
    <table v-if="invoices.length" class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>School Name</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Payment status</th>
          <th>Invoice link</th>
          <th>Payer name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(invoice, index) in invoices" :key="invoice.id">
          <td>{{ invoice.id }}</td>
          <td>{{ invoice.school_name }}</td>
          <td>{{ invoice.description }}</td>
          <td>${{ invoice.amount }}</td>
          <td>{{ invoice.status ? "Payment received" : "New" }}</td>
          <td>
            <a :href="`${invoiceLink}/${invoice.link}`" target="_blank">{{
              `${invoiceLink}/${invoice.link}`
            }}</a>
          </td>
          <td>{{ invoice.payer_name }}</td>
          <td>
            <a
              href="#"
              class="btn btn-sm btn-danger"
              v-on:click="deleteInvoice(invoice.id, index)"
            >
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>There isn't any created invoice</p>
    </div>
  </div>
</template>

<script>
import Request from "../utils/request";

export default {
  data() {
    return {
      invoices: [],
    };
  },
  props: {
    invoiceLink: {
      required: true,
      type: String,
    },
  },
  async mounted() {
    this.invoices = await Request.get("/api/invoices");
  },
  methods: {
    deleteInvoice(id, index) {
      if (confirm("Delete invoice?")) {
        Request.delete(`/api/invoices/${id}`).then(() => {
          this.invoices.splice(index, 1);
        });
      }
    },
  },
};
</script>

<style>
</style>