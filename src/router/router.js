import Vue from 'vue'
import Router from 'vue-router'

//安装路由
Vue.use(Router)
//路由懒加载组件
const home = () => import('views/home/Home.vue')
const category = () => import('views/category/Category')
const cart = () => import('views/cart/Cart')
const profile = () => import('views/profile/Profile')
const detail = ( ) => import('views/detail/Detail')
// 定义路由映射
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:home,
    
  },
  {
    path:'/category',
    component:category
  },
  {
    path:'/cart',
    component:cart
  },
  {
    path:'/profile',
    component:profile
  },
  {
    path: '/detail/:iid',
    component: detail
  }

] 
//配置动态路由获取
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
// 导出路由
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
