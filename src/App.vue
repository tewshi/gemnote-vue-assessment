<template>
  <div id="app">
    <div class="grid grid-cols-12">
      <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0"
      >
        <div
          v-show="isOpen && isMobile"
          class="z-10 fixed inset-0 transition-opacity"
        >
          <div
            @click="hideDrawer"
            class="absolute inset-0 bg-black opacity-50"
            tabindex="0"
          ></div>
        </div>
      </transition>
      <nav
        id="nav"
        class="col-span-2 h-full min-h-screen pt-8 px-7 pb-2 mb-3 lg:pt-12 lg:px-10 lg:pb-3 xl:pt-16 xl:px-14 xl:pb-4 divide-solid divide-y divide-gray-500 -- transform top-0 left-0 fixed lg:relative overflow-auto ease-in-out transition-all duration-300 z-30"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="sidebar-top mb-6">
          <router-link
            to="/"
            class="block text-left pb-6 xl:pt-4 hover:bg-black-200 mb-3 lg:mb-4 xl:mb-6"
          >
            <img src="./assets/logo.png" alt="Gemnote Logo" class="w-44" />
          </router-link>
          <p class="block text-left py-2">{{ username }}</p>
        </div>
        <div class="sidebar-nav pt-6">
          <router-link
            v-for="(menu, index) in menus"
            :key="index"
            :to="{ name: menu.to }"
            @click.native="hideDrawer"
            class="block text-left py-2 mb-2 hover:text-white"
          >
            {{ menu.title }}
          </router-link>
        </div>
      </nav>
      <div
        class="col-span-12 lg:col-span-10 h-full min-h-screen transform top-0 ease-in-out transition-all duration-300"
        :class="isMobile ? 'translate-y-0' : '-translate-y-20'"
      >
        <nav class="px-6 py-4 flex">
          <button
            class="mr-4 focus:outline-none"
            aria-label="Open Menu"
            @click="toggleDrawer"
          >
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-8 h-8"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <router-link to="/" class="mx-auto block">
            <img src="./assets/logo.png" alt="Gemnote Logo" class="h-10" />
          </router-link>
        </nav>
        <div
          class="pt-8 px-7 pb-2 mb-3 lg:pt-12 lg:px-4 lg:pb-3 xl:pt-16 xl:px-14 xl:pb-4"
        >
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      menus: [
        { title: "Dashboard", to: "home" },
        { title: "Orders", to: "home" },
        { title: "Send a gift", to: "home" },
        { title: "Users", to: "home" },
        { title: "Integrations", to: "home" },
        { title: "Settings", to: "home" },
        { title: "Logout", to: "home" },
      ],
      isOpen: false,
      isMobile: false,
    };
  },
  computed: {
    ...mapGetters({
      username: "username",
    }),
  },
  methods: {
    toggleDrawer() {
      this.isOpen = !this.isOpen;
    },
    hideDrawer() {
      this.isOpen = false;
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
  mounted() {
    this.isMobile = window.innerWidth < 1024;
    this.isOpen = !this.isMobile;

    document.addEventListener("keydown", (e) => {
      if ((e.keyCode === 27 || e.code === "Escape") && this.isOpen) {
        this.isOpen = false;
      }
    });

    window.addEventListener("resize", (e) => {
      this.isMobile = e.target.innerWidth < 1024;
      this.isOpen = !this.isMobile;
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Nunito Sans", sans-seriff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #25282a;
}

nav {
  background-color: #25282a;
  color: #dbdcdd;
  font-weight: 700;
}
</style>
