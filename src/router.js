// 导入vue-router包(组件)
import VueRouter from 'vue-router';

// 导入home组件
import home from './components/main/Home.vue';

// 导入newslist组件
import newslist from './components/newslist/NewsList.vue';

// 导入newsinfo组件
import newsinfo from './components/newslist/NewsInfo.vue';

// 导入图片列表的组件
import photolist from './components/photolist/PhotoList.vue';

// 导入图片组件
import photoinfo from './components/photolist/PhotoInfo.vue';

// 导入goodslist组件
import goodslist from './components/goods/GoodsList.vue';

// 导入goodsinfo组件
import goodsinfo from './components/goods/GoodsInfo.vue';

// 导入商品详情组件
import goodsdest from './components/goods/GoodsDest.vue';

// 导入商品评论组件
import goodscomment from './components/goods/GoodsComment.vue';

// 导入member组件
import member from './components/main/Member.vue';

// 导入shopcar组件
import shopcar from './components/main/ShopCar.vue';

// // 导入注册组件search
import search from './components/main/Search.vue';

// 定义路由
const routes = [{
        path: '/',
        redirect: {
            path: '/home'
        }
    },
    { path: '/home', component: home },
    { path: '/member', component: member },
    { path: '/shopcar', component: shopcar },
    { path: '/search', component: search },
    { path: '/home/newslist', component: newslist },
    { path: '/home/newsinfo/:id', component: newsinfo, name: 'info' },
    { path: '/home/photolist', component: photolist },
    { path: '/photolist/photoinfo/:id', component: photoinfo },
    { path: '/home/goodslist', component: goodslist },
    { path: '/home/goodsinfo/:id', component: goodsinfo, name: 'goodsinfo' },
    { path: '/home/goodsdest/:id', component: goodsdest, name: 'goodsdest' },
    { path: '/home/goodscomment/:id', component: goodscomment, name: 'goodscomment' },
]

// 创建一个路由对象
const router = new VueRouter({
    routes,
    linkActiveClass: 'mui-active'
})

export default router;