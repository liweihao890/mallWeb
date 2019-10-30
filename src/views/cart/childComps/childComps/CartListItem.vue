<template>
  <div class="cart_item">
   <select-button :isChecked="product.checked"
    @click.native="isChecked"></select-button>
    <div class="item_img">
      <img :src="product.image" />
    </div>
    <div class="item_content">
      <div class="item_title">{{ product.title }}</div>
      <div class="item_desc">{{ product.desc }}</div>
      <div class="item_bottom">
        <div class="left item_price">￥{{ product.price }}</div>
        <div class="right item_count">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectButton from 'components/content/selectButton/SelectButton'
export default {
  name: "CartListItem",
//   data(){
//       return{
//           checked: false
//       }
//   },
  components:{
      SelectButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods:{
      isChecked(){
          this.product.checked = !this.product.checked;
      }
  }
};
</script>

<style scoped lang="scss">
.cart_item {
  padding: 5px;
  @include borderBottom(2px);
  display: flex;

  .item_img {
    margin-right: 10px;
    img {
      width: 80px;
      border-radius: 5px;
      text-align: center;
      
    }
  }
  .item_content {
    width: 75%;
    .item_title,
    .item_desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item_title{
        font-size: 18px;
        color: $color_title;
        margin: 15px 0;
    }
    .item_desc{
        font-size: 14px;
        margin-bottom: 20px;
    }
    .item_bottom{
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right:15px;
        .item_price{
            color: $color_high-text;
            font-size: 24px;
        }
    }
  }
}
</style>