<template>
  <header class="header-container">
    <div class="app-header header-footer-container">
      <router-link to="/">
        <h1 class="logo">Trivia.</h1>
      </router-link>
      <app-nav/>
      <!-- <Push  @openMenu="emitMenuChange"
        @closeMenu="emitMenuChange">
        <router-link to="/">
          <span>Home</span>
        </router-link>

        <router-link to="/signup">
          <span>Sign Up</span>
        </router-link>

        <router-link to="/login" v-if="!realUser"
        >
          <span>Log In</span>
        </router-link>
        <button @click="navToCreateQuest" class="btn btn-nav">Create</button>

        <router-link to="/logout" v-if="realUser">
          <span>Log Out</span>
        </router-link> -->
        <router-link to="/logout" v-if="realUser">
          <span>Log Out</span>
        </router-link> -->
      </Push> -->
    
    </div>
  </header>
</template>

<script>
import AppNav from "@/components/AppNav.vue";
import { Push } from "vue-burger-menu";

export default {
  name: "Header",
  props: {
    msg: String,
  },
  components: {
    AppNav,
    Push
  },
  methods: {
    emitMenuChange(){
      this.$store.commit('toggleMenu')
    }
  },
  watch: {
    isMenuOpen: function (oldVal, newVal) {
      console.log('Menu open or closed');
      // this.$store.commit()
    }
  },
  computed: {
    isMenuOpen (){
      return this.isOpen
    }
  }
};
</script>

<!-- Unscoped css -->
<style lang="scss">
.bm-menu {
  background-color: #1c1c6d;
}

.bm-burger-button {
  top: 15px;
}
.bm-overlay {
    z-index:0; 
    }
@media (min-width: 700px) {
  .bm-burger-button {
    display: none;
  }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.toggle-menu {
  position: absolute;
  bottom: 150px;
}
.header-container {
  height: 55px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(190, 190, 190, 0.658);
  display: flex;
  box-shadow: 5px -16px 12px 18px rgba(0, 0, 0, 0.32);
  align-items: center;
  opacity: 0.6;
  z-index: 25;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 25;
}

.logo {
  color: black;
  font-size: 2.5rem;
}
</style>
