<template>
  <div class="home">
    <section class="main">
      <h3>Global. Knowlege. Compete With Others</h3>
      <br>
      <a href="#/CategorySelection" class="download2">Play</a>
      <button  class="download2" @click="requestPartyGame">Party</button>
    </section>
  </div>
</template>

<script>


import SocketService from '@/services/SocketService.js'
import UserService from '@/services/UserService.js'

export default {

  name: "home",
  
  components: {},

  methods: {

    requestPartyGame(){

      SocketService.connectionTest()
      
      const loggedUser = this.$store.getters.currUser
      SocketService.emit('joinedParty', loggedUser)
      
      SocketService.on('noPartyYet', () => {
        console.log('no party yet. You can wait or play single mode. Once a user connected we will inform you.')
        this.$router.push('/categorySelection')
      })
      SocketService.on('startParty', () => {
        this.$router.push('/play/party')
        this.$store.dispatch({type:'addPlayer', player:loggedUser})
      })
    },


  },
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
  justify-content: center;
  align-items: center;
  align-content: center;
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
    // background-color: green;
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
  background-color: #FFB400;
  color: white;
  a {
    color: white;
  }
  h1 {
    font-size: 60px;
  }
}

.download2 {
  display: inline-block;
  margin-right: 10px;
  background: rgb(253,47,83);
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  line-height: 38px;
  border-radius: 50px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  width: 170px;
  text-align: center;
}

.download2:hover {
  background: #fff;
  color: #339dff;
  box-shadow: 0 4px 4px rgba(83, 100, 255, 0.32);
}

footer {
  background-color: #0D2C54;
  color: white;
  a {
    color: white;
  }
  padding: 30px;
}
</style>
