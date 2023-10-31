<template>
  <div class="card-container">
    <Card class="card">
      <template #title>
        <span class="text-center mt-3 mb-3 ml-3 text-xl font-bold text-900"
          >Login</span
        >
        <Divider />
      </template>
      <template #content>
        <form @submit.prevent="submitForm" class="form">
          <div class="flex flex-column gap-2 mb-3">
            <label for="username">Correo electrónico</label>
            <InputText
              id="username"
              v-model="email"
              size="large"
              aria-describedby="username-help"
            />
          </div>
          <div class="flex flex-column gap-2">
            <label for="password">Contraseña</label>
            <Password
              placeholder="Contraseña"
              size="large"
              v-model="password"
              toggle-mask="true"
              v-bind:toggle-mask="visible"
            />
          </div>
        </form>
      </template>
      <template #footer>
        <div class="flex flex-col items-center justify-center">
          <Button
            class="p-button-raised p-2 mr-3"
            @click="submitForm"
            label="Iniciar sesión"
            style="background: #2a9d8f"
          />
        </div>
      </template>
    </Card>
  </div>
  <Dialog v-model:visible="showPasswordDialog" modal :style="{ width: '50vw' }">
    <p>
      El usuario o la contraseña son incorrectos, por favor intente de nuevo.
    </p>
  </Dialog>
</template>

<script setup>
import Card from "primevue/card";
import Divider from "primevue/divider";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { ref } from "vue";
import { baseURL } from "../config/config";
import axios from "axios";
import router from "../router/index.js";

const visible = ref(false);
const email = ref("");
const password = ref("");
const showPasswordDialog = ref(false);

//create a login async function
const submitForm = async () => {
  const response = await axios.post(baseURL + "/login", {
    email: email.value,
    password: password.value,
  });
  if (response.status !== 200) {
    showPasswordDialog.value = true;
    return;
  }
  const { jwt, user } = response.data;
  localStorage.setItem("jwt", jwt);
  localStorage.setItem("user", JSON.stringify(user));

  setTimeout(() => {
    router.push({ path: "/products" });
  }, 1000);
};
</script>
<style scoped>
.card-container {
  margin: 10px;
  min-height: 100%;
  min-width: 75%;
}
.form {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  padding: 1rem;
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
