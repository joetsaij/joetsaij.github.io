import Vue from 'vue'
import App from './App.vue'

import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast, {
  // global options
});

new Vue({
  el: '#app',
  render: h => h(App)
})
