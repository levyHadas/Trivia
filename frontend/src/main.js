import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SequentialEntrance from 'vue-sequential-entrance'
import 'vue-sequential-entrance/vue-sequential-entrance.css'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(SequentialEntrance);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
