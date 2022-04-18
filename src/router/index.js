import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  // 換頁時，滾動到最上方
  scrollBehavior() {
    // console.log(to, from, savedPosition)
    // 如果到達的頁面，路徑名稱符合特定字串的話
    // if (to.fullPath.match('products')) {
    //   return {
    //     top: 500
    //   }
    // }
    return {
      top: 0,
    };
  },
});

export default router;
