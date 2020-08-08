import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location: any) {
  return (originalPush.call(this, location) as any).catch((err: any) => err)
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/layout/index.vue'),
    redirect: { name: 'Overview' },
    children: [
      {
        path: '/overview',
        name: 'Overview',
        meta: { title: '后台概览' },
        component: () => import('@/views/overview/index.vue')
      },
      {
        path: '/account',
        name: 'Account',
        meta: { title: '账户设置' },
        component: () => import('@/views/account/index.vue')
      },
      {
        path: '/plans',
        name: 'Plans',
        meta: { title: '计划变动' },
        component: () => import('@/views/plans/index.vue')
      },
      {
        path: '/expense',
        name: 'Expense',
        meta: { title: '费用统计' },
        component: () => import('@/views/expense/index.vue')
      },
      {
        path: '/payment',
        name: 'Payment',
        meta: { title: '付款方式' },
        component: () => import('@/views/payment/index.vue')
      },
      {
        path: '/additionService',
        name: 'AdditionService',
        meta: { title: '附加服务' },
        component: () => import('@/views/additionService/index.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/visual',
    name: 'Visual',
    component: () => import('@/views/visual/index.vue')
  },
  {
    path: '/charts',
    name: 'Charts',
    component: () => import('@/views/charts/index.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
