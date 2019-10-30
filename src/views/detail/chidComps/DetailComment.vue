<template>
    <div class="detail_comment" v-if="Object.keys(comment).length !== 0">
        <div class="co_header">
            <img :src="comment.avatar" >
            <span>
                {{comment.uname}}
            </span>
        </div>
        <div class="co_content">
            {{comment.content}}
        </div>
        <div class="co_style">
            <span>
                {{comment.createdTime | showDate}}
            </span>
            <span>
                {{comment.style}}
            </span>
        </div>
        <div class="co_pictures" v-if="comment.images !== null">
            <div class="co_picture" v-for="(item,index) in comment.images" :key="index">
                <img :src="item">
                    
            </div>
        </div>
    </div>
</template>

<script>
import {dateFormat} from 'common/utils'
    export default {
        name: 'DetailComment',

        props: {
            comment: {
                type: Object,
                default(){
                    return {}
                }
            },
        },
        
        filters:{
            showDate(value){
                // 1. 将时间戳转换为Date对象
                const date = new Date(value * 1000)
                //2. 将Date进行格式化
                return dateFormat(date,'yyyy-MM-dd hh:mm')
            }
        }
    }
</script>

<style scoped lang="scss">
.detail_comment{
    @include borderBottom(5px);
    .co_header{
        width: 100%;
        padding: 20px 0;
        font-size: 24px;
        display: table-cell;
        
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 25px;
        }
        span{
            
            height: 40px;
        line-height: 40px;
        vertical-align: middle;
            color: $color_title;
        }
    }
    .co_content{
        text-indent: 2em;
        line-height: 25px;
        
    }
    .co_style{
        margin:13px 0;
        span{
            color: $color_title;
            font-size: 18px;
        }
    }
    .co_pictures{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 7px 2%;
        .co_picture{
            width: 30%;
            margin-right:3.33333%;
            img{
                width: 100%;
            }
        }
    }
}
    
    
</style>