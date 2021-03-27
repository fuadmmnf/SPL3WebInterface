import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'landingPage',
            redirect: 'detector',
            component: () => import('@/layouts/default'),
            children: [
                {
                    path: 'detector',
                    name: 'detectorPage',
                    component: () => import('@/pages/Detector'),
                },
                {
                    path: 'collections',
                    name: 'collectionsPage',
                    component: () => import('@/pages/Collections'),
                },
                {
                    path: 'collections/:collection_id',
                    name: 'collectionDetailsPage',
                    component: () => import('@/pages/CollectionDetails'),
                },
            ]
        },
        // {
        //     path: '/login',
        //     name: 'authPage',
        //     component: () => import('@/pages/Login'),
        // },
    ],
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
});
