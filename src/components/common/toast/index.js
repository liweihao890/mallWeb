import Toast from './Toast'
const toast = {}

toast.install = function (Vue) {
    //1. 创建组件构造器
    const toastContructor = Vue.extend(Toast)
    //2. 创建实例化组件对象
    const toast = new toastContructor()
    //3. 手动挂载到某一个元素上
    let DOM = toast.$mount(document.createElement('div')).$el
    //4. 将toast.$el对应就是div
    document.body.appendChild(DOM)
    //5. 将toast添加到Vue的原型对象,也就是可以全局使用$toast
    Vue.prototype.$toast = toast
}

export default toast