<template>
  <div class="card-container">
    <template>
      <div class="card">
        <Carousel
          :value="products"
          :numVisible="3"
          :numScroll="1"
          :responsiveOptions="responsiveOptions"
        >
          <template #item="slotProps">
            <div
              class="border-1 surface-border border-round m-2 text-center py-5 px-3"
            >
              <div class="mb-3">
                <img
                  :src="'https://primefaces.org/cdn/primevue/images/product/chakra-bracelet.jpg'"
                  :alt="slotProps.data.name"
                  class="w-6 shadow-2"
                />
              </div>
              <div>
                <h4 class="mb-1">{{ slotProps.data.name }}</h4>
                <h6 class="mt-0 mb-3">${{ slotProps.data.price }}</h6>
                <Tag
                  :value="slotProps.data.inventoryStatus"
                  :severity="getSeverity(slotProps.data.inventoryStatus)"
                />
                <div class="mt-5">
                  <Button icon="pi pi-search" rounded class="mr-2" />
                  <Button
                    icon="pi pi-star-fill"
                    rounded
                    severity="success"
                    class="mr-2"
                  />
                  <Button icon="pi pi-cog" rounded severity="help" />
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </template>

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
import { ref, onMounted } from "vue";

import Button from "primevue/button";
import Dialog from "primevue/dialog";
import FormAddProduct from "../components/FormAddProduct.vue";

const products = ref();
onMounted(() => {
  [
    { name: "pesi", price: 12, inventoryStatus: "INSTOCK" },
    { name: "pesi", price: 12, inventoryStatus: "INSTOCK" },
    { name: "pesi", price: 12, inventoryStatus: "INSTOCK" },
    { name: "pesi", price: 12, inventoryStatus: "INSTOCK" },
  ].forEach((data) => (products.value = data.slice(0, 9)));
});

const responsiveOptions = ref([
  {
    breakpoint: "1199px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "991px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 1,
    numScroll: 1,
  },
]);

const getSeverity = (status) => {
  switch (status) {
    case "INSTOCK":
      return "success";

    case "LOWSTOCK":
      return "warning";

    case "OUTOFSTOCK":
      return "danger";

    default:
      return null;
  }
};

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

.card {
  min-height: 100%;
  min-width: 100%;
}

.field {
  border-radius: 10px;
}
</style>
