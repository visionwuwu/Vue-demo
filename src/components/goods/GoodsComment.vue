<template>
    <div class="goodsCommentContainer">
        <my-comment></my-comment>
    </div>
</template>

<script>
// 导入商品评论组件
import comment from '../subcom/Comment.vue';
export default {
    data(){
        return {}
    },
    components:{
        'my-comment': comment
    }
}
</script>

<style lang="scss" scoped>
    .goodsCommentContainer{
        padding: 10px;
    }
</style>