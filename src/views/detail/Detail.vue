<template>
  <div id="detail">
    <detail-nav-bar :detailTitles="detailTitles"></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
  
</template>

<script>
//导入子组件
import DetailNavBar from "./chidComps/DetailNavBar";
import DetailSwiper from "./chidComps/DetailSwiper";
//导入网络请求方法
import { getDetailInfo } from "network/detail.js";
export default {
  name: "detail",
  data() {
    return {
      //iid
      iid: null,
      //导航栏标题
      detailTitles: ["商品", "参数", "评论", "推荐"],
      //保存轮播图数据
      topImages: []
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper
  },
  created() {
    //保存iid
    this.iid = this.$route.params.iid;
    //获取detail页面需要的数据
    this.getDetailInfo(this.iid);
  },
  methods: {
    // 封装网络请求方法,根据id获取数据
    getDetailInfo(iid) {
      getDetailInfo(iid).then(res => {
        console.log(res.result);
        // 获取有用的信息的集合
        const data = res.result;
        //获取轮播图图片数据
        this.topImages = data.itemInfo.topImages;
      });
    }
  }
};
</script>

<style scoped>
</style>