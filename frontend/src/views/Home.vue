<template>
  <div class="home">
    <section class="main">
      <div>
      <h3>Global. Knowlege. Compete With Others</h3>
      </div>
      <a href="#/CategorySelection" class="button">Play</a>
      <a class="button" @click="requestPartyGame">Party</a>
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
      temp: []
    }
  },

  components: {},

  methods: {

    requestPartyGame(){
      
      SocketService.connectionTest()
      
      const loggedUser = this.$store.getters.currUser
      SocketService.emit('partyRequest', loggedUser)
      
 
      SocketService.on('tellUserToWait', numOfUsers => {
        console.log(numOfUsers , ' are connected. game only start at 5')
      })
      
    

    
    },
  },  
}
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
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 50px;
  height: 90vh;
  background: url("../assets/main.jpg") no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  justify-content: space-between;
  h3 {
    color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    // background-color: white;
    border-radius: 20px;
    font-size: 30px;
    font-weight: bold;
    padding: 10px;
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
  padding:10px;
  margin-top:10px;
}

.button:hover {
  background: #fff;
  color: #339dff;
  box-shadow: 0 4px 4px rgba(83, 100, 255, 0.32);
}

footer {
  background-color: #0d2c54;
  color: white;
  a {
    color: white;
  }
  padding: 30px;
}
</style>
