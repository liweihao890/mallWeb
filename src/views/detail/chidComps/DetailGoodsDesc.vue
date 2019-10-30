<template>
  <div class="goods_desc" v-if="Object.keys(goodsDesc).length !==0">
  <div>
      <div class="desc_start"></div>
      <div class="desc_info">{{ goodsDesc.desc }}</div>
      <div class="desc_end"></div>
  </div>
    
    <div class="desc_key">{{ goodsDesc.key }}</div>
    <div class="desc_gallery">
        <img :src="item" v-for="(item, index) in goodsDesc.img " :key="index" @load="imgLoad">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsDesc",
  props: {
    goodsDesc: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data(){
    return {
      counter: 0,
      imgLength: 0,
    }
  },
  methods:{
    imgLoad(){
      if( ++this.counter === this.imgLength){
        this.$emit('imageLoad')
      }
    },
  },
  watch: {
    goodsDesc(){
      // 获取图片的个数
      this.imgLength = this.goodsDesc.img.length;
    }
  },
};
</script>

<style scoped lang="scss">
.goods_desc{
    width: auto;
    padding: 0 3px;
    @include borderBottom(5px)
}
.desc_start,.desc_end{
    width: 90px;
    height: 1px;
    background-color: #A3A3A5;
    position: relative;
    
}
.desc_start{
    float: left;
    &::before{
        content: '';
        width: 5px;
        height: 5px;
        background-color: $color_title;
        position: absolute;
        bottom: 0;
        
    }
}
.desc_end{
    float: right;
    &::after{
        content: '';
        width: 5px;
        height: 5px;
        background-color: $color_title;
        position: absolute;
        bottom: 0;
        right: 0;
    }
}
.desc_info{
    padding: 15px 0;
    font-size: 14px;
}
.desc_key{
    margin: 10px 0 10px 15px;
    color: $color_title;
    font-size: 15px;
}
.desc_gallery img{
    width: 100vw;
    height: 100%;
}
</style>