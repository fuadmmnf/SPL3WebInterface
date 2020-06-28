import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'mainLayout',
      redirect: '/landing',
      component: () => import('./layouts/MainLayout'),
      children:[
        {
          path: '/landing',
          name: 'landingPage',
          component: () => import('./pages/LandingPage')
        },
      ]
    },
    {
      path: '/:handle/:repo/pullrequests',
      name: 'pullrequestsPage',
      component: () => import('./pages/PullRequestListPage'),
    }
  ]
});
