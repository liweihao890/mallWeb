<template>
  <div id="home">
    <!-- 导航栏模块 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control2"
      :titles="tabTitles"
      @tabItemClick="tabClick"
      ref="tabControl2"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />

      <feature-view />
      <tab-control
        class="tab-control1"
        :titles="tabTitles"
        @tabItemClick="tabClick"
        ref="tabControl1"
      ></tab-control>
      <goods-list :goods="showTab"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 导入公共组件
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
// 导入子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
// 导入请求方法
import { getHomeMultidata, getHomeGoods } from "network/home.js";
import {itemListenerMixin,backTop} from "common/mixin"
export default {
  mixins: [itemListenerMixin,backTop], 
  data() {
    return {
      banners: [],
      recommends: [],
      tabTitles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      
    };
  },
  computed: {
    showTab() {
      return this.goods[this.currentType].list;
    }
  },
  components: {
    NavBar,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
  },
  created() {
    //获取主页上的多个数据
    this.getHomeMultidata();
    //获取流行商品的数据
    this.getHomeGoods("pop");
    // 获取新款商品的数据
    this.getHomeGoods("new");
    //获取精品商品的数据
    this.getHomeGoods("sell");
  },

  methods: {
    //组件HomeSwiper的方法
    //获取tabOffetTop值
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
      // console.log(this.tabOffsetTop)
    },

    //组件tabControl的方法
    //获取当前点击item的index，
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //保存currentIndex,让tabControl1和tabControl2保持同步
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //实现点击回到顶部功能
    //监听点击事件
    backTopClick() {
      //拿到scroll组件
      let scroll = this.$refs.scroll;

      // 调用scroll组件里面的scrollTo方法
      scroll.scrollTo(0, 0);
    },

    //组件scroll的方法
    //根据当前滚动的位置实现回到顶部的图标是否显示,tabControl是否吸顶
    contentScroll(position) {
      //根据位置判断返回首页图标的显示
      this.isShowBack(-position.y);
      //判断tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
      // console.log(this.isTabFixed)
      // this.saveY = this.$refs.scroll.getScrollY()
    },
    //完成加载更多数据功能
    loadMore() {
      this.getHomeGoods(this.currentType);
      // console.log(this.currentType)
      //启用完成加载事件，并且以后都可以不断加载，而不是一次加载就没了
      this.$refs.scroll.finishPullUp();
    },

    /*网络请求获取数据 */
    //获取主页上的多个数据数据
    getHomeMultidata() {
      getHomeMultidata()
        .then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
        .catch(err => console.log(err));
    },
    // 获取各类商品的数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page)
        .then(res => {
          //把获取的数据添加到之前的数据中,而且不要覆盖原来的数组
          // for(item in res.list.data ){
          //   this.goods[type].list.push(item)
          // }
          //第二种方法
          this.goods[type].list.push(...res.data.list);
          // 页数+1
          this.goods[type].page++;
        })
        .catch(err => console.log(err));
    }
  },
  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
     this.$refs.scroll.refresh();
  },
  //离开页面时，将saveY修改为当前滚动的位置
  deactivated() {
    //保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    //取消事件总线监听
    this.$bus.$off('imgLoadFinish',this.itemImgListener)
  }
};
</script>

<style scoped lang="scss">
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: $color_tint;
  color: #ffffff;
  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;  */
}

.content {
  @include content_height(44px);
}

.tab-control2 {
  // position: relative;
  z-index: 9;
  position: fixed;
  left: 0;
  right: 0;
  top: 40px;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>