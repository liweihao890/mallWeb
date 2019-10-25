<template>
  <div id="detail">
    <detail-nav-bar :detailTitles="detailTitles"></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goodInfo="goodInfo"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-desc :goodsDesc="goodsDesc"></detail-goods-desc>
    <detail-params-info :paramsInfo="itemSize"></detail-params-info>
  </div>
  
</template>

<script>
//导入子组件
import DetailNavBar from "./chidComps/DetailNavBar";
import DetailSwiper from "./chidComps/DetailSwiper";
import DetailBaseInfo from './chidComps/DetailBaseInfo';
import DetailShopInfo from './chidComps/DetailShopInfo'; 
import DetailGoodsDesc from './chidComps/DetailGoodsDesc';
import DetailParamsInfo from './chidComps/DetailParamsInfo';
//导入网络请求方法
import { getDetailInfo ,Goods,Shop,Goodsdec,Itemsize} from "network/detail.js";
export default {
  name: "detail",
  data() {
    return {
      //iid
      iid: null,
      //导航栏标题
      detailTitles: ["商品", "参数", "评论", "推荐"],
      //保存轮播图数据
      topImages: [],
      //保存商品具体信息
      goodInfo:{},
      //保存店铺信息
      shop:{},
      //保存穿着效果
      goodsDesc:{},
      //保存尺码信息
      itemSize:{},
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsDesc,
    DetailParamsInfo
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
        //获取商品信息组件的信息
        this.goodInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        //获取穿着效果
        this.goodsDesc = new Goodsdec(data.detailInfo)
        //获取尺码信息
        this.itemSize = new Itemsize(data.itemParams)
      });
    }
  }
};
</script>

<style scoped lang="scss">
#detail{
  //让元素脱离文档流
  position: relative;
  z-index: 99;
  // height: 100vh;
  background-color: $color_background;
  
  
}
</style>