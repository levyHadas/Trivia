<template>
  <nav>
    <ul>
      <li>
        <a class="button-small purple_light rounded3">
          <router-link to="/">Home</router-link>
        </a>
      </li>
      <!-- <li>
        <a class="button-small purple_light rounded3">
          <router-link to="/about">About</router-link>
        </a>
      </li>-->
      <li>
        <a class="button-small purple_light rounded3">
          <router-link to="/signup">Sign Up</router-link>
        </a>
      </li>
      <li>
        <a class="button-small purple_light rounded3">
          <router-link to="/login" v-if="!realUser">Login</router-link>
        </a>
      </li>
      <li>
        <a class="button-small purple_light rounded3">
          <button @click="navToCreateQuest" class="nav-btn">Create Question</button>
        </a>
      </li>
      <li v-if="realUser">
        <a class="button-small purple_light rounded3">
          <router-link to="/logout">Logout</router-link>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  },
  methods: {
    navToCreateQuest() {
      if (this.realUser) this.$router.push("/quest/edit");
      else
        this.$swal.fire({
          position: "top-end",
          type: "success",
          title: "Please login or sign up to create a question",
          showConfirmButton: true,
          timer: 3500
        });
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters.currUser;
    },
    realUser() {
      const user = this.$store.getters.currUser;
      if (!user._id) return false;
      if (user._id.includes("guest")) return false;
      return true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  text-decoration: none;
}
.nav-btn {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
ul {
  width: auto;
}
li {
  list-style: none;
  float: left;
  margin: 10px;
}
.button-small {
  color: #fff !important;
  word-spacing: 0.25em;
  font-family: "Open Sans", sans-serif;
  text-transform: uppercase;
  border: none;
  line-height: 22px;
  padding: 12px 13px 11px;
  text-align: center;
  display: inline-block;
  margin-top: 5px;
  margin-bottom: 18px;
  text-decoration: none;
}
.button-small:visited {
  color: #fff;
}
.button-small {
  padding: 6px 12px 5px;
  font-size: 11px;
  color: #fff;
  text-shadow: none;
}
.button-small:hover {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  -webkit-box-shadow: inset 0 10px 20px rgba(255, 255, 255, 0.1);
  -moz-box-shadow: inset 0 10px 20px rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 10px 20px rgba(255, 255, 255, 0.1);
}
.button-small:active {
  -webkit-box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.3),
    inset 0 10px 20px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.3),
    inset 0 10px 20px rgba(0, 0, 0, 0.08);
  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.3),
    inset 0 10px 20px rgba(0, 0, 0, 0.08);
}
.rounded3 {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.brown_dark {
  background: #4e2500;
}
.brown_normal {
  background: #783a00;
}
.brown_light {
  background: #bc8654;
}

.salmon_dark {
  background: #8a1215;
}
.salmon_normal {
  background: #d5383c;
}
.salmon_light {
  background: #ea8b8e;
}

.purple_dark {
  background: #6b63cf;
}
.purple_normal {
  background: #938de7;
}
.purple_light {
  background: #aaa5e7;
}
.orange_dark {
  background: #f76b16;
}
.orange_normal {
  background: #fb9150;
}
.orange_light {
  background: #fbad7d;
}

.blue_dark {
  background: #3b5998;
}
.blue_normal {
  background: #6e8ccc;
}
.blue_light {
  background: #879dcc;
}

.red_dark {
  background: #d74340;
}
.red_normal {
  background: #eb726f;
}
.red_light {
  background: #eb9390;
}
.green_dark {
  background: #4b701d;
}
.green_normal {
  background: #87ac5a;
}
.green_light {
  background: #b3d689;
}
.grey_dark {
  background: #474747;
}
.grey_normal {
  background: #5e5e5e;
}
.grey_light {
  background: #afafaf;
}
</style>
