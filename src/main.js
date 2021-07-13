import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import VHijriDatePicker from 'vuetify-umalqura'

import Inquire from './views/CorrespondenceInquiry';
import login from './views/login';
import OutboundRegistry from './views/OutboundRegistry';
import InboundRegistry from './views/InboundRegistry';
import viewInquire from './views/Search-adf';
import inboundbox from './views/InboundsBox-adf';
import publicOutboundbox from './views/PublicOutboundsBox-adf';
import internalOutboundbox from './views/InternalOutboundsBox-adf';

//import saudipostreport from './views/SaudiPost-adf';
import sortReports from './views/SortOutBounds-adf';
import saudipostreportIn from './views/OutBoundReportsIn';
import saudipostreportOut from './views/OutBoundReportsOut';
import saudipostreportInbox from './views/OutBoundReportsInbox';
import saudipostreportSmsa from './views/OutBoundReportsSmsa';
import saudipostreportManualDelivery from './views/OutBoundReportsManualDelivery';
import homepage from './views/Homepage-adf';
import alter from './views/alter';
import permissions from './views/Permissions' ;
import store from "./store/store";
import viewOutboundCorrespondence from './views/viewOutboundCorrespondence'



import viewCorrespondence from './views/viewCorrespondence';

import config from './config.json';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import * as TastyBurgerButton from 'vue-tasty-burgers';

import VueHtmlToPaper from 'vue-html-to-paper';
import Vuex from 'vuex';
import 'material-design-icons-iconfont/dist/material-design-icons.css';



Vue.use(Vuex);


// or, using the defaults with no stylesheet
Vue.use(VueHtmlToPaper);


Vue.use(TastyBurgerButton);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.prototype.$config = config;

Vue.component(VHijriDatePicker.name, VHijriDatePicker)
Vue.component('Navbar', require('./components/navigation-adf/navbar2.vue').default)
Vue.use(VueRouter)
const routes = [
  { path: '/inbound', component: InboundRegistry },
  { path: '/outbound', name:"outbound",component: OutboundRegistry },
  { path: '/inquire', component: Inquire },
  { path: '/login', name: 'login', component: login },
  {
    path: '/viewInquire',
    name: 'viewInquire',
    component: viewInquire,
  },
  {
    path: '/viewCorrespondence',
    name: 'viewCorrespondence',
    component: viewCorrespondence,
  },
  {
    path: '/viewOutboundCorrespondence',
    name: 'viewOutboundCorrespondence',
    component: viewOutboundCorrespondence,
  },
  {
    path: '/inboundbox',
    name: 'inboundbox',
    component: inboundbox,
  },
  {
    path: '/publicOutboundbox',
    name: 'publicOutboundbox',
    component: publicOutboundbox,
  },
  {
    path: '/internalOutboundbox',
    name: 'internalOutboundbox',
    component: internalOutboundbox,
  },
  // {
  //   path: '/saudipostreport',
  //   name: 'saudipostreport',
  //   component: saudipostreport,
  // },
  {
    path: '/sortReports',
    name: 'sortReports',
    component: sortReports,
  },
  {
    path: '/saudipostreportIn',
    name: 'saudipostreportIn',
    component: saudipostreportIn,
  },
  {
    path: '/saudipostreportOut',
    name: 'saudipostreportOut',
    component: saudipostreportOut,
  },
  {
    path: '/saudipostreportInbox',
    name: 'saudipostreportInbox',
    component: saudipostreportInbox,
  },
  {
    path: '/saudipostreportSmsa',
    name: 'saudipostreportSmsa',
    component: saudipostreportSmsa,
  },
  {
    path: '/saudipostreportManualDelivery',
    name: 'saudipostreportManualDelivery',
    component: saudipostreportManualDelivery,
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: homepage,
  },
  {
    path: '/alter',
    name: 'alter',
    component: alter,
  },
  {
    path: '/permissions',
    name: 'permissions',
    component: permissions,
  },
  
  //why it is not working?
  // otherwise redirect to home 
  //{ path: '*', redirect: homepage }
  //question
]

Vue.config.productionTip = false

const router = new VueRouter({
  base: '/cms/',
  routes
})
router.replace({ path: 'homepage', redirect: '/homepage' })

new Vue({
  vuetify,
  router,
  store,

  render: h => h(App)
}).$mount('#app')


