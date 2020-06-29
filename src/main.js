import Vue from 'vue'
import App from './App.vue'
import { router } from './router';
import GlobalVars from "./globals";
import axios from 'axios'
import VueAxios from 'vue-axios'
import Buefy from 'buefy';

Vue.use(VueAxios, axios);
Vue.use(Buefy, {
  defaultIconPack: 'fa',
});

Vue.prototype.$globals = new GlobalVars();
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
