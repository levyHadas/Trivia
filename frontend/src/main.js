import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
// import MainCss from './css/MainCss.scss'
import ResetCss from './assets/css/Reset.css'
import MainCss from './assets/css/Main.scss'



import './registerServiceWorker'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SequentialEntrance from 'vue-sequential-entrance'
import 'vue-sequential-entrance/vue-sequential-entrance.css'
import VueSweetalert2 from 'vue-sweetalert2';






Vue.config.productionTip = false
Vue.use(Element)
Vue.use(SequentialEntrance);
Vue.use(VueSweetalert2);

Vue.use(ResetCss);
Vue.use(MainCss);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
