<template>
    <div class="photoListContainer">
        <!-- 顶部导航可以左右拖动的 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0 ? 'mui-active' : '']" v-for="item in cateList" :key="item.id" @click="getImagesList(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片列表 -->
        <ul class="imgList">
            <router-link v-for="item in imagesList" :key="item.id" tag="li" :to="'/photolist/photoinfo/' + item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h3 class="info_title">
                        {{ item.title }}
                    </h3>
                    <article class="info_body">{{ item.zhaiyao }}</article>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
// 导入mui中的mui.min.js文件
import mui from '../../libs/mui/js/mui.min.js';
export default {
    data(){
        return {
            imagesList: [], // 图片分享数据
            cateList: [], // 图片列表分类
        }
    },
    created(){
        this.getImagesList(0)
        this.getCateList()
    },
    mounted(){
        // 初始化mui scroll区域滑块控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        getImagesList(id){
           this.$http.get('getimages/' + id).then((res)=>{
               let body = res.body;
               if(body.status == 0){
                   this.imagesList = body.message;
               }
           })
        },
        getCateList(){
            this.$http.get('getimgcategory').then((res)=>{
                let body = res.body;
                if(body.status == 0){
                    // 手动push添加全部的数据
                    body.message.unshift({
                        title: '全部',
                        id: 0
                    })
                    this.cateList = body.message;
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    *{ touch-action: pan-y; }
    .photoListContainer{
        h1{
            color: red;
        }
        .imgList{
            list-style: none;
            margin: 0;
            padding: 10px;
            padding-bottom: 0;
            li{
                border-radius: 4px;
                box-shadow: 0 0 4px 1px rgba(0,0,0,.4);
                margin-bottom: 10px;
                position: relative;
                background: #ccc;
                text-align: center;
                img[lazy="loading"] {
                    width: 40px;
                    height: 300px;
                    margin: auto;
                }
                img{
                    vertical-align: middle;
                    border-radius: 4px;
                    width: 100%;
                }
                .info{
                    position: absolute;
                    text-align: left;
                    bottom: 0;
                    left: 0;
                    color: #fff;
                    max-height: 88px;
                    background: rgba(0,0,0,.5);
                    .info_title{
                        font-size: 15px;
                        font-weight: 500;
                    }
                    .info_body{
                        font-size: 13px;
                    }
                }
            }
        }
    }
</style>