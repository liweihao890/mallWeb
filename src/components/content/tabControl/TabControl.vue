<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item,index) in titles"
      :key="index"
      @click="tabItemClick(index)"
      :class="{active:currentIndex === index}"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },

  methods: {
    tabItemClick(index) {
      this.currentIndex = index;
      //传给父组件当前点击的inddex
      this.$emit('tabItemClick', index);
    }
  }
};
</script>

<style scoped lang="scss">
.tab-control {
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  font-size: 15px;
  display: flex;
  text-align: center;
  position: sticky;
  top: 100px;
  .tab-control-item {
    flex: 1;
    span {
      padding: 6px;
    }
  }
}

.active {
  color: $color_high_text;
}
.active span {
  border-bottom: 3px solid;
}
</style>
