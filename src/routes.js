import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'landingPage',
            component: () => import('@/pages/Landing'),
        },
    ],
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
});
