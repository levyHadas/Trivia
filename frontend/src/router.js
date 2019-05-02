import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GameBranches from './components/GameBranches.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import CategorySelection from './views/CategorySelection.vue'
import WaitRoom from './views/WaitRoom.vue'
import EndOfParty from './views/EndOfParty.vue'
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
      path: '/play', name: 'Play', component: GameBranches,
      children: [
        { path: 'single', name: 'singleMode', component: GameBranches },
        { path: 'party', name: 'partyMode', component: GameBranches },
      ]
    },
    {
      path: '/quest/edit/:questId?',
      name: 'QuestEdit',
      component: QuestEdit
    },
    {
      path: '/waitroom',
      name: 'WaitRoom',
      component: WaitRoom,
      history: false
    },
    {
      path: '/partysummary',
      name: 'endOfParty',
      component: EndOfParty,
      history: false
    },
  ]
})
