export default {
    namespaced: true,
    state: {
        user: JSON.parse(localStorage.getItem('doctorUser')),
    },
    getters: {
        getUser(state) {
            return state.user;
        },
    },
    mutations: {
        loggedIn(state, user) {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;
            }
        },
        loggedOut(state) {
            localStorage.removeItem('doctorUser');
            state.user = null;
        },
    },
    actions: {
    },
};
