<template>
  <div class="shop_info">
    <div class="info_header">
      <img :src="shop.logo" alt />
      <span>{{ shop.name }}</span>
    </div>
    <div class="info_content">
      <div class="info_content_left">
        <div class="info_sells">
          <div class="sells_count">{{ shop.sells | sellCountFilter}}</div>
          <div class="sells_text">总销量</div>
        </div>
        <div class="info_goodsCount">
          <div class="goods_count">{{ shop.goodsCount}}</div>
          <div class="goods_text">全部宝贝</div>
        </div>
      </div>
      <div class="info_content_right">
        <table class="info_score">
          <tr v-for="(item, index) in shop.score" :key="index">
            <td class="score_name">{{ item.name }}</td>
            <td
              class="score_score"
              :class="{ good: item.isBetter, worse: !item.isBetter }"
            >{{ item.score }}</td>
            <td
              class="score_isBetter"
              :class="{ goodRange: item.isBetter, worseRange: !item.isBetter }"
            >{{ item.isBetter ? '高' : '低' }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="info_footer">
        <div class="info_desc">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  data() {
    return {};
  },
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    sellCountFilter: function(value) {
      if (value < 10000) {
        return value;
      }
      return (value / 10000).toFixed(1) + "万";
    }
  }
};
</script>

<style scoped lang="scss">
.shop_info {
  width: 100%;
  padding: 25px 8px;
  @include borderBottom(5px);
  .info_header {
    display: flex;
    align-items: center;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    span {
      margin-left: 10px;
    }
  }
  .info_content {
    display: flex;
    margin-top: 15px;
    .info_content_left,
    .info_content_right {
      flex: 1;
    }
    .info_content_left {
      display: flex;
      justify-content: space-evenly;
      color: #333;
      text-align: center;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
    .sells_count,
    .goods_count {
      color: $color_title;
      font-size: 18px;
    }
    .sells_text,
    .goods_text {
      font-size: 12px;
      margin-top: 10px;
    }
    .info_score {
      width: 120px;
      margin-left: 30px;
      font-size: 13px;
      color: $color_title;
      td {
        padding: 5px 0;
      }
      //评分比较好的
      .good {
        @include betterColor(true);
      }
      //评分差的
      .worse {
        @include betterColor(false);
      }
      //等级比较好的
      .goodRange {
        @include betterBackgroundColor(true);
      }
      //等级比较差的
      .worseRange {
        @include betterBackgroundColor(false);
      }
    }
    
  }
  .info_footer{
        margin-top: 10px;
        display: flex;
        justify-content: center;
    .info_desc{
        width: 150px;
        height: 30px;
        background-color: #F2F5F8;
        color: $color_title;
        font-size: 18px;
        border: solid 2px #F2F5F8;
        border-radius: 10px;
        line-height: 30px;
        text-align: center;
    }
    }
}
</style>