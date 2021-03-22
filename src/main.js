import Vue from 'vue'
import App from './App.vue'
import './quasar'
import store from './store'
import { router } from './routes';
import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false
Vue.use(firestorePlugin)


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
