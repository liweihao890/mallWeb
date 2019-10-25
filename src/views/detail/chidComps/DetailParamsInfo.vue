<template>
<div class="params_info" v-if="Object.keys(paramsInfo).length !== 0">
    <table v-for="( table, index) in paramsInfo.sizes" :key="index" class="info_size">
        <tr v-for="(tr, indey) in table" :key="indey">
            <td v-for="(td, indez) in tr" :key="indez">
            {{ td }}
            </td>
        </tr>
    </table>
    <table class="info_infos">
        <tr v-for="(info,index) in paramsInfo.infos" :key="index">
            <td class="infos_key">
                {{info.key}}
            </td>
            <td class="infos_value">
                {{info.value}}
            </td>
        </tr>
    </table>
</div>
</template>

<script>
    export default {
        name: 'DeatailParamsInfo',
        props: {
            paramsInfo: {
                type: Object,
                default(){
                    return {

                    }
                }
            },
        },
    }
</script>

<style scoped lang="scss">
.params_info{
    padding: 20px 15px;
    table{
        border-collapse: collapse;
        width: 100%;
        tr{
            height: 42px;
            td{
                border-bottom: 1px solid $color_border;
            }
        }
    }
    .info_size{
        @include borderBottom(1px)
    }
    .info_infos{
        .infos_key{
            width: 70px;
        }
        .infos_value{
            color: $color_high-text
        }
    }
}

</style>