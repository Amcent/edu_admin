import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import DataStore from '@/global/storage/index';
import authService from '../global/service/auth';
import Store from '@/store/index';

Vue.use(VueRouter);

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  NProgress.start();

  const TOKEN = DataStore.getToken();

  if (!TOKEN && to.name !== 'Login') {
    next({ name: 'Login', replace: true });
    return;
  }

  if (TOKEN && to.name === 'Login') {
    next({ name: 'Root', replace: true });
    return;
  }

  if (to.meta.permission) {
    const permission = to.meta.permission;
    const permissions = Store.state.permissions;

    if (permissions && permissions.length) {
      if (permissions.indexOf(permission) === -1) {
        next({ name: 'Forbidden', replace: true });
        return;
      }
    } else {
      authService.getPermission().then(res => {
        const permissions = JSON.parse(res);
        if (permissions.indexOf(permission) === -1) {
          next({ name: 'Forbidden', replace: true });
          return;
        }
      });
    }
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
