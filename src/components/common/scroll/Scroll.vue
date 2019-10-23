<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",

  data() {
    return {
      scroll: null
    };
  },
  props: {
    //是否需要监听位置
    probeType: {
      type: Number,
      default: 0
    },
    //是否需要上拉加载
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1.创建BScroll对象，要取到wrapper元素，必须要挂载到DOM树后才能取到
    this.scroll = new BScroll(this.$refs.wrapper, {
      //内部的div要监听点击事件时要添加这个属性
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    //2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      //2.1 监听滚动的位置事件
      this.scroll.on("scroll", position => {
        //将当前滚动到的位置传出去
        this.$emit("scroll", position);
      });
    }
    //3 监听上拉加载事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    //对滚动到那个位置的方法进行封装
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //对完成加载事件进行封装
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    //完成更新事件的封装
    refresh() {
      this.scroll && this.scroll.refresh();
    
    },
    //得到当前的滚动的位置方法的封装
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>

<style scoped>
</style>
