import { ADD_COUNTER, ADD_TO_CART } from './mutations-types'
import { reject } from 'q'
export default {
    addToCartList(context, payload) {
        return new Promise((resolve, reject) => {
            //payload新添加的商品，判断在购物车列表是否存在
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            //根据oldProduct的存在，进行计数或者存储操作
            if (!oldProduct) {
                //添加新商品
                context.commit(ADD_TO_CART, payload)
                resolve('添加新商品成功')
            } else {
                //商品数量+1
                context.commit(ADD_COUNTER, oldProduct)
                resolve('商品数量+1')
            }
        })

    }
}