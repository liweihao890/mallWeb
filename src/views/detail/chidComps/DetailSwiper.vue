<template>
  <swiper class="detail_swiper">
    <swiper-item v-for="(item,index) in topImages" :key = "index">
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

.detail_swiper{
    height: 300px;
}
</style>