<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { me } from "@/api/usersApi";

const sidebarCollapsed = ref(false);
const sidebarClosed = ref(true);
const user = ref(null);

function collapseSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value;
}
function closeSidebar() {
  sidebarClosed.value = !sidebarClosed.value;
}
function logout() {
  const authStore = useAuthStore();
  authStore.logout();
}
async function findUser() {
  user.value = await me();
}
findUser();
</script>

<template>
  <div
    :class="[
      'vw-100 vh-100 d-flex sidebar-wrapper',
      { collapsed: sidebarCollapsed, closed: sidebarClosed },
    ]"
  >
    <div class="overlay" @click="closeSidebar"></div>
    <div class="sidebar vh-100">
      <div class="pt-4 d-flex justify-content-center">
        <img class="logo-sm" src="@/assets/images/logo-sm.png" width="25" />
        <img class="logo-lg" src="@/assets/images/logo-lg.png" width="200" />
      </div>
    </div>
    <div class="content vh-100 flex-grow-1">
      <header>
        <nav class="navbar">
          <div class="container-fluid">
            <button
              class="btn btn-collapse-sidebar border-0"
              @click="collapseSidebar"
            >
              <font-awesome-icon
                v-if="sidebarCollapsed"
                icon="fa-solid fa-arrow-right"
                size="lg"
              />
              <font-awesome-icon v-else icon="fa-solid fa-bars" size="lg" />
            </button>
            <button
              class="btn btn-close-sidebar border-0"
              @click="closeSidebar"
            >
              <font-awesome-icon icon="fa-solid fa-bars" size="lg" />
            </button>
            <div class="dropdown" v-if="user">
              <button
                class="btn btn-profile dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <font-awesome-icon icon="fa-solid fa-user" class="me-2" />
                <div class="me-1">
                  <p class="m-0 text-start lh-1">Andrés Castillo</p>
                  <p class="m-0 text-start lh-1 text-muted">acastillo</p>
                </div>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#" @click="logout">Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar-wrapper {
  .sidebar {
    background-color: #273469;
    box-shadow: 2px 0px 4px #30343f20;
    z-index: 1;
    width: 250px;
    transition: all 0.1s ease-out;

    .logo-sm {
      display: none;
    }
  }

  .content {
    background-color: #fafaff;

    header {
      .navbar {
        background-color: #ffffff;
        box-shadow: 0px 2px 4px #30343f20;

        .btn-close-sidebar {
          display: none;
        }

        .btn-profile {
          .fa-user {
            border: 1px solid #000000;
            border-radius: 20px;
            padding: 10px;
          }
        }
      }
    }
  }

  &.collapsed {
    .sidebar {
      width: 70px;

      .logo-lg {
        display: none;
      }

      .logo-sm {
        display: block;
      }
    }
  }
}

@include media-breakpoint-down(md) {
  .sidebar-wrapper {
    .overlay {
      position: absolute;
      width: 100vw;
      height: 100vh;
      background-color: #00000040;
      z-index: 1;
    }

    .sidebar {
      position: absolute;
      left: 0;

      .logo-lg {
        display: block;
      }
    }

    .content {
      header {
        .navbar {
          .btn-close-sidebar {
            display: inline-block;
          }
          .btn-collapse-sidebar {
            display: none;
          }
        }
      }
    }

    &.collapsed {
      .sidebar {
        width: 250px;

        .logo-lg {
          display: block;
        }

        .logo-sm {
          display: none;
        }
      }
    }

    &.closed {
      .overlay {
        display: none;
      }

      .sidebar {
        left: -250px;
      }
    }
  }
}
</style>
