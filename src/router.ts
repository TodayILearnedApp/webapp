import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

import Home from "./views/Home.vue";
import User from "./views/User.vue";
import Form from "./views/Form.vue";
import Edit from "./views/Edit.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/user",
      name: "user",
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/new",
      name: "new-knowledge",
      component: Form,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit/:id",
      name: "edit-knowledge",
      component: Edit,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("home");
  next();
});

export default router;
