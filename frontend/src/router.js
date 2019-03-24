import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Game from './views/GameScreen.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import Details from './components/QuestDetails.vue'
import CategorySelection from './views/CategorySelection.vue'


import QuestEdit from './views/QuestEdit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/CategorySelection',
      name: 'CategorySelection',
      component: CategorySelection
    },
    {
      path: '/play', name: 'Play', component: Game,
      children: [
        // { path: '', component: Game },
        { path: 'single', name: 'singleMode', component: Details },
        { path: 'party', name: 'partyMode', component: Details },
      ]
    },
    {
      path: '/quest/edit/:questId?',
      name: 'QuestEdit',
      component: QuestEdit
    },
  ]
})
