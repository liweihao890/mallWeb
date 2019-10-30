<template>
<!-- 由于goodInfo的数据是异步读取的，在组件created之前需要先判断goodInfo有没有数据 -->
  <div class="detail_base_info" v-if="Object.keys(goodInfo).length !==0">
    <div class="info_title">{{goodInfo.title}}</div>
    <div class="info_price">
      <span class="new_price">{{goodInfo.newPrice}}</span>
      <span class="old_price">{{goodInfo.oldPrice}}</span>
      <span class="discount" v-if="goodInfo.discount">{{ goodInfo.discount }}</span>
    </div>
    <div class="info_other">
      <div>{{ goodInfo.columns[0] }}</div>
      <div>{{ goodInfo.columns[1] }}</div>
      <div>{{ goodInfo.services[goodInfo.services.length-1].name }}</div>
    </div>
    <div class="info_services">
      <div v-for="index in (goodInfo.services.length-1)" :key="index">
        <img :src="goodInfo.services[index-1].icon" >
        <span>{{ goodInfo.services[index-1].name }}</span>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    goodInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created(){
    
  },
};
</script>

<style scoped lang="scss">
.detail_base_info{
  margin-top: 15px;
  padding: 0 8px;
  color:#999;
  @include borderBottom(5px);
  .info_title{
    color: $color_title;
    
  }
  .info_price{
    margin-top: 10px;
    .new_price{
      font-size: 24px;
      color: $color_high-text ;
    }
    .old_price{
      font-size: 13px;
      margin: 0 5px;
      text-decoration: line-through;
    }
    .discount{
      //以下会固定死宽度，最好不要
      // display: inline-block;
      // width: 60px;
      // height: 20px;
      // border-radius: 10px;
      padding: 2px 5px;
      border-radius: 8px;
      font-size: 12px;
      background-color: $color_high-text;
      color: $color_background;
      text-align: center;
      line-height: 20px;
      /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
    }
  }
  .info_other{
    height: 30px;
    border-bottom: 2px solid $color_border;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }
  .info_services{
    height: 60px;
    color: $color_title;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
      width: 14px;
      height: 14px;
      position: relative;
      top: 2px;
    }
  }
}
</style>