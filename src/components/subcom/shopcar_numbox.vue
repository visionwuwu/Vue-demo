<template>
    <div class="numboxContainer">
        <div class="mui-numbox" data-numbox-min='1'>
            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="sendCount">-</button>
            <input id="test" class="mui-input-numbox" type="number" @change="sendCount" ref="num" :value="count"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="sendCount">+</button>
        </div>
    </div>
</template>

<script>
import mui from '../../libs/mui/js/mui.min.js';
export default {
    data(){
        return{
        }
    },
    mounted(){
        mui('.mui-numbox').numbox();
    },
    methods:{
        sendCount(){
            // 调用store中的updateCar方法
            this.$store.commit('updateCar', {id: this.id, count: parseInt(this.$refs.num.value)})
        }
    },
    props: ['count', 'id']
}
</script>
<style lang="scss">
    .numboxContainer{
        .mui-numbox{
            height: 30px;
            input{
                font-size: 14px;
                color: #333;
            }
        }
    }
</style>