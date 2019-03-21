import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Game from './views/GameScreen.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'
import Details from './components/QuestDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/play',
      name: 'game',
      component: Details,
    }
  ]
})
