import Vue from 'vue'
import App from './App.vue'
import './quasar'
import store from 'store'
import { router } from './routes';
import { firestorePlugin } from 'vuefire'
import firebase from "firebase";

Vue.config.productionTip = false
Vue.use(firestorePlugin)

firebase
    .initializeApp({
        apiKey: "api-key",
        authDomain: "project-id.firebaseapp.com",
        databaseURL: "https://project-id.firebaseio.com",
        projectId: "project-id",
        storageBucket: "project-id.appspot.com",
        messagingSenderId: "sender-id",
        appId: "app-id",
        measurementId: "G-measurement-id"
    })

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
