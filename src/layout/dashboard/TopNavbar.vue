<template>
  <nav
    class="navbar navbar-expand-lg navbar-absolute"
    :class="{'bg-white': showMenu, 'navbar-transparent': !showMenu}"
  >
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle d-inline" :class="{toggled: $sidebar.showSidebar}">
          <button
            type="button"
            class="navbar-toggler"
            aria-label="Navbar toggle button"
            @click="toggleSidebar"
          >
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>

        <a style="margin:0" class="navbar-brand" href="#/dashboard">
          <img
            style="width: 50px;margin-right:10px"
            src="@/assets/images/logo.svg"
            alt="logo"
            title="Chart profile"
          />
          Chart Profile
        </a>
      </div>
     
      <div class="add-register">
          <button class="dasktop-btn" style="margin-top: 15px" v-on:click="show()">+ Criar novo cadastro</button>
          <button class="mobile-float-btn" v-on:click="show()">+</button>
        </div>
        <modal
          class="modal-register"
          name="my-first-modal"
          :min-width="200"
          :min-height="150"
          :scrollable="true"
          :reset="true"
          :width="size"
          height="auto"
          styles="background: transparent;"
        >
          <Register />
        </modal>
    </div>
  </nav>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import logo from "@/assets/images/logo.svg";
import Register from '@/components/Register'

export default {
  components: {
    CollapseTransition,
    Register
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    isRTL() {
      return this.$rtl.isRTL;
    },

     size() {
        return window.innerWidth > 500 ? '60%' : '90%'
      }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    show() {
      console.log(this.$modal);
      this.$modal.show("my-first-modal");
    },
    hide() {
      this.$modal.hide("my-first-modal");
    },
  },
};
</script>

<style lang="css">
.add-register {
  display: flex;
  flex-direction: row-reverse;
}

.add-register button {
  padding: 10px 15px;
  margin-bottom: 15px;
  outline: none;
  border: none;
  color: #fff;
  border-radius: 5px;
  background: #FF5611;
  cursor: pointer;
}

.dasktop-btn {
  display: block;
}

.mobile-float-btn {
  display: none;
}

@media screen and (max-width: 500px) {
  .dasktop-btn {
    display: none;
  }
  .mobile-float-btn {
    display: block;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 15px;
    right: 15px;
    border-radius: 50%!important;
    font-size: 20px;
  }
  .modal-register {
    top: 80px!important;
  }
  .modal-register .card {
    height: 850px!important;
  }
}

</style>
