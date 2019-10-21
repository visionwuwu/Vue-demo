<template>
    <div class="commentContainer">
         <h3>发表评论</h3>
        <div class="mui-input-row">
			<textarea id="textarea" v-model="msg" rows="5" placeholder="请你跟我一样做!!!"></textarea>
		</div>
        <mt-button type="primary" size="large" @click="sendMsg">发表评论</mt-button>
         <ul class="comment_list">
             <li v-for="(item, index) in commentsList" :key="item.add_time">
                 <p>
                     <span>第{{ index + 1 }}楼:</span>
                     <span>用户：{{ item.user_name }}</span>
                     <span>发表时间：{{ item.add_time | format }}</span>
                </p>
                 <div class="text">{{ item.content }}</div>
             </li>
         </ul>
         <mt-button type="danger" size="large" @click="loadMore">加载更多...</mt-button>
    </div>
</template>


<script>
import {Toast} from 'mint-ui'
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            commentsList: [], // 评论数组数据
            pageindex: 1, // 评论数据分页默认是第一页
            msg: '', // 评论信息
            flag: true, // 加载更多的节流阀
        }
    },
    created(){
        this.getComments()
    },
    methods:{
        getComments(){ // 发送请求获取评论数据
            this.$http.get('getcomments/' + this.$route.params.id + '/?pageindex=' + this.pageindex).then((res)=>{
                let body = res.body;
                if(body.status == 0){
                    this.commentsList = [...this.commentsList, ...body.message]
                    // 开启加载更多节流阀
                    this.flag = true;
                    return;
                }
                Toast('获取评论数据失败')
            })
        },
        sendMsg(){ //发表评论方法
            if(this.msg.trim() !== ''){
                this.$http.post('postcomment/' + this.$route.params.id, {content: this.msg}).then((res)=>{
                    let body = res.body;
                    if(body.status == 0){
                        // 拼接一个发表的数据信息
                        let obj = {
                            user_name: '匿名用户',
                            add_time: new Date().toString(),
                            content: this.msg
                        }
                        // 添加到commentList数组中
                        this.commentsList.unshift(obj);
                        this.msg = '';
                        // 给出发表成功得提示
                        Toast(body.message)
                    }else{
                        Toast('发表评论失败')
                    }
                })
            }else{
                Toast('亲，请发表你的意见!')
            }
        },
        loadMore(){ // 加载更多的方法
            if(this.flag){
                // 将节流阀关闭
                this.flag = false;
                // 当前pageindex数加一
                this.pageindex += 1;
                // 重新获取我们的评论列表数据
                this.getComments()
            }
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
    .commentContainer{
        ul{
            list-style: none;
            padding: 0;
        }
        h3{
            font-size: 17px;
            font-weight: 600;
            padding-top: 3px;
        }
        .comment_list{
            li{
                border-bottom: 1px solid #ddd;
                p{
                    padding: 10px 5px;
                    background: #ccc;
                    color: #fff;
                    font-size: 14px;
                    border-radius: 4px;
                    margin: 0;
                }
                .text{
                    padding: 15px 20px;
                    color: aqua;
                }
            }
        }
    }
</style>