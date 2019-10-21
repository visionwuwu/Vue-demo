<template>
    <div class="newslistContainer">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="{name: 'info', params:{id: item.id}}">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h3 v-text="item.title"></h3>
                        <p class='mui-ellipsis'>
                            <em>发表时间：<span>{{ item.add_time | format }}</span></em>
                            <em>点击：<span>{{ item.click }}次</span></em>
                        </p>
                    </div>
                </router-link>
            </li>
		</ul>
    </div>
</template>

<script>
// 导入Toase组件
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            newslist: [] // 新闻列表的数据
        }
    },
    created(){
        this.getNewsList()
    },
    methods:{
        getNewsList(){
            this.$http.get('getnewslist').then((res)=>{
                let body = res.body; // 获取请求体的数据
                if(body.status == 0 ){ // 状态status为零请求成功
                    this.newslist = body.message;
                    Toast('success')
                    return;
                }
                Toast('server error!!!')
            })
        }
    },
    filters:{
        format(str, pattern=""){
            let d = new Date(str)
            let year = d.getFullYear()
            let month = d.getMonth() + 1
            let date = d.getDate()
            if(pattern && pattern == 'yyyy-mm-dd'){
                return `${year}-${month}-${date}`
            }else{
                let arr = ['日', '一', '二', '三', '四', '五', '六']
                let week = arr[d.getDay()]
                let hours = d.getHours().toString().padStart(2, 0)
                let minutes = d.getMinutes().toString().padStart(2, 0)
                let seconds = d.getSeconds().toString().padStart(2, 0)
                return `${year}-${month}-${date} ${hours}-${minutes}-${seconds}`
            }
        }
    }
}
</script>


<style lang="scss" scoped>
    .newslistContainer{
        .mui-media-body{
            h3{
                font-size: 16px;
                font-weight: 500;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .mui-ellipsis{
                display: flex;
                justify-content: space-between;
                color: skyblue;
                em{
                    font-style: normal;
                    font-size: 12px;
                }
            }
        }
    }
</style>