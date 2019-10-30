<template>
  <nav-bar>
    <div slot="left" class="back" @click="backHome">
      <img src="~assets/img/common/back.svg" />
    </div>
    <div slot="center" class="titles">
      <div
        v-for="(item,index) in detailTitles"
        :key="index"
        class="title_item"
        @click="navClick(index)"
        :class="{active: currentIndex === index}"
      >{{ item }}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    detailTitles: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  components: {
    NavBar
  },
  methods: {
    navClick(index) {
      //点击导航标题处获取当前的index值,并且保存
      this.currentIndex = index;
      //将点击后的index传出去
      this.$emit("tabClick", index);
    },
    //点击返回图标，返回主页
    backHome() {
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="scss">
.back {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.titles {
  display: flex;
  font-size: 13px;
  .title_item {
    flex: 1;
  }
  .active {
    color: $color_high-text;
  }
}
</style>