<template>
    <div class="goodsDestContainer">
        <div class="header">
            <h1>{{ info && info.title }}</h1>
        </div>
        <div class="body" v-html="info && info.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            info: null
        }
    },
    created(){
        this.getDesc();
    },
    methods:{
       getDesc(){
           this.$http.get('goods/getdesc/' + this.$route.params.id).then((res)=>{
               let body = res.body;
               if(body.status == 0){
                   this.info = body.message[0];
                   console.log('desc success')
               }
           })
       } 
    }
}
</script>

<style lang="scss">
    .goodsDestContainer{
        padding: 10px;
        .header{
            h1{
                color: aqua;
                font-size: 20px;
                font-weight: 600;
                padding: 12px 5px;
            }
        }
        .body{
            img{
                width: 100%;
            }
        }
    }
</style>