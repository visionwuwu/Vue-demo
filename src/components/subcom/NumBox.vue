<template>
    <div class="numboxContainer">
        <div class="mui-numbox" data-numbox-min='1'>
            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="sendCount">-</button>
            <input id="test" class="mui-input-numbox" @change="sendCount"  type="number" ref="num" />
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
            this.$emit('select', parseInt(this.$refs.num.value));
        }
    },
    props: ['max'],
    watch:{
        'max':(newVal, oldVal) =>{
           mui('.mui-numbox').numbox().setOption('max', newVal) 
        }
    },
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