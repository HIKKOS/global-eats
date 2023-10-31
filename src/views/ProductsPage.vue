<template>
  <div class="card-container">
    <Card class="card">
      <template #title>
        <div
          class="titleCard flex flex-wrap gap-2 align-items-center justify-content-between"
        >
          <span class="mt-3 mb-3 ml-3 text-xl font-bold text-900"
            >Products</span
          >
          <Button
            class="p-button-raised p-2 mr-3"
            @click="visible = true"
            label="Add product"
            style="background: #2a9d8f"
          />
        </div>
      </template>
      <template #content>
        <ProductsTableVue></ProductsTableVue>
      </template>
    </Card>
    <Dialog
      v-model:visible="visible"
      modal
      header="Create a new product"
      :style="{ width: '50vw' }"
    >
      <FormAddProduct
        :visible="visible"
        @close="visible = false"
      ></FormAddProduct>
    </Dialog>
  </div>
</template>

<script setup>
import Card from "primevue/card";
import ProductsTableVue from "../components/ProductsTable.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import FormAddProduct from "../components/FormAddProduct.vue";
import { ref } from "vue";

const visible = ref(false);
</script>
<style scoped>
.card-container {
  margin: 10px;
  min-height: 100%;
  min-width: 75%;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.custom-button {
  flex-grow: 1;
  margin: 0 5px;
}
.titleCard {
  background-color: #f8f9fa;
  border-radius: 10px;
}
.card {
  min-height: 100%;
  min-width: 100%;
  border-radius: 10px;
}

.field {
  border-radius: 10px;
}
</style>
