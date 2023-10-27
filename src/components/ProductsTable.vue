<template>
  <DataTable
    :value="products"
    class="table"
    id="prodtable"
    paginator
    :rows="5"
    removableSort
  >
    <Column class="header" header="Image">
      <template #body="slotProps">
        <img
          :src="`${
            slotProps.data?.images[0] ??
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
          }`"
          class="w-6rem shadow-2 border-round"
        />
      </template>
    </Column>
    <Column sortable field="productName" header="Name" />

    <Column />
    <Column field="category.categoryName" header="Category" />
    <Column sortable field="stock" header="Stock" />
    <Column field="price" header="Price" />
    <Column header="Actions" style="width: 120px">
      <template #body="rowData">
        <Button
          icon="pi pi-pencil"
          style="background-color: #4bb6b7"
          class="px-3 py-2 mr-1"
          @click="editProduct(rowData.data)"
        />
        <Button
          icon="pi pi-trash"
          style="background-color: #9a031e"
          class="px-3 py-2 mr-1"
          @click="showDeleteConfirmation(rowData.data.id)"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog
    v-model:visible="isVisibleEditDialog"
    modal
    header="Edit a product"
    :style="{ width: '50vw' }"
  >
    <form @submit.prevent="saveProductChanges">
      <div class="grid formgrid">
        <div class="field col-12 md:col-6">
          <FileUpload
            id="image"
            mode="basic"
            accept="image/*"
            :maxFileSize="1000000"
            v-model="editedProduct.image"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full px-5 py-6 border-round"
            placeholder="Image"
          />
          <input
            type="number"
            id="stock"
            v-model="editedProduct.stock"
            class="w-full p-2 mt-2 text-base border-solid outline-none appearance-none text-color surface-overlay border-1 surface-border border-round focus:border-primary"
            placeholder="Stock"
          />
        </div>
        <div class="field col-12 md:col-6">
          <input
            type="text"
            id="productName"
            v-model="editedProduct.productName"
            class="w-full p-2 py-3 text-base border-solid outline-none appearance-none text-color surface-overlay border-1 surface-border border-round focus:border-primary"
            placeholder="Product name"
          />
          <select
            id="categoryId"
            v-model="editedProduct.categoryId"
            class="w-full p-2 py-3 mt-2 text-base border-solid outline-none text-color surface-overlay border-1 surface-border border-round focus:border-primary"
            placeholder="Category"
          >
            <option
              v-bind:key="categorie.id"
              v-for="categorie in categories"
              :value="categorie.id"
            >
              {{ categorie.categoryName }}
            </option>
          </select>
          <input
            type="number"
            id="price"
            v-model="editedProduct.price"
            class="w-full p-2 mt-2 text-base border-solid outline-none appearance-none text-color surface-overlay border-1 surface-border border-round focus:border-primary"
            placeholder="Price"
          />
        </div>
        <div class="field col-12">
          <textarea
            id="description"
            v-model="editedProduct.description"
            class="w-full p-2 text-base border-solid outline-none appearance-none text-color surface-overlay border-1 surface-border border-round focus:border-primary"
            placeholder="Description"
          ></textarea>
        </div>
      </div>
      <div class="flex">
        <Button
          @click="closeForm"
          type="cancel"
          class="w-full mr-2 justify-content-center"
          style="background-color: #183045"
          >Cancel</Button
        >
        <Button
          type="submit"
          @click="saveProductChanges"
          class="w-full ml-2 justify-content-center"
          style="background-color: #2a9d8f"
          >Confirm edit</Button
        >
      </div>
    </form>
  </Dialog>
  <Dialog v-model:visible="deleteConfirmationVisible" modal>
    <div>
      <p>¿Estás seguro de que deseas eliminar el producto?</p>
      <br />
    </div>
    <div class="flex">
      <Button
        class="w-full mr-2 justify-content-center"
        style="background-color: #183045"
        label="Cancelar"
        @click="cancelDelete"
      />
      <Button
        class="w-full ml-2 justify-content-center"
        style="background-color: #2a9d8f"
        label="Confirmar"
        @click="confirmDelete"
      />
    </div>
  </Dialog>
</template>

<script>
import axios from "axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import FileUpload from "primevue/fileupload";

export default {
  components: {
    DataTable,
    Column,
    Button,
    Dialog,
    FileUpload,
  },
  data() {
    return {
      deleteConfirmationVisible: false,
      isVisibleEditDialog: false,
      productToDeleteId: null,
      productToDeleteName: "",
      products: [],
      count: 0,
      visible: false,
      editedProduct: {
        id: null,
        productName: "",
        stock: 0,
        price: 0,
        image: null,
        description: "",
        categoryId: "",
        status: true,
      },
      categories: [
        {
          id: 0,
          categoryName: "",
          status: true,
        },
      ],
    };
  },
  created() {
    this.getProducts();
    this.getCategories();
  },
  methods: {
    async getProducts() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/products?limit=100&page=1"
        );
        this.products = response.data.products;
        console.log(this.products);
        this.count = response.data.count;
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    },
    async getCategories() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories"
        );
        this.categories = response.data.categories;
        this.count = response.data.count;
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
      console.log(this.categories);
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`);
        this.getProducts();
      } catch (error) {
        console.error(`Error al eliminar el producto con ID ${id}:`, error);
      }
    },
    showDeleteConfirmation(id, productName) {
      this.productToDeleteId = id;
      this.productToDeleteName = productName;
      this.deleteConfirmationVisible = true;
    },
    cancelDelete() {
      this.productToDeleteId = null;
      this.deleteConfirmationVisible = false;
    },
    async confirmDelete() {
      if (this.productToDeleteId) {
        await this.deleteProduct(this.productToDeleteId);
        this.productToDeleteId = null;
        this.deleteConfirmationVisible = false;
      }
    },
    async editProduct(product) {
      this.isVisibleEditDialog = true;
      this.editedProduct = { ...product };
      await this.onConfirmEdit(this.editedProduct.id);
    },
    async postProuct() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/products",
          this.editedProduct
        );
        if (response.status === 201) {
          this.getProducts();
          this.isVisibleEditDialog = false;
        } else {
          console.error("Error al crear el producto:", response.data.msg);
        }
      } catch (error) {
        console.error("Error al crear el producto:", error);
      }
    },

    async saveProductChanges() {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/products/${this.editedProduct.id}`,
          this.editedProduct
        );
        if (response.status === 204) {
          this.getProducts();
          this.isVisibleEditDialog = false;
        } else {
          console.error("Error al actualizar el producto:", response.data.msg);
        }
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      }
    },
    closeEdit() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.table {
  min-height: 100%;
  min-width: 100%;
  max-width: 100%;
  max-height: 100%;
}
.header {
  background-color: #ffaaff;
  color: white;
  border-radius: 100%;
}
</style>
