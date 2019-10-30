import { debounce } from "common/utils";
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        //时刻监听goodsItem图片加载完成事件,实时更新better-scroll的计算高度功能
        // this.$bus.$on("imgLoadFinish", () => {
        //   this.$refs.scroll.refresh();
        // });
        //以上的方法每加载一次就更新，次数太过频繁，可以进行防抖操作，减少压力，提高性能
        const refresh = debounce(this.$refs.scroll.refresh, 50);
        //对新的更新方法进行保存，后面取消事件总线监听也要用到
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on("imgLoadFinish", this.itemImgListener);
    },
}

export const backTop = {
    components:{
        BackTop
    },
    data(){
        return {
            //是否显示backTop图标
            isShowBackTop: false,
        }
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0, 0);
          },
          isShowBack(position){
            // //判断图标是否显示
            this.isShowBackTop = position > 1000;
          }
    },
}