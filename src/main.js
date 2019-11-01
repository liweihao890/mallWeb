import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import toast from './components/common/toast';
import FastClick from 'fastclick';
import vueLazyload from 'vue-lazyload';

//安装插件
Vue.use(toast)
//安装解决移动端300ms延迟
FastClick.attach(document.body)
Vue.config.productionTip = false

//使用图片懒加载
Vue.use(vueLazyload,{
  preLoad: 1.3,
  loading: require('@/assets/img/common/placeholder.png'),
  attempt: 1     // 加载图片数量
})
//添加事件总线的原型
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

