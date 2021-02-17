import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import InboundRegistry from './views/InboundRegistry';
import VHijriDatePicker from 'vuetify-umalqura'

Vue.component(VHijriDatePicker.name, VHijriDatePicker)
Vue.use(VueRouter)
const routes = [
  { path: '/inbound', component: InboundRegistry }
]

Vue.config.productionTip = false

const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
