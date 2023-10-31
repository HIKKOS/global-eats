<template>
  <DataTable
    :value="categories"
    class="table"
    id="cattable"
    paginator
    :rows="5"
  >
    <Column field="id" header="Id" style="width: 100px" />
    <Column field="categoryName" header="Name" />
    <Column header="Actions" style="width: 120px">
      <template #body="rowData">
        <Button
          icon="pi pi-pencil"
          style="background-color: #4bb6b7"
          class="px-3 py-2 mr-1"
          @click="editCategory(rowData.data)"
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
  <Dialog v-model:visible="deleteConfirmationVisible" modal>
    <div>
      <p>¿Estás seguro de que deseas eliminar la categoria?</p>
      <br />
    </div>
    <div class="flex">
      <Button
        class="w-full flex mr-2 justify-content-center"
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
  <Dialog
    v-model:visible="isEditVisible"
    modal
    header="edit category"
    :style="{ width: '50vw' }"
  >
    <form style="height: 50vh" @submit.prevent="putCategory">
      <div class="grid formgrid">
        <div class="field col-12 md:col-6">
          <input
            type="text"
            id="categoryName"
            v-model="editedCategory.categoryName"
            required
            class="w-full p-2 py-3 text-base border-solid outline-none appearance-none text-color surface-overlay border-1 surface-border border-round focus:border-primary"
            placeholder="Category name"
          />
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
          class="w-full ml-2 justify-content-center"
          style="background-color: #2a9d8f"
          @click="putCategory"
          >Edit</Button
        >
      </div>
    </form>
  </Dialog>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import axios from "axios";
import { baseURL } from "../config/config";
const axiosInstance = axios.create({
  baseURL: `${baseURL}/categories/`,
  headers: {
    "x-token": localStorage.getItem("jwt"),
  },
});
export default {
  components: {
    DataTable,
    Column,
    Button,
    Dialog,
  },
  data() {
    return {
      isEditVisible: false,
      deleteConfirmationVisible: false,
      editedCategory: null,
      count: 0,
      categories: [],
      categorieDeletedId: null,
    };
  },
  async created() {
    await this.getCategories();
  },
  methods: {
    closeForm() {
      this.isEditVisible = false;
    },
    async getCategories() {
      try {
        const response = await axiosInstance.get();
        this.categories = response.data.categories;
        this.count = response.data.count;
      } catch (error) {
        console.error("Error al obtener las categorias:", error);
      }
    },
    async deleteCategorie(id) {
      try {
        await axiosInstance.delete(`/${id}`);
        this.getCategories();
      } catch (error) {
        console.error(`Error al eliminar la categoria con ID ${id}:`, error);
      }
    },
    showDeleteConfirmation(id) {
      this.categorieDeletedId = id;
      this.deleteConfirmationVisible = true;
    },
    cancelDelete() {
      this.categorieDeletedId = null;
      this.deleteConfirmationVisible = false;
    },
    async confirmDelete() {
      if (this.categorieDeletedId) {
        await this.deleteCategorie(this.categorieDeletedId);
        this.categorieDeletedId = null;
        this.deleteConfirmationVisible = false;
      }
    },
    async editCategory(category) {
      this.isEditVisible = true;
      this.editedCategory = { ...category };
    },
    async putCategory() {
      try {
        const res = await axiosInstance.put(`/${this.editedCategory.id}`, {
          categoryName: this.editedCategory.categoryName,
        });

        if (res.status !== 200) {
          console.log("Categoria mo actualizada");
          return;
        }
        this.isEditVisible = false;
        await this.getCategories();
      } catch (error) {
        console.error(
          `Error al actualizar la categoria con ID ${this.editedCategory.id}:`,
          error
        );
      }
    },
  },
};
</script>
<style scoped>
.header {
  background-color: #183045;
  color: white;
}
</style>
