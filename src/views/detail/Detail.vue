<template>
  <div id="detail">
    <detail-nav-bar :detail-titles="detailTitles" class="detail_nav" @tabClick="tabClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :good-info="goodInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-desc :goods-desc="goodsDesc" @imageLoad="imageLoad"></detail-goods-desc>
      <detail-params-info :params-info="itemSize" ref="params"></detail-params-info>
      <detail-comment :comment="comment" ref="comment"></detail-comment>
      <div class="text">推荐商品</div>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
  </div>
</template>

<script>
//导入子组件
import DetailNavBar from "./chidComps/DetailNavBar";
import DetailSwiper from "./chidComps/DetailSwiper";
import DetailBaseInfo from "./chidComps/DetailBaseInfo";
import DetailShopInfo from "./chidComps/DetailShopInfo";
import DetailGoodsDesc from "./chidComps/DetailGoodsDesc";
import DetailParamsInfo from "./chidComps/DetailParamsInfo";
import DetailComment from "./chidComps/DetailComment";
import DetailBottomBar from "./chidComps/DetailBottomBar";
// 导入公共组件
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
//导入网络请求方法
import {
  getDetailInfo,
  getRecommend,
  Goods,
  Shop,
  Goodsdec,
  Itemsize,
  Comment
} from "network/detail.js";
import { itemListenerMixin, backTop } from "common/mixin";
import { debounce } from "common/utils";
import {mapActions} from 'vuex';

export default {
  name: "detail",
  mixins: [itemListenerMixin, backTop],
  data() {
    return {
      //iid
      iid: null,
      //是否吸顶
      isTabFixed: false,
      //导航栏标题
      detailTitles: ["商品", "参数", "评论", "推荐"],
      //标题与内容的值
      themeTopYs: [],
      //保存得到组件的offsetTop
      getThemeTopY: null,
      //当前index
      currentIndex: 0,
      //保存轮播图数据
      topImages: [],
      //保存商品具体信息
      goodInfo: {},
      //保存店铺信息
      shop: {},
      //保存穿着效果
      goodsDesc: {},
      //保存尺码信息
      itemSize: {},
      //保存评论信息
      comment: {},
      //保存推荐商品信息
      recommend: []
    };
  },

  components: {
    DetailNavBar,
    Scroll,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsDesc,
    DetailParamsInfo,
    DetailComment,
    GoodsList,
    DetailBottomBar
  },

  created() {
    //保存iid
    this.iid = this.$route.params.iid;
    //获取detail页面需要的数据
    this.getDetailInfo(this.iid);
    //保存offsetTop值，并进行保存，对其进行防抖操作,这里一定要在获取数据后面，否则$el就获取不到数据
    this.getThemeTopY = debounce(() => {
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },

  mounted() {
    //获取推荐商品的信息
    this.getRecommend();
  },
  //离开详情页取消事件总线的监听
  destroyed() {
    //取消事件总线监听
    this.$bus.$off("imgLoadFinish", this.itemImgListener);
  },

  methods: {
    //将vuex状态管理器中的方法映射到这里
    ...mapActions(['addToCartList']),
    // 封装网络请求方法,根据id获取数据
    getDetailInfo(iid) {
      getDetailInfo(iid).then(res => {
        console.log(res.result);
        // 获取有用的信息的集合
        const data = res.result;
        //获取轮播图图片数据
        this.topImages = data.itemInfo.topImages;
        //获取商品信息组件的信息
        this.goodInfo = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo);
        //获取穿着效果
        this.goodsDesc = new Goodsdec(data.detailInfo);
        //获取尺码信息
        this.itemSize = new Itemsize(data.itemParams);
        //判断有无评论获取评论信息
        if (data.rate.cRate !== 0) {
          this.comment = new Comment(data.rate);
        }
      });
    },

    //获取推荐商品的信息
    getRecommend() {
      getRecommend().then(res => {
        this.recommend = res.data.list;
      });
    },
    //组件scroll的方法
    //根据当前滚动的位置实现回到顶部的图标是否显示,tabControl是否吸顶
    contentScroll(position) {
      //拿到position
      let pos = -position.y;
      //将位置与offsetTop对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          (pos >= this.themeTopYs[i] && pos < this.themeTopYs[i + 1])
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //根据滚动位置判断返回首页的图标是否显示
      this.isShowBack(pos);
      //判断tabControl是否吸顶
      this.isTabFixed = pos > this.tabOffsetTop;
    },
    imageLoad() {
      //图片加载完后，对高度计算进行刷新
      this.$refs.scroll.refresh();
      //图片加载完后，重新计算每个组件的offsetTop值
      this.getThemeTopY();
    },
    //监听NavBar的index
    tabClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    //监听加入购物车的事件
    addCart() {
      //购物车需要获得的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goodInfo.title;
      product.desc = this.goodInfo.desc;
      product.price = this.goodInfo.realPrice;
      product.iid = this.iid;
      //将商品信息发送到状态管理器
      // this.$store.dispatch("addToCartList", product).then(res => console.log(res));
      this.addToCartList(product).then(res => {
        
        this.$toast.show(res,2000)
        
      }
      )
    }
  }
};
</script>

<style scoped lang="scss">
#detail {
  //让元素脱离文档流
  position: relative;
  z-index: 99;
  height: 100vh;
  background-color: $color_background;
  .detail_nav {
    background-color: $color_background;
  }
  .content {
    @include content_height(49px);
  }
  .text {
    margin: 10px 0;
    font-size: 24px;
    color: $color_title;
  }
}
</style>