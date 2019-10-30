<template>
  <div class="slect_button">
    <img src="~assets/img/cart/tick.svg" :class="{active: isChecked}" />
  </div>
</template>

<script>
export default {
  name: "SelectButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.slect_button {

  padding-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border: 2px solid #aaa;
    border-radius: 50%;
  }
  .active {
    background-color: red;
    border-color: red;
  }
}
</style>