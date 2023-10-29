<template>
  <DataTable paginator :rows="5" :value="users" class="table" id="usertable">
    <Column field="user" header="User" style="width: 100px">
      <template #body>
        <img src="../assets/perfil.png" alt="user profile" />
      </template>
    </Column>
    <Column field="firstName" header="Name" />
    <Column field="lastName" header="Last name" />
    <Column field="role.id" header="Role">
      <template #body="slotProps">
        <p>
          {{ `${slotProps.data.role.id == 1 ? "Admin" : "User"}` }}
        </p>
      </template>
    </Column>
    <Column field="email" header="Email" />
    <Column field="actions" header="Actions" style="width: 120px">
      <template #body="rowData">
        <Button
          icon="pi pi-pencil px-3 py-2"
          style="background-color: #2a9d8f"
          class="mr-1"
          @click="openEditDialog(rowData.data)"
        />
        <Button
          icon="pi pi-trash px-3 py-2"
          style="background-color: #9a031e"
          class="mr-1"
        />
      </template>
    </Column>
  </DataTable>

  <Dialog
    v-model:visible="isVisibleEditDialog"
    modal
    header="Edit role"
    :style="{ width: '50vw' }"
  >
    <Form @submit.prevent="changeRole">
      <select
        id="roleId"
        v-model="editedUser.roleId"
        class="w-full p-2 py-3 mt-2 text-base border-solid outline-none text-color surface-overlay border-1 surface-border border-round focus:border-primary"
        placeholder="Role"
      >
        <option v-bind:key="role.id" v-for="role in roles" :value="role.id">
          {{ `${role.id == 1 ? "Admin" : "User"}` }}
        </option>
      </select>
      <div class="flex">
        <Button
          @click="closeEditDialog"
          type="cancel"
          class="w-full mr-2 justify-content-center"
          style="background-color: #183045"
          >Cancelar</Button
        >
        <Button
          type="submit"
          class="w-full ml-2 justify-content-center"
          style="background-color: #2a9d8f"
          @click="changeRole"
          >Change</Button
        >
      </div>
    </Form>
  </Dialog>

  <Dialog v-model:visible="deleteConfirmationVisible" modal>
    <div>
      <p>¿Estás seguro de que deseas eliminar el usuario?</p>
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
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import axios from "axios";

export default {
  components: {
    DataTable,
    Column,
    Button,
    Dialog,
  },
  data() {
    return {
      editedUser: {
        userId: null,
        roleId: null,
      },
      isVisibleEditDialog: false,
      users: [],
      roles: [],
    };
  },
  async created() {
    await this.getUsers();
    await this.getRoles();
  },
  methods: {
    async getRoles() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/roles?page=1&limit=10"
        );
        this.roles = response.data.roles;
        console.log({ roles: this.roles });
      } catch (error) {
        console.log(error);
      }
    },
    log(data) {
      console.log(data);
    },
    async getUsers() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users?page=1&limit=10"
        );
        this.users = response.data.users;
        console.log(this.users);
      } catch (error) {
        console.log(error);
      }
    },
    closeEditDialog() {
      this.isVisibleEditDialog = false;
    },
    openEditDialog(data) {
      this.isVisibleEditDialog = true;
      this.editedUser = { userId: data.id, roleId: data.role.id };
    },
    async changeRole() {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/users/change/${this.editedUser.userId}`,
          { roleId: this.editedUser.roleId }
        );
        if (response.status == 200) this.getUsers();
        this.isVisibleEditDialog = false;
        console.log(response);
      } catch (error) {
        console.log(error);
      }
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
</style>
