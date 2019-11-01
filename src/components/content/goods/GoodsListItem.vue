<template>
  <div class="goods-item" @click="toDetail">
    <img v-lazy="showImage" @load="loadFinish" />
    <div class="goods-info">
      <p >{{ goodsItem.title}}</p>
      <span class="price">{{ goodsItem.price}}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
 name:"GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    },
  },
  methods:{
    loadFinish(){
      //图片加载完成后，通过事件总线机制，发射事件
      this.$bus.$emit('imgLoadFinish')
    },
    toDetail(){
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
};
</script>

<style scoped lang="scss">
.goods-item {
  padding-bottom: 40px;
  width: 175px;
  position: relative;
  img {
    width: 100%;
    border-radius: 5px;
  }
}

.goods-info {
  font-size: 12px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  overflow: hidden;
  text-align: center;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
  }
  .price {
    color: $color_high_text;
    margin-right: 20px;
  }
  .collect {
    position: relative;
    &::before {
     content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
      
    }
  }
}


</style>
