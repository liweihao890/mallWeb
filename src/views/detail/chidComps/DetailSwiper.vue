<template>
  <swiper class="detail_swiper">
    <swiper-item v-for="(item,index) in topImages" :key = "index" class="swiper_item">
      <img :src="item" >
    </swiper-item>
  </swiper>
</template>

<script>
//导入公共组件
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
      topImages: {
          type: Array,
          default(){
              return []
          } 
      },
  },
};
</script>

<style scoped lang="scss">
.swiper_item{
  font-size: 0;
  height: 0;
  position: relative;
  padding-bottom:  67.87%;
  img{
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
}


</style>