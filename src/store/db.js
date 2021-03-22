import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    namespaced: true,
    state: {
        db: firebase.firestore(),
    },
    getters: {
        getDB(state) {
            return state.db;
        },
    },
    mutations: {},
    actions: {},
};
