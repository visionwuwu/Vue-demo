<template>
    <div class="destContainer">
        <div class="mui-card slider">
            <div class="mui-card-content">
                <my-slider :slidelist="sliders" :isfull="isFull"></my-slider>
            </div>
        </div>
        <div class="mui-card info">
            <div class="mui-card-header">
                <h2>{{ info && info.title }}</h2>
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="price">
                        <em><span>市场价：</span><del>&yen;{{ info && info.market_price }}</del></em>
                        <em><span>销售价：</span><strong>&yen;{{ info && info.sell_price }}</strong></em>
                    </div>
                    <div class="number">
                        <span>购买数量：</span>
                        <my-numbox :max="info && info.stock_quantity" @select="getSelectedCount"></my-numbox>
                    </div>
                    <div class="operation">
                        <mt-button type="primary">立即购买</mt-button>
                        <mt-button type="danger" @click="addOneGoods">加入购物车</mt-button>
                        <!-- 小球半场动画 -->
                        <transition
                            @before-enter="beforEnter"
                            @enter="enter"
                            @after-enter="afterEnter"
                        >
                            <div class="ball" v-show="ballFlag"></div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card params">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：<span>{{ info && info.goods_no }}</span></p>
                    <p>库存情况：<span>{{ info && info.stock_quantity }}</span></p>
                    <p>上架时间：<span>{{ info && info.add_time }}</span></p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" plain size="large" @click="getDesc">图文介绍</mt-button>
                <mt-button type="danger" plain size="large" @click="getComment">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
// 导入轮播图子组件
import Slider from '../subcom/Slider.vue';
// 导入数字输入框组件
import numbox from '../subcom/NumBox.vue';
export default {
    data(){
        return {
            sliders: [], // 商品详情的轮播图列表
            info: null, // 商品详情的参数
            isFull: false, // 轮播图是否100%显示
            ballFlag: false, // 小球是否显示
            selectedCount: 1,
            id: this.$route.params.id,
        }
    },
    created(){
        this.getSlider();
        this.getGoodsInfo();
    },
    methods:{
        getSlider(){
            this.$http.get('getthumimages/' + this.$route.params.id).then((res)=>{
                let body = res.body;
                if(body.status == 0){
                    body.message.forEach((item)=>{
                        item.img = item.src;
                    });
                    this.sliders = body.message;
                }
            })
        },
        getGoodsInfo(){
            this.$http.get('goods/getinfo/' + this.$route.params.id).then((res)=>{
                let body = res.body;
                if(body.status == 0){
                    this.info = body.message[0];
                }
            });
        },
        getDesc(id){
            this.$router.push({name: 'goodsdest',params:{id: this.$route.params.id}})
        },
        getComment(id){
            this.$router.push({name: 'goodscomment',params:{id: this.$route.params.id}})
        },
        getSelectedCount(count){
            this.selectedCount = count;
        },
        addOneGoods(){
            this.ballFlag=!this.ballFlag // 控制小球的显示和隐藏

            // 拼接一条购买的商品信息
            let goods = {
                id: this.id,
                count: this.selectedCount,
                price: this.info.sell_price,
                selected: true
            }

            // 添加到store中
            this.$store.commit('addToCar', goods)
        },
        // 小球动画的钩子函数
        beforEnter(el){ // 初始时的状态
            el.style.transform = 'translate(0,0)';
        },
        enter(el, done){ // 设置完成时的状态
            el.offsetWidth;

            let ballrect = el.getBoundingClientRect();
            let badgerect = document.getElementById('badge').getBoundingClientRect();
            let xDist = badgerect.left - ballrect.left;
            let yDist = badgerect.top - ballrect.top;

            el.style.transform = `translate(${xDist}px,${yDist}px)`;
            el.style.transition = 'all .7s ease-in-out';

            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        }
    },
    components:{
        'my-slider': Slider,
        'my-numbox': numbox
    }
}
</script>

<style lang="scss">
    .destContainer{
        .slider{
            text-align: center;
            .mui-card-content{
                height: 300px;
            }
        }
        .mui-card-footer{
            display: block;
            button{
                margin: 10px;
            }
        }
        .info{
            overflow:visible;
            h2{
                font-size: 18px;
                font-weight: 600;
                color: skyblue;
            }
            .price{
                padding: 10px 0;
                em{
                    font-style:normal;
                    margin-right: 20px;
                    del{
                        color: #666;
                        font-size: 12px;
                        font-weight: bold;
                        margin-left: 5px;
                    }
                    span{
                        color: #ccc;
                        font-size: 12px;
                    }
                    strong{
                        color: #f40;
                        font-size: 18px;
                    }
                }
            }
            .number{
                display: flex;
                padding: 10px 0;
                span{
                    color: #ccc;font-size: 12px;
                    line-height: 30px;
                }
            }
             .operation{
                 position: relative;
                button{
                    font-size: 14px;
                    height: 35px;
                }
                .ball{
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: red;
                    position: absolute;
                    z-index: 999;
                    left: 115px;
                    top: -35px;
                }
            }
        }
        .params{
            p{
                font-size: 13px;
                color: #ccc;
                span{
                    color: #333 !important;
                }
            }
        }
    }
</style>