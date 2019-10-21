<template>
    <div class="photoInfoContainer">
        <div class="header">
            <h1>{{ info && info.title }}</h1>
            <p>
                <span>发表时间：{{ info && info.add_time }}</span>
                <span>点击：{{ info && info.click }}次</span>
            </p>
        </div>
        <div class="body">
            <!-- 缩略图区域开始 -->
            <div class="thumb">
                <img class="preview-img" v-for="(item, index) in thumbImgs" @click="$preview.open(index,thumbImgs)" :src="item.src" :key="item.src" height="100">
            </div>
            <!-- 内容区开始 -->
            <article v-html="info && info.content"></article>
            <!-- 内容区结束 -->

            <!-- 评论区域开始 -->
            <my-comment></my-comment>
            <!-- 评论区域结束 -->
        </div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
import comment from '../subcom/Comment.vue';
export default {
    data(){
        return {
            info: null, // 图片详情数据
            thumbImgs: [], // 图片详情缩略图
        }
    },
    created(){
        this.getInfo();
        this.getThumbImgs();
    },
    methods:{
        getInfo(){
            console.log(this.$route.params.id)
            this.$http.get('getimageInfo/' + this.$route.params.id).then((res)=>{
                let body = res.body;
                if(body.status == 0){
                    this.info = body.message[0]
                }
            })
        },
        getThumbImgs(){
            this.$http.get('getthumimages/' + this.$route.params.id).then((res)=>{
                let body = res.body;
                if(body.status == 0){
                    body.message.forEach((item)=>{
                        item.w = 600;
                        item.h = 400;
                    })
                    this.thumbImgs = body.message;
                    Toast('成功')
                }
            })
        }
    },
    components:{
        'my-comment': comment
    }
}
</script>

<style lang="scss" scoped>
    .photoInfoContainer{
        padding: 0 10px;
        .header{
            border-bottom: 1px solid #ddd;
            h1{
                padding: 15px 0;
                font-size: 16px;
                color: skyblue;
                font-weight: 600;
            }
            p{
                display: flex;
                justify-content: space-between;
                color: #ccc;
                font-size: 12px;
            }
        }
        .body{
            .thumb{
                img{
                    margin: 10px;
                    box-shadow: 0 0 3px rgba(0,0,0,.5);
                }
            }
            article{
                font-size: 13px;
                color: #333;
                letter-spacing: 2px;
                line-height: 20px;
            }
        }
    }
</style>