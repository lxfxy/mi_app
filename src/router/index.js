import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: () => import("@/views/home/Home.vue")
  },
  {
    path: '/classify',
    component: () => import("@/views/classify/Classify.vue")
  },
  {
    path: '/shopCart',
    component: () => import("@/views/shopCart/ShopCart.vue")
  },
  {
    path: '/user',
    component: () => import("@/views/user/User.vue"),
    children: [
      {
        path: "address",
        component: () => import("@/views/user/Address.vue")
      }
    ]
  },
  {
    path: '/login',
    component: () => import("@/views/user/Login.vue")
  },
  {
    path: '/register',
    component: () => import("@/views/user/Register.vue")
  },
  {
    path: "/shopInfo",
    component: () => import("@/views/shopInfo/ShopInfo.vue")
  },
  {
    path: "*",
    redirect: "/home"
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
