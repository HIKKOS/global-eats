<template>
  <div class="card-container">
    <Card class="card">
      <template #title>
        <div
          class="titleCard flex flex-wrap gap-2 align-items-center justify-content-between"
        >
          <span class="mt-3 mb-3 ml-3 text-xl font-bold text-900"
            >Categories</span
          >
          <Button
            class="p-button-raised p-2 mr-3"
            @click="visible = true"
            label="Add category"
            style="background: #2a9d8f"
          />
        </div>
      </template>
      <template #content>
        <Categories></Categories>
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
  <Dialog
    v-model:visible="visible"
    modal
    header="Create a new category"
    :style="{ width: '50vw' }"
  >
    <AddCategorie :visible="visible" @close="visible = false"></AddCategorie>
  </Dialog>
</template>

<script setup>
import Card from "primevue/card";
import Categories from "../components/CategoriesTable.vue";
import Button from "primevue/button";
import AddCategorie from "../components/FormAddCategorie.vue";
import Dialog from "primevue/dialog";

import { ref } from "vue";

const visible = ref(false);
</script>
<style scoped>
.card-container {
  margin: 10px;
  min-height: 100%;
  min-width: 75%;
}

.card {
  min-height: 100%;
  min-width: 100%;
}
</style>
