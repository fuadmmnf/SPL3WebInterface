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
            if (user.token) {
                localStorage.setItem('doctorUser', JSON.stringify(user));
                localStorage.setItem('lastDeviceRegistered', user.mobile);
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
