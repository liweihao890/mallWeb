<template>
  <div class="cart_list">
    <cart-list-item :product="item" v-for="(item, index) in cartList" :key="index"></cart-list-item>
  </div>
</template>

<script>
import CartListItem from "./childComps/CartListItem";
//导入getters属性
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  computed: {
    ...mapGetters({
      cartList: "cartList"
    })
  },
  components: {
    CartListItem
  }
};
</script>

<style scoped lang="scss">
.cart_list {
  height: 100%;
}
</style>