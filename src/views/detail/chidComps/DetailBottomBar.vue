<template>
    <div class="bottom_bar">
        <div class="bar_item bar_left">
            <div>
                <i class="icon service"></i>
            <span class="text">客服</span>
            </div>
            <div>
                <i class="icon shop"></i>
            <span class="text">店铺</span>
            </div>
            <div>
                <i class="icon collect"></i>
            <span class="text">收藏</span>
            </div>
        </div>
        <div class="bar_item bar_right">
            <div class="cart" @click="addToCart">加入购物车</div>
            <div class="buy">购买</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DetailBottomBar',
        methods:{
            addToCart(){
                this.$emit("addToCart")
            }
        }
    }
</script>

<style scoped lang="scss">
.bottom_bar{
height: 49px;
width: 100%;
background-color: $color_background;
position: fixed;
bottom: 0;
left: 0;
right: 0;
z-index: 99;
display: flex;
.bar_item{
    flex: 1;
}
.bar_left{
    display: flex;
    
    div{
        flex: 1;
        text-align:center;
    }
    .icon{
        display: block;
        width: 22px;
        height: 22px;
        background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
        margin: 6px auto 3px;
    }
    .service{
            background-position: 0 -54px;
        }
    .shop{
        background-position: 0 -98px;
    }
}
.bar_right{
    display: flex;
    .cart,.buy{
        height: 49px;
        line-height: 49px;
        flex: 1;
        text-align: center;
    }
    .cart{
        background-color: #FFE613;
        color: $color_title;
    }
    .buy{
        background-color: #FF5677;
        color: #fff;
    }
}
}
</style>