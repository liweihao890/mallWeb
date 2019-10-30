import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'
export default {
    addToCartList(context, payload) {
        //payload新添加的商品，判断在购物车列表是否存在
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        //根据oldProduct的存在，进行计数或者存储操作
        if (!oldProduct) {
            context.commit(ADD_TO_CART, payload)
        } else {
            context.commit(ADD_COUNTER, oldProduct)
        }
    }
}