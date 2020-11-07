<template>
  <div>
    <div class="panel panel-default">
      <div class="panel-heading"><h1>Create new invoice</h1></div>
      <div class="panel-body">
        <form @submit.prevent="saveForm()">
          <div class="row">
            <div class="col-12 form-group">
              <label class="control-label">School name</label>
              <input
                type="text"
                v-model="invoice.school_name"
                class="form-control"
              />
              <span
                v-if="validation_errors && validation_errors.school_name"
                class="small error"
                >{{ validation_errors.school_name[0] }}</span
              >
            </div>
          </div>
          <div class="row">
            <div class="col-12 form-group">
              <label class="control-label">Description</label>
              <textarea
                v-model="invoice.description"
                class="form-control"
              /></textarea>
              <span
                v-if="validation_errors && validation_errors.description"
                class="small error"
                >{{ validation_errors.description[0] }}</span
              >
            </div>
          </div>
          <div class="row">
            <div class="col-12 form-group">
              <label class="control-label">Amount</label>
              <input
                type="text"
                v-model="invoice.amount"
                class="form-control"
              />
              <span
                v-if="validation_errors && validation_errors.amount"
                class="small error"
                >{{ validation_errors.amount[0] }}</span
              >
            </div>
          </div>
          <div class="row">
            <div class="col-12 form-group">
              <button class="btn btn-success">Create</button>
              <router-link to="/" class="btn btn-primary">Cancel</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Request from "../utils/request";

export default {
  data() {
    return {
      invoice: {
        school_name: "",
        description: "",
        amount: "",
      },
      validation_errors: null,
    };
  },
  methods: {
    async saveForm() {
      Request.post("/api/invoices", this.invoice)
        .then((resp) => {
          this.$router.push({ path: "/" });
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