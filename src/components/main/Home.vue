<template>
    <div class="homecontainer">
         <!-- index banner area start-->
         <div class="banner">
             <my-slider :slidelist="slideList" :isfull="isfull"></my-slider>
         </div>
        <!-- index banner area end  -->

         <!-- 九宫格导航 area start -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <img src="../../images/menu1.png">
                <div class="mui-media-body">新闻资讯</div></router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                 <img src="../../images/menu2.png" class="mui-icon">
                <div class="mui-media-body">图片分享</div></router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                 <img src="../../images/menu3.png" class="mui-icon">
                <div class="mui-media-body">商品购买</div></router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                 <img src="../../images/menu4.png" class="mui-icon">
                <div class="mui-media-body">留言反馈</div></a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                 <img src="../../images/menu5.png" class="mui-icon">
                <div class="mui-media-body">视屏专区</div></a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                 <img src="../../images/menu6.png" class="mui-icon">
                <div class="mui-media-body">联系我们</div></a>
            </li>
        </ul> 
        <!-- 九宫格导航 area end -->
        
    </div>
</template>

<script>
// 导入Toast组件
import {Toast} from 'mint-ui';
// 导入轮播图子组件
import Slider from '../subcom/Slider.vue';
export default {
    data(){
        return {
            slideList: [], // 轮播图的数据
            isfull: true,
        }
    },
    created(){ // vue实例生命周期钩子函数此时 data 和 methods都已经初始化好了
        this.getList() // 获取轮播图数据
    },
    methods:{
        getList(){
            // 发送get请求拿到轮播图数据
            this.$http.get('getlunbo').then((res)=>{ //成功的回调
                let body = res.body; // 获取body中的数据
                if(body.status == 0){ // 标记status为0成功
                    this.slideList = body.message;
                    Toast({
                        message: 'success',
                        position: 'middle',
                        duration: 1000
                    })
                    return;
                }
                Toast("server error!!!")
            })
        }
    },
    components:{
        'my-slider': Slider
    }
}
</script>
<style lang="scss" scoped>
    .banner{
        height: 200px;
    }

    // 九宫格样式
    .mui-grid-view.mui-grid-9{
        background: #fff;
        .mui-table-view-cell{
            border:none;
            img{
                width: 60px;
                height: 60px;
            }
        }
    }
   
</style>