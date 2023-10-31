<template>
  <header class="app-header">
    <div class="left">
      <img src="../assets/Logo.png" alt="Logo" />
    </div>
    <div class="right">
      <div
        class="grid grid-cols-2 cursor-pointer gap-1 content-center"
        @click="toggle"
        v-if="isUserLoggedIn"
      >
        <img src="../assets/perfil.png" alt="user profile" />
        <div>
          <p class="h-full align-center text-white text-center">
            {{ user.firstName + " " + user.lastName }}
          </p>
        </div>
      </div>
      <div v-else>
        <Button @click="goToLogin" class="my-Button">
          <p>Iniciar sesión</p>
        </Button>
      </div>
    </div>
  </header>
  <OverlayPanel style="width: 30vh" ref="op">
    <div class="tile flex flex-row py-3 p-2 justify-content-start">
      <font-awesome-icon icon="user" />
      <span @click="showDialog" class="cursor-pointer pl-1">Perfil</span>
    </div>
    <div class="tile flex flex-row py-3 p-2 justify-content-start">
      <font-awesome-icon icon="right-from-bracket" />
      <span @click="showDialog" class="cursor-pointer pl-1">Cerrar sesión</span>
    </div>
  </OverlayPanel>
  <Dialog
    class="flex flex-col content-end"
    v-model:visible="logoutDialog"
    modal
  >
    <div>
      <p class="mx-4">¿Estás seguro de que deseas cerrar sesión?</p>
    </div>

    <div class="flex flex-row mt-3 mb-2 px-1">
      <Button
        class="px-2 py-1 w-full mr-2 justify-content-center"
        style="background-color: #183045"
        label="Cancelar"
        type="cancel"
        @click="closeDialog"
      />
      <Button
        type="cancel"
        class="px-2 py-1 w-full ml-2 justify-content-center"
        style="background-color: #2a9d8f"
        label="Confirmar"
        @click="logout"
      />
    </div>
  </Dialog>
</template>
<script setup>
import OverlayPanel from "primevue/overlaypanel";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

import { ref } from "vue";
import router from "../router";

const op = ref();
const toggle = (event) => {
  op.value.toggle(event);
};

const logoutDialog = ref(false);
const showDialog = () => {
  logoutDialog.value = true;
};
const closeDialog = () => {
  logoutDialog.value = false;
};
const logout = () => {
  localStorage.removeItem("jwt");
  window.location.href = "/login";
};
const goToLogin = () => {
  console.log("go to login");
  router.push({ path: "/login" });
};

const isUserLoggedIn = ref(localStorage.getItem("jwt") !== null);
const user = ref(JSON.parse(localStorage.getItem("user")));
</script>
<style scoped>
.tile:hover {
  background-color: #4bb5b7;
  color: #fff;
  transition: 0.1s;
}
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  /* Added bluf effect */
  background: #4bb6b7;
}
.my-Button {
  color: #2a9d8f;
  background-color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: 0.3s;
}
.my-Button a {
  color: #4bb5b7;
  text-decoration: none;
}
.left {
  display: flex;
  align-items: center;
}

.left img {
  height: 30px;
}

.right {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.right img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.right span {
  font-size: 12px;
  color: #fffcf9;
}

.menu {
  padding: 10px;
}
</style>
