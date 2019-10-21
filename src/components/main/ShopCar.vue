<template>
    <div class="shopCarContainer">
        <!-- 商品列表区域 -->
        <div class="goodslist">
            <div class="mui-card" v-for="(item, index) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getSelected[item.id]" @change="getStatus(item.id, $store.getters.getSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h3>{{ item.title }}</h3>
                            <p>
                                <span class="price">&yen;{{ item.sell_price }}</span>
                                <my-numbox :count="$store.getters.getCounts[item.id]" :id="item.id"></my-numbox>
                                <span class="delete" @click="removeGoods(item.id, index)">删除</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner pay">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品<span class="count">{{ $store.getters.getComputedReslut.count }}</span>件，总价：<span class="total">&yen;{{ $store.getters.getComputedReslut.total.toFixed(2) }}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 导入数字输入框组件
import numbox from '../subcom/shopcar_numbox.vue';
import { MessageBox, Toast } from 'mint-ui'
export default {
    data(){
        return {
            goodslist: [], // 购物车商品列表数据
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            // 循环获取商品的id
            let ids = [];
            this.$store.state.car.forEach((item)=>{ids.push(item.id)});

            // 发送请求获取购物车商品列表的数据
            this.$http.get('goods/getshopcarlist/' + ids.join(',')).then((res)=>{
                let body = res.body;
                if(body.status == 0){
                    this.goodslist = body.message;
                }
            })
        },
        removeGoods(id, index){ // 根据id删除商品
            MessageBox.confirm('亲，确定要删除此商品?','哈哈').then(() => {
                this.$store.commit('removeCar', id);
                // 删除本地数据
                this.goodslist.splice(index, 1)
            },()=>{
                Toast('reject')
            });
        },
        getStatus(id, isSelected){ // 获取选中状态
            this.$store.commit('saveSelected', {id,selected: isSelected})
        }
    },
    components:{
        'my-numbox': numbox
    }
}
</script>
<style lang="scss" scoped>
    .shopCarContainer{
        .goodslist{
            .mui-card-content-inner{
                display: flex;
            }
            img{
                width: 60px;
                margin: 0 8px;
                height: 60px;
            }
            .info{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                h3{
                    color: #000;
                    font-size: 15px;
                    margin: 0;
                }
                p{
                    display: flex;
                    justify-content: space-between;
                    margin: 0;
                    line-height: 30px;
                    .price{
                        color: #f40;
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .delete{
                        color: skyblue;
                        font-size: 14px;
                    }
                }
            }
        }
        .pay{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left{
               color: #ccc;
               p{
                   .count,.total{
                       color: #f40;
                       font-weight: bold;
                   }
               } 
            }
        }
    }
</style>