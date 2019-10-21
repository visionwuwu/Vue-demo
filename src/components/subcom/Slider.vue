<template>
    <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in slidelist" :key="item.id">
                <a href="#">
                    <img :src="item.img" :class="{full: isfull}">
                </a>
            </mt-swipe-item>
   </mt-swipe>
</template>

<script>
export default {
    data(){
        return {}
    },
    props: ['slidelist','isfull']
}
</script>

<style lang="scss" scoped>
   .mint-swipe-indicator{
        &.is-active{
            background: red;
            box-shadow: 0 0 1px rgba(255, 255, 255,.7);
        }
    }
    .full{
        width: 100%;
    }
    .mint-swipe-item{
        a{
            display: block;
            height: 100%;
        }
    }
    img{
        height: 100%;
    }
</style>