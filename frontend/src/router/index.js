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
      component: AdminUserView
    },
    {
      path: "/admin/users",
      name: "adminUsers",
      component: Users
    },
    {
      path: "/admin/:id",
      name: "adminUser",
      component: User
    },
    {
      path: "/admin/subjects",
      name: "subjects",
      component: Subjects
    },
    {
      path: "/user",
      name: "user",
      component: UserView
    },
  ],
})

export default router
