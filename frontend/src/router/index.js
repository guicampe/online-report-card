import AdminUserView from '@/views/AdminUserView.vue'
import HomeView from '@/views/HomeView.vue'
import UserView from '@/views/UserView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Users from '@/components/admin/Users.vue'
import Subjects from '@/components/admin/Subjects.vue'
import User from '@/components/admin/User.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminUserView,
      meta: { requiresAdmin: true }
    },
    {
      path: "/admin/users",
      name: "adminUsers",
      component: Users,
      meta: { requiresAdmin: true }
    },
    {
      path: "/admin/subjects",
      name: "subjects",
      component: Subjects,
      meta: { requiresAdmin: true }
    },
    {
      path: "/admin/:id",
      name: "adminUser",
      component: User,
      meta: { requiresAdmin: true }
    },
    {
      path: "/user",
      name: "user",
      component: UserView,
      meta: { requiresAuth: true }
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: () => import("@/views/UnauthorizedView.vue")
    },
    {
      path: "/unauthenticated",
      name: "unauthenticated",
      component: () => import("@/views/UnauthenticatedView.vue")
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem("token");

  let role = null;
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    }
  } catch (e) {
    localStorage.removeItem("token");
  }

  if (to.meta.requiresAdmin && (!token || role !== "admin")) {
    return token ? "/unauthorized" : "/unauthenticated";
  }

  if (to.meta.requiresAuth && !token) {
    return "/unauthenticated";
  }
})

export default router
