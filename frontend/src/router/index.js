import HomeView from '@/views/HomeView.vue'
import UserView from '@/views/UserView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    }, {
      path: "/user",
      name: "userHome",
      component: UserView
    },
  ],
})

export default router
