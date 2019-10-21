<template>
    <div class="goodsListContainer">
        <ul class="goodslist">
            <li v-for="item in goodslist" :key="item.id">
                <a @click="goGoodsInfo(item.id)">
                    <img :src="item.img_url" :alt="item.zhaiyao">
                    <div class="info">
                        <h3>{{ item.title }}</h3>
                        <p class="price">
                            <span class="nowPrice">&yen;{{ item.sell_price }}</span>
                            <span class="oldPrice">&yen;{{ item.market_price }}</span>
                        </p>
                        <p class="sell">
                            <span>热卖</span>
                            <span>{{ item.stock_quantity }}件</span>
                        </p>
                    </div>
                </a>
            </li>
            <mt-button type="danger" size="large" @click="getMore">加载更多...</mt-button>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            goodslist: [], // 商品列表数组
            pageindex: 1, // 商品列表的页码默认是第一页
        }
    },
    created(){
        this.getGoodList()
    },
    methods:{
        getGoodList(){
            this.$http.get('getgoods?pageindex=' + this.pageindex).then((res)=>{
                let body = res.body;
                if(body.status == 0){
                    this.goodslist = this.goodslist.concat(body.message);
                }
            })
        },
        getMore(){
            this.pageindex += 1;
            this.getGoodList();
        },
        goGoodsInfo(id){
            // 编程式跳转
            this.$router.push({name: 'goodsinfo', params: {id}})
        }
    }
}
</script>

<style lang="scss" scoped>
    .goodsListContainer{
        .goodslist{
            display: flex;
            flex-wrap: wrap;
            padding: 0 5px;
            list-style: none;
            li{
                width: 50%;
                min-height: 250px;
                box-sizing: border-box;
                a{
                    display: block;
                    margin: 0 5px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    border: 1px solid #ccc;
                    padding: 0 2px;
                    box-shadow: 0 0 8px #ccc;
                    height: 100%;
                    img{
                        width: 100%;
                    }
                    .info{
                        h3{
                            font-size: 14px;
                            color: #333;
                        }
                        p{
                            margin:0;
                            padding: 5px;
                        }
                        .price{
                            .nowPrice{
                                font-size: 16px;
                                font-weight: bold;
                                color: #f40;
                            }
                            .oldPrice{
                                color: #ccc;
                                font-size: 12px;
                                text-decoration: line-through;
                            }
                        }
                        .sell{
                            display: flex;
                            justify-content: space-between;
                            color: #ccc;
                            font-size: 14px;
                        }
                    }
                }
                margin-bottom: 10px;
            }
        }
    }
</style>