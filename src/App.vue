<template>
  <Toast />

  <div>
    <HeaderComponent />
  </div>
  <div class="app">
    <SidebarComponent />
    <router-view />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import SidebarComponent from "./components/SidebarComponent.vue";
export default {
  components: {
    HeaderComponent,
    SidebarComponent,
  },
};
</script>

<style lang="scss">
:root {
  --primary: #fffcf9;
  --primary-alt: #fffcf9;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #1e1e1e;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira sans", sans-serif;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
</style>
