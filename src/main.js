import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue } from 'bootstrap-vue'
import 'vue-select/dist/vue-select.css'
import '../public/assets/plugins/bootstrap-4.1.2-dist/css/bootstrap.min.css'
import '../public/assets/plugins/materialdesignicons/css/materialdesignicons.min.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
  router
  
}).$mount('#app')
