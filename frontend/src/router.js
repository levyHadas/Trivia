import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Game from './views/GameScreen.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'
import Details from './components/QuestDetails.vue'
import QuestSelection from './views/QuestSelection.vue'


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
    path: '/questSelection',
    name: 'QuestSelection',
    component: QuestSelection
    },

    {
      path: '/play', name: 'Play', component: Game,
      children: [
        // { path: '', component: Game },
        { path: ':questId', name: 'Question', component: Details },
      ]
    },
    {
      path: '/quest/edit/:questId?',
      name: 'QuestEdit',
      component: QuestEdit 
    },
  ]
})
