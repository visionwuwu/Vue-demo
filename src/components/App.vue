<template>
    <div class="container">
        <!-- header area start -->
            <mt-header title="黑马程序员•Vue项目" fixed>
                 <span @click="goBack" slot="left" v-show="flag">
                    <mt-button icon="back">返回</mt-button>
                </span>
            </mt-header>
        <!-- header area end  -->

        <!-- main area start -->
        <div class="main">
            <transition name="slider">
                <router-view></router-view>
            </transition>
        </div>
        <!-- main area end  -->

        <!-- footer area start -->
        <nav class="mui-bar mui-bar-tab">
            <router-link to="/home" class="mui-tab-item1">
                <span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
            </router-link>
			<router-link class="mui-tab-item1" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ $store.getters.getTotalCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
        <!-- footer area end  -->
    </div>
</template>

<script>
export default {
    data(){
        return {
            flag: false,
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        }   
    },
    watch:{
        "$route.path":function(){
            if(this.$route.path == '/home'){
                this.flag = false;
            }else{
                this.flag = true;
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .container{
        .mint-header{
            z-index: 999;
        }
        .main{
            padding: 40px 0 50px;
            overflow-x: hidden;
        }
    }
    .slider-enter{
        transform: translateX(100%);
    }
    .slider-leave-to{
        transform: translateX(-100%);
        position: absolute;
    }
    .slider-enter-active,.slider-leave-active{
        transition: all .5s ease;
    }

     // 底部tabbar导航
    .mui-bar-tab .mui-tab-item1.mui-active {
      color: #007aff;
    }

    .mui-bar-tab .mui-tab-item1 {
      display: table-cell;
      overflow: hidden;
      width: 1%;
      height: 50px;
      text-align: center;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #929292;
    }

    .mui-bar-tab .mui-tab-item1 .mui-icon {
      top: 3px;
      width: 24px;
      height: 24px;
      padding-top: 0;
      padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
      font-size: 11px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
</style>