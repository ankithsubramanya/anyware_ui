import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
// import Vuex from 'vuex'
import router from './router/index'
import { store }from './store/store'

// Vue.use(router)
// Vue.use(Vuex)
Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  router,
  store: store,
  render: h => h(App),
}).$mount('#app')
