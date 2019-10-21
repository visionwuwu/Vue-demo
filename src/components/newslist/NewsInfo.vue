<template>
    <div class="newsInfoContainer">
        <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title">{{ newsinfo && this.newsinfo[0].title }}</h3>
                <p>
                    <em>发表时间：<span>{{ newsinfo && this.newsinfo[0].add_time }}</span></em>
                    <em>点击：<span>{{ newsinfo && this.newsinfo[0].click }}次</span></em>
                </p>
            </div>
            <div class="panel-body" v-html="newsinfo && this.newsinfo[0].content"></div>
        </div>
         <my-comment></my-comment>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
// 导入评论组件公用的
import comment from '../subcom/Comment.vue';
export default {
    data(){
        return {
            newsinfo: null // 新闻列表
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('getnew/'+ this.$route.params.id).then((res)=>{
                let body = res.body;
                if(body.status == 0){
                    this.newsinfo = body.message
                    return;
                }
                Toast('get data failed')
            })
        }
    },
    components:{
        'my-comment': comment
    }
}
</script>


<style lang="scss" scoped>
    .newsInfoContainer{
        padding: 0 10px;
        .panel{
            .panel-heading{
                border-bottom:1px solid #ccc;
                .panel-title{
                    font-size: 17px;
                    color: red;
                    padding: 15px 10px;
                }
                p{
                    color: skyblue;
                    padding: 5px;
                    margin: 0;
                    display: flex;
                    justify-content: space-between;
                    em{
                        font-style: normal !important;
                    }
                }
            }
            .panel-body{
                color: #ccc;
                border-bottom: 1px solid #ccc;
                font-size: 14px;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>