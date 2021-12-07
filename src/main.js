import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import VHijriDatePicker from 'vuetify-umalqura'
import Inquire from './views/CorrespondenceInquiry-adf';
import login from './views/login-adf';
import OutboundRegistry from './views/OutboundRegistry-adf';
import InboundRegistry from './views/InboundRegistry-adf';
import viewInquire from './views/Search-adf';
import resend from './views/ResendOutboundRegistry-adf';
import inboundbox from './views/InboundsBox-adf';
import publicOutboundbox from './views/PublicOutboundsBox-adf';
import internalOutboundbox from './views/InternalOutboundsBox-adf';
//import saudipostreport from './views/SaudiPost-adf';
// import sortReports from './views/SortOutBounds-adf';
import saudipostreportIn from './views/OutBoundReportsIn-adf';
import saudipostreportOut from './views/OutBoundReportsOut-adf';
import saudipostreportInbox from './views/OutBoundReportsInbox-adf';
import saudipostreportSmsa from './views/OutBoundReportsSmsa-adf';
import saudipostreportManualDelivery from './views/OutBoundReportsManualDelivery-adf';
import homepage from './views/Homepage-adf';
import alter from './views/alter-adf';
import permissions from './views/Permissions-adf';
import { store } from "./store/store";
import viewOutboundCorrespondence from './views/viewOutboundCorrespondence-adf'
import viewCorrespondence from './views/viewCorrespondence-adf';
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
// to store Objects
if ( !Storage.prototype.setObject ) {
  Storage.prototype.setObject = function(key, value) {
      this.setItem(key, JSON.stringify(value));
  }
}

if ( !Storage.prototype.getObject ) {
  Storage.prototype.getObject = function(key) {
      var value = this.getItem(key);
      return value && JSON.parse(value);
  }
}

const routes = [
  { path: '/inbound', component: InboundRegistry },
  { path: '/outbound', name: "outbound", component: OutboundRegistry },
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
  {
    path: '/resend',
    name: 'resend',
    component: resend,
  },
  // {
  //   path: '/saudipostreport',
  //   name: 'saudipostreport',
  //   component: saudipostreport,
  // },
  // {
  //   path: '/sortReports',
  //   name: 'sortReports',
  //   component: sortReports,
  // },
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
  routes,
  // mode: "abstract"

})
router.replace({ path: 'homepage', redirect: '/homepage' })

// By Abdullah 15-08-2021 -------- START
router.beforeEach((to, from, next) => {
  console.log("All store.state.permissions      " + store.state.permissions);
  console.log("All store.state.path             " + store.state.path);
  if (store.state.permissions != null) {
    console.log("IF 1 ..... ");
    console.log("store.state.path.length  " + store.state.path.length);
    console.log("to  " + to.path.toString());
    var exitLoop = "NO";
    for (var i = 0; i < store.state.path.length; i++) {
      if (store.state.path[i] == to.path.toString()) {
        console.log(store.state.permissions[i]);
        console.log("----------------------for-if >> to: " + to.path.toString());
        next()
        exitLoop = "YES";
      }
      console.log("exitLoop : " + exitLoop);
    }
    if (exitLoop == "NO") {
      console.log("Copying Or Pasting an invalid URL is Not Working Anymore.......!!");
      next("/alter");
    }
  } else {
    // If all paths are not in store.state.path>> the page will be directly redirected To /homepage
    console.log("invalid URL .....!!");
    next()
  }
})
// By Abdullah 15-08-2021 -------- END

new Vue({
  vuetify,
  router,
  store,

  render: h => h(App)
}).$mount('#app')


