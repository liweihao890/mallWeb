<template>
  <div class="cart">
    <nav-bar class="cart_nav_bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
  <scroll class="content" ref="scroll">
    <cart-list></cart-list>
  </scroll>
  <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
//导入公共组件
import NavBar  from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
//导入子组件
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar';
//导入getters属性
import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      Scroll,
      CartList,
      CartBottomBar
    },
    computed:{
      ...mapGetters({
        length: 'cartListLength',
        list: 'cartList'
      })
    },
    //进入页面以后重新计算高度
    activated(){
      this.$refs.scroll.refresh()
    }

  }
</script>

<style scoped lang="scss">
.cart_nav_bar{
  background-color: $color_high-text;
  color: #fff;
  font-size: 18px;
}
.content{
  @include content_height(89px);
}
</style>
