import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    namespaced: true,
    state: {
        db: firebase
            .initializeApp({
                apiKey: "AIzaSyDVInwqRQeGDsn_RrpRIe452EP62ukApLQ",
                authDomain: "spl3-clonedetector.firebaseapp.com",
                projectId: "spl3-clonedetector",
                storageBucket: "spl3-clonedetector.appspot.com",
                messagingSenderId: "11012489956",
                appId: "1:11012489956:web:533037a727be0851e422f1",
                measurementId: "G-S8V2C943TW"
            }).firestore(),
    },
    getters: {
        getDB(state) {
            return state.db;
        },
    },
    mutations: {
        updateUser(state, user) {
            state.db.collection('users').doc(user.uid).set(user)
        }
    },
    actions: {},
};
