<template>
  <div class="home">
    <section class="main">
      <div>
        <h3>Global. Knowlege. Compete With Others</h3>
      </div>
      <a href="#" class="btn" @click="startPlaying">Play Now</a>
      <br>
      <div class="switch-btn">
        <div class="toggle" :class="[this.state_class]" @click.self="onClick">
          <div class="draggable" @mousedown.prevent="dragStart" :style="style"></div>
        </div>Party Mode
      </div>
    </section>
  </div>
</template>

<script>
import SocketService from "@/services/SocketService.js";
import UserService from "@/services/UserService.js";

export default {
  name: "home",

  data() {
    return {
      temp: [],
      width: 100,
      state: false,
      pressed: 0,
      position: 0
    };
  },

  components: {},

  methods: {
    startPlaying() {
      if (this.state) {
        this.requestPartyGame();
      } else {
        this.$router.push("CategorySelection");
      }
    },
    // requestPartyGame() {
    //   SocketService.connectionTest();

    //   const loggedUser = this.$store.getters.currUser;
    //   SocketService.emit("partyRequest", loggedUser);

    requestPartyGame() {
      this.$store.dispatch({ type: "setPartyRequest" });

      // SocketService.connectionTest()
      // const loggedUser = this.$store.getters.currUser
      // SocketService.emit('partyRequest', loggedUser)
    },
    onClick() {
      this.toggle(!this.state);
      this.emit();
    },
    toggle(state) {
      this.state = state;
      this.position = !state ? 0 : 100;
    },
    dragging(e) {
      const pos = e.clientX - this.$el.offsetLeft;
      const percent = (pos / this.width) * 100;
      this.position = percent <= 0 ? 0 : percent >= 100 ? 100 : percent;
    },
    dragStart(e) {
      this.startTimer();
      window.addEventListener("mousemove", this.dragging);
      window.addEventListener("mouseup", this.dragStop);
    },
    dragStop() {
      window.removeEventListener("mousemove", this.dragging);
      window.removeEventListener("mouseup", this.dragStop);
      this.resolvePosition();
      clearInterval(this.$options.interval);
      if (this.pressed < 30) {
        this.toggle(!this.state);
      }
      this.pressed = 0;
      this.emit();
    },
    startTimer() {
      this.$options.interval = setInterval(() => {
        this.pressed++;
      }, 1);
    },
    resolvePosition() {
      this.position = this.state ? 100 : 0;
    },
    emit() {
      this.$emit("input", this.state);
    }
  },
  mounted() {
    this.toggle(this.value);
  },
  computed: {
    style() {
      return {
        transform: `translateX(${this.pos_percentage})`
      };
    },
    pos_percentage() {
      return `${(this.position / this.width) * 100}%`;
    },
    state_class() {
      if (this.state) {
        return "active";
      }
    }
  },
  watch: {
    position() {
      this.state = this.position >= 50;
    }
  }
};
</script>

<style lang="scss">
@import url("../assets/reset.css");
.home {
  img {
    width: 100%;
  }
}

.main {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  align-content: center;
  padding: 50px;
  height: 60vh;
  background-color: #ffb400;
  // background: url("../assets/main.jpg") no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  // justify-content: space-around;
  h3 {
    color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    // background-color: white;
    border-radius: 20px;
    font-size: 30px;
    font-weight: bold;
    padding: 30px;
  }
}

header {
  height: 30px;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  padding: 30px;
  background-color: #ffb400;
  color: white;
  a {
    color: white;
  }
  h1 {
    font-size: 60px;
  }
}

.button {
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
  background: rgb(253, 47, 83);
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  line-height: 38px;
  border-radius: 50px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  width: 170px;
  text-align: center;
  padding: 10px;
  margin-top: 10px;
}

.button:hover {
  background: #fff;
  color: #339dff;
  box-shadow: 0 4px 4px rgba(83, 100, 255, 0.32);
}

footer {
  // position: fixed;
  // left: 0;
  // bottom: 0;
  // width: 100%;
  background-color: #0d2c54;
  color: white;
  a {
    color: white;
  }
  padding: 30px;
}

.btn {
  padding: 10px;
  margin-top: 25px;
  width: 330px;
  height: 60px;
  line-height: 60px;
  background-color: #ff6138;
  border-radius: 8px;
  color: #fff;
  font-family: "Indie Flower", cursive;
  font-size: 35px;
  font-weight: normal;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  position: relative;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: -webkit-transform;
  transition-property: transform;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transform: translateY(-6px);
  -ms-transform: translateY(-6px);
  transform: translateY(-6px);
  -webkit-animation-name: hover;
  animation-name: hover;
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  &:before {
    pointer-events: none;
    position: absolute;
    z-index: -1;
    content: "";
    top: 100%;
    left: 5%;
    height: 10px;
    width: 90%;
    opacity: 0;
    background: -webkit-radial-gradient(
      center,
      ellipse,
      rgba(0, 0, 0, 0.35) 0%,
      rgba(0, 0, 0, 0) 80%
    );
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.35) 0%,
      rgba(0, 0, 0, 0) 80%
    );
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: -webkit-transform, opacity;
    transition-property: transform, opacity;
    opacity: 0.4;
    -webkit-transform: translateY(6px);
    -ms-transform: translateY(6px);
    transform: translateY(6px);
    -webkit-animation-name: hover-shadow;
    animation-name: hover-shadow;
    -webkit-animation-duration: 1.5s;
    animation-duration: 1.5s;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
  }
  &:hover {
    background-color: #e16e50;
  }
}

@keyframes hover {
  50% {
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
  }

  100% {
    -webkit-transform: translateY(-6px);
    -ms-transform: translateY(-6px);
    transform: translateY(-6px);
  }
}

@-webkit-keyframes hover-shadow {
  0% {
    -webkit-transform: translateY(6px);
    transform: translateY(6px);
    opacity: 0.4;
  }

  50% {
    -webkit-transform: translateY(3px);
    transform: translateY(3px);
    opacity: 1;
  }

  100% {
    -webkit-transform: translateY(6px);
    transform: translateY(6px);
    opacity: 0.4;
  }
}

@keyframes hover-shadow {
  0% {
    -webkit-transform: translateY(6px);
    -ms-transform: translateY(6px);
    transform: translateY(6px);
    opacity: 0.4;
  }

  50% {
    -webkit-transform: translateY(3px);
    -ms-transform: translateY(3px);
    transform: translateY(3px);
    opacity: 1;
  }

  100% {
    -webkit-transform: translateY(6px);
    -ms-transform: translateY(6px);
    transform: translateY(6px);
    opacity: 0.4;
  }
}

@-webkit-keyframes hover {
  50% {
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
  }

  100% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
  }
}

@keyframes hover {
  50% {
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
  }

  100% {
    -webkit-transform: translateY(-6px);
    -ms-transform: translateY(-6px);
    transform: translateY(-6px);
  }
}

$width: 60px;
$background: #fff;
$background-active: #72d09c;
$border-color: #ddd;
$button-size: 30px;
$button-color: $background;

.toggle {
  width: $width;
  height: $button-size;
  background: $background;
  border: 2px solid $border-color;
  border-radius: 200px;
  padding: 2px;
  transition: background 0.6s;

  .draggable {
    width: $button-size;
    height: $button-size;
    background: $button-color;
    border-radius: 100%;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.6);
    transform: translateX(0%);
    transition: transform 0.05s ease-in-out;
  }

  &.active {
    background: $background-active;
    transition: background 0.6s;
  }
}

.app {
  display: flex;
}

.switches {
  margin-right: 30px;
}

pre {
  margin: 0;
  background: #513d56;
  color: #efefef;
  padding: 20px;
  border-radius: 6px;
  width: 200px;
}

.switch-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  letter-spacing: 3px;
}
</style>
