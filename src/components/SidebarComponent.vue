<template>
  <aside :class="'is-expanded'">
    <div class="menu">
      <router-link to="/products" class="button">
        <font-awesome-icon class="material-icons" icon="shopping-bag" />
        <Button class="material-icons" disabled text label="Products" />
      </router-link>
      <router-link to="/users" class="button">
        <font-awesome-icon class="material-icons" icon="user" />
        <Button class="material-icons" disabled text label="Users" />
      </router-link>
      <router-link to="/categories" class="button">
        <font-awesome-icon class="material-icons" icon="layer-group" />
        <Button class="material-icons" disabled text label="Categories" />
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;

  background: #4bb6b7;

  width: calc(2rem + 28px);
  overflow: hidden;
  height: 100vh;
  padding: 1rem;

  .flex {
    flex: 1 1 0%;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;

      .material-icons {
        color: FFFCF9;
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  h3,
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  /* Changed colors */

  h3 {
    color: #fffcf9;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        color: var(--light);
        transition: 0.2s ease-in-out;
        font-size: 1.2rem;
      }

      .text {
        color: #ffffff;
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: #25777c;

        .material-icons,
        .text {
          color: #ffffff;
        }
      }

      &.router-link-exact-active {
        background-color: #25777c;
        border-right: 5px solid var(--primary);

        .material-icons,
        .text {
          color: #ffffff;
        }
      }
    }
  }

  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }

    .footer {
      opacity: 0;
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>
