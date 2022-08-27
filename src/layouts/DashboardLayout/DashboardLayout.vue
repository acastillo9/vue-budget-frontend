<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { me } from "@/api/usersApi";

const sidebarCollapsed = ref(false);
const isSidebarCollapsed = ref(false);
const sidebarClosed = ref(true);
const user = ref<unknown>(null);

function mouseEnterSidebar() {
  isSidebarCollapsed.value = sidebarCollapsed.value;
  sidebarCollapsed.value = false;
}
function mouseLeaveSidebar() {
  if (isSidebarCollapsed.value) {
    sidebarCollapsed.value = true;
  }
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
    <div class="overlay" @click="sidebarClosed = !sidebarClosed"></div>
    <div
      class="sidebar vh-100"
      @mouseenter="mouseEnterSidebar"
      @mouseleave="mouseLeaveSidebar"
    >
      <div class="pt-4 d-flex justify-content-center">
        <img class="logo-sm" src="@/assets/images/logo-sm.png" width="25" />
        <img class="logo-lg" src="@/assets/images/logo-lg.png" width="200" />
      </div>
      <br />
      <ul class="nav flex-column">
        <li class="nav-item">
          <RouterLink
            class="nav-link d-flex align-items-center"
            aria-current="page"
            to="/dashboard"
          >
            <font-awesome-icon
              icon="fa-solid fa-gauge-high"
              class="nav-link-icon"
            />
            <span class="nav-link-text">Dashboard</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink
            class="nav-link d-flex align-items-center"
            aria-current="page"
            to="/transactions"
          >
            <font-awesome-icon
              icon="fa-solid fa-arrow-right-arrow-left"
              class="nav-link-icon"
            />
            <span class="nav-link-text">Transactions</span>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="content vh-100 flex-grow-1">
      <header>
        <nav class="navbar">
          <div class="container-fluid">
            <button
              class="btn btn-collapse-sidebar border-0"
              @click="sidebarCollapsed = !sidebarCollapsed"
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
              @click="sidebarClosed = !sidebarClosed"
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

    .nav {
      .nav-item {
        .nav-link {
          color: #c8c9cf;

          &.active,
          &:hover {
            color: #ffffff;
          }

          .nav-link-icon {
            font-size: 18px;
            margin-right: 0.5rem;
          }
        }
      }
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
    padding-left: 70px;

    .sidebar {
      width: 70px;
      position: absolute;
      left: 0;

      .logo-lg {
        display: none;
      }

      .logo-sm {
        display: block;
      }

      .nav {
        .nav-item {
          .nav-link {
            justify-content: center;

            .nav-link-icon {
              font-size: 22px;
              margin-right: 0;
            }
            .nav-link-text {
              display: none;
            }
          }
        }
      }
    }
  }
}

@include media-breakpoint-down(md) {
  .sidebar-wrapper {
    padding-left: 0;

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
      padding-left: 0;

      .sidebar {
        width: 250px;

        .logo-lg {
          display: block;
        }

        .logo-sm {
          display: none;
        }

        .nav {
          .nav-item {
            .nav-link {
              justify-content: start;

              .nav-link-icon {
                font-size: 18px;
                margin-right: 0.5rem;
              }
              .nav-link-text {
                display: block;
              }
            }
          }
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
