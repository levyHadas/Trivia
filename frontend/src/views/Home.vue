<template>
  <div class="home">
    <section class="main">
      <h3>Global. Knowlege. Compete With Others</h3>
      <br>
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
      
      // SocketService.on('updateConnectedUsers', playersWithScores => {
      //   console.log('you need to update all players *now*', playersWithScores)
      // })
      SocketService.on('tellUserToWait', numOfUsers => {
        console.log(numOfUsers , ' are connected. game only start at 5')
      })
      
      //this is in the main app, so if user went to a different page, it will show:
      // SocketService.on('startPary', () => {
      //   console.log(numOfUsers , ' starting game')
      //   this.$router.push('/play/party')
      // })
   

      
      // console.log(this.temp, ' this is the players in the store')

      // SocketService.on('startParty', () => {
      //   console.log('starting party')
      //   const loggedUser = this.$store.getters.currUser
      //   this.$store.dispatch({type:'addPlayer', player:loggedUser})
      //   this.$router.push('/play/party')
      // })
      // SocketService.on('noPartyYet', () => {
      //   console.log('no party yet. You can wait or play single mode. Once a user connected we will inform you.')
      //   this.$router.push('/categorySelection')
      // })

    
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
  justify-content: space-between;
  padding: 50px;
  height: 60vh;
  background: url("../assets/main.jpg") no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
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
