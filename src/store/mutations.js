import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'
export default{
     //商品不存在，添加count属性赋值为1，添加到state.carList
     [ADD_TO_CART](state,payload){
        payload.count = 1;
        //添加checked属性
        payload.checked = true;
        state.cartList.push(payload)
      },
      //商品存在，计数+1
      [ADD_COUNTER](state, payload){
        payload.count++
      }
      
}