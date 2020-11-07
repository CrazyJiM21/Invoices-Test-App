<template>
  <div>
    <h1>Invoice</h1>
    <form @submit.prevent="pay()">
      <div class="card">
        <div class="card-header">Invoice #{{ invoice.id }}</div>
        <div class="card-body">
          <p><b>School name:</b> {{ invoice.school_name }}</p>
          <p><b>Description:</b> {{ invoice.description }}</p>
          <p v-if="invoice.status || paid">
            <b>Full name:</b> {{ invoice.payer_name }}
          </p>
          <div v-else class="form-group">
            <label class="control-label"><b>Full name:</b></label>
            <input type="text" class="form-control" v-model="payer_name" />
          </div>
          <h3>${{ invoice.amount }}</h3>
          <div class="form-group">
            <button class="btn btn-success" :disabled="paid">Pay</button>
            <span
              v-if="validation_errors && validation_errors.status"
              class="small error"
              >This invoice is already paid</span
            >
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Request from "../utils/request";

export default {
  data() {
    return {
      payer_name: "",
      paid: false,
      validation_errors: null,
    };
  },
  props: {
    invoice: {
      required: true,
      type: Object,
    },
  },
  mounted() {
    this.paid = this.invoice.status ? true : false;
  },
  methods: {
    pay() {
      if (this.paid) return;
      let newInvoice = this.invoice;
      newInvoice.payer_name = this.payer_name;
      Request.put(`/api/invoices/${newInvoice.id}`, newInvoice)
        .then((resp) => {
          this.paid = true;
        })
        .catch(({ response }) => {
          this.validation_errors = response.data.errors;
        });
    },
  },
};
</script>

<style>
.error {
  color: red;
}
</style>