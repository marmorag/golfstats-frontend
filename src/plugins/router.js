import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    // eslint-disable-next-line global-require
    component: require('../views/Home').default,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    // eslint-disable-next-line global-require
    component: require('../views/Login').default,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/account',
    name: 'account',
    // eslint-disable-next-line global-require
    component: require('../views/Account').default,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    // eslint-disable-next-line global-require
    component: require('../views/Register').default,
    meta: {
      requireAuth: false,
    },
    beforeEnter: async (to, from, next) => {
      const isLogged = await store.getters['auth/isUserLogged'];
      if (isLogged) {
        next({ name: 'home' });
      } else {
        next();
      }
    }
  },
  {
    name: 'logout',
    path: '/logout',
    beforeEnter: async (to, from, next) => {
      await store.dispatch('auth/logout');
      next({ name: 'home' });
    }
  },
  {
    path: '*',
    redirect: { name: 'home' },
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch('auth/initStore');

  if (to.matched.some((record) => record.meta.requireAuth) && !store.getters['auth/isUserLogged']) {
    // requireAuth && !userLogged => redirect to login
    next({ name: 'login' });
  } else if (to.matched.some((record) => record.name === 'login') && store.getters['auth/isUserLogged']) {
    // is auth page && userLogged => redirect to home
    next({ name: 'home' });
  } else {
    // default case
    next();
  }
});

export default router;
