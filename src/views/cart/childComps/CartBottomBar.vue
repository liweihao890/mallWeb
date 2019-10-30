<template>
    <div class="bottom_bar">
        <div class="bar_left">
            <select-button class="s_btn"></select-button>
            <span>全选</span>
        </div>
        <div class="bar_center">
            <span>
                总计是: ￥{{totalPrice}}
            </span>
        </div>
        <div class="bar_right">
            <span>
                去计算({{count}})
            </span>
        </div>
    </div>
</template>

<script>
import SelectButton from 'components/content/selectButton/SelectButton';
//导入getter属性
import {mapGetters} from 'vuex';
    export default {
        name: 'CartBottomBar',
        components:{
            SelectButton
        },
        computed:{
            ...mapGetters(['cartList']),
            totalPrice(){
               return  this.cartList.filter( item => item.checked ).reduce( (preValue,item)=>{
                   return item.price * item.count
               }, 0).toFixed(2)
            },
            count(){
                return this.cartList.filter( item => item.checked).length
            }
        }
    }
</script>

<style scoped lang="scss">
.bottom_bar{
    background-color: #eee;
    height: 40px;
    width: 100%;
    font-size: 14px;
    position: fixed;
    bottom: 49px;
    display: flex;
    .bar_left{
        height: 100%;
        width: 80px;
        display: flex;
        padding: 0 5px;
        align-items: center;
        .s_btn{
            margin-right: 5px;
        }
    }
    .bar_center,.bar_right{
        height: 40px;
        line-height: 40px;
        text-align: center;
        
    }
    .bar_center{
        flex: 1;
        
        color: $color_title;
    }
    .bar_right{
        width: 120px;
        background-color: #FF4500;
        color: #fff;
    }

}
</style>