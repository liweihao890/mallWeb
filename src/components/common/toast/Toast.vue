<template>
    <div class="toast"  v-show="isShow">
            <div class="aa" >
                {{message}}
            </div>
    </div>
</template>

<script>
    export default {
        name: 'Toast',
        data(){
            return{
                message: 'hghhagh',
                isShow: false
            }
        },
        methods:{
            show(message="默认文字", duration=1500){
                this.isShow = true
                this.message = message
                setTimeout( () => {
                    this.isShow = false
                    this.message = ''
                },duration)
                
            }
        }
    }
</script>

<style scoped>
    .toast{
        border-radius: 10px;
        padding: 5px 10px;
        color: #fff;
        background-color: rgba(0,0,0,0.75);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 99999;
    }
</style>