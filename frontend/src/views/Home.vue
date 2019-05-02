<template>
  <section class="home">
    <div class="home-main">
        <div :class="{'scale-down': isMenuOpen}">
        <h3 >Global. Knowledge. Compete With Others</h3>
      </div>
      <div class="btn-container" :class="{'scale-down': isMenuOpen}">
        <a href="#" class="btn play-btn" @click.once="requestPartyGame">Join The Party</a>
        <br>
        <a href="#" class="btn play-btn" @click="startSingleGame">Play Single</a>
      </div>
    </div>
  </section>
</template>

<script>
import SocketService from "@/services/SocketService.js";
import UserService from "@/services/UserService.js";
import swal from "sweetalert";

export default {
  name: "home",

  data() {
    return {
      temp: [],
      width: 100,
      state: true,
      pressed: 0,
      position: 0
    };
  },

  components: {},

  methods: {
    async requestPartyGame() {
      var user = this.$store.getters.currUser;
      if (user.nickname) {
        this.setPartyRequest();
        return;
      }
      var nickname = await swal("Enter your nickname to join the game","", { content: "input" });
      var user = this.$store.getters.currUser;
      this.$store.dispatch({ type: "updateUserNickname", nickname: nickname });
      this.setPartyRequest();
    },

    startSingleGame() {
      this.$router.push("CategorySelection");
    },
    setPartyRequest() {
      this.$store.dispatch({ type: "setPartyRequest" });
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
    },
    isMenuOpen() {
      return this.$store.getters.isMenuOpen;
    }
  },
  watch: {
    position() {
      this.state = this.position >= 50;
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  img {
    width: 100%;
  }
}

.home-main {
  margin: 0 auto;
  min-height: calc(100vh - 113px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(https://media.giphy.com/media/BHNfhgU63qrks/giphy.gif)
    no-repeat center center fixed;
  // image-rendering: auto;
  image-rendering: crisp-edges;
  // image-rendering: pixelated;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  justify-content: center;
  h3 {
    // color: #F7F4E9;
    color: #f9f8f6;
    -webkit-text-stroke-width: 0.7px;
    -webkit-text-stroke-color: black;
    border-radius: 20px;
    font-size: 50px;
    font-weight: bold;
    padding: 30px;
  }
}


.play-btn {
  padding: 10px;
  margin-top: 25px;
  width: 330px;
  height: 60px;
  line-height: 60px;
  // background-color: #F7F4E9;
  background-color: #f9f8f6;
  border-radius: 8px;
  color: #1D1D2C;
  font-size: 40px;
  font-weight: bold;
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
    background-color: #d1eeef;
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
  margin-top: 30px;
  margin-left: 10px;
  text-align: center;
}

.party-padding {
  padding: 5px;
}

@media (max-width: 500px) {
  .home-main {
    h3 {
      font-size: 40px;
    }
    .play-btn {
      padding: 10px;
      margin-top: 25px;
      width: 250px;
      height: 50px;
      line-height: 50px;
      border-radius: 8px;
      font-size: 30px;
      font-weight: normal;
    }
  }
}
</style>
