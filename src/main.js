// 这是入口js文件 逻辑代码在这里写

// 导入vue包(模块)
import Vue from 'vue';

// 导入vue-router包(组件)
import VueRouter from 'vue-router';
// 在Vue上安装vue-router
Vue.use(VueRouter);

// 导入Vue-resource包
import VueResource from 'vue-resource';
// 安装vue-resource
Vue.use(VueResource);
// 配置参数
Vue.http.options.root = 'http://www.liulongbin.top:3005/api';
Vue.http.options.emulateJSON = true

// 导入vuex包
import Vuex from 'vuex';
// 安装vuex
Vue.use(Vuex);

// 从本地存储中获取购物车的数据
let car = JSON.parse(localStorage.getItem('mycar') || '[]');

// 创建一个store仓储对象
const store = new Vuex.Store({
    state: { // 相当于我们的组件的data属性 this.$store.state.***
        car: car, // 购物车数据
    },
    mutations: { // 相当于我们组件的methods 专门用来操作我们的store中的数据的
        addToCar(state, goods) {
            let isExits = state.car.some((item) => {
                if (item.id == goods.id) {
                    // 购物车中存在此商品数量相加
                    item.count += goods.count;
                    return true;
                }
            });

            // 不存在添加这条商品
            if (!isExits) {
                state.car.push(goods)
            }

            // 将购物车数据存储在本地离线存储
            localStorage.setItem('mycar', JSON.stringify(state.car));
        },
        updateCar(state, goods) {
            // 找到对应的goods更新其count值
            state.car.some((item) => {
                if (item.id == goods.id) {
                    item.count = goods.count;
                    return true;
                }
            });
            // 将购物车数据存储在本地离线存储
            localStorage.setItem('mycar', JSON.stringify(state.car));
        },
        removeCar(state, id) {
            // 过滤掉对应id的商品
            state.car = state.car.filter((item) => {
                return item.id != parseInt(id);
            });
            // 将购物车数据存储在本地离线存储
            localStorage.setItem('mycar', JSON.stringify(state.car));
        },
        saveSelected(state, goods) {
            // 找到对应的id的商品，更改他的选中状态
            state.car.some((item) => {
                if (item.id == parseInt(goods.id)) {
                    item.selected = goods.selected;
                    return true;
                }
            });
            // 将购物车数据存储在本地离线存储
            localStorage.setItem('mycar', JSON.stringify(state.car));
        }
    },
    getters: { // 相当于组件中的computed计算属性 也相当于我们的过滤器 当使用的数据发生改变时重新计算
        getTotalCount(state) {
            let total = 0;
            state.car.forEach((item) => {
                total += item.count;
            });
            return total;
        },
        getCounts(state) { // 获取对应id的数量存储到一个对象中
            let o = {}
            state.car.forEach((item) => {
                o[item.id] = item.count;
            });
            return o;
        },
        getSelected(state) { // 选中状态
            let o = {}
            state.car.forEach((item) => {
                o[item.id] = item.selected;
            });
            return o;
        },
        getComputedReslut(state) { // 勾选获取所有的数量
            let res = {
                count: 0,
                total: 0
            };
            state.car.forEach((item) => {
                if (item.selected) {
                    res.count += parseInt(item.count);
                    res.total += item.count * item.price
                }
            });
            return res;
        }
    }
})

// 导入vue-preview //图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);


// 导入mui组件的css样式
import './libs/mui/css/mui.min.css'
// 导入mui扩展字体图标的extra.css文件
import './libs/mui/css/icons-extra.css'

// 按需导入mint-ui组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// // 注册全局组件
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css';

// 导入app组件
import app from './components/App.vue';

// 导入自定义路由模块
import router from './router.js';
import { start } from 'pretty-error';

// 创建一个vue实列
const vm = new Vue({
    el: '#app',
    data: {
        message: 'Hello World',
        instance: null, // 调用Toast方法返回的实列
    },
    created() {

    },
    methods: {
        getList() { // 获取数据的方法

        },
        alertToast() {

        }
    },
    router,
    // 挂载store
    store,
    // 使用render函数将组件渲染成Vnode的html结构
    render: c => c(app)
})

// 用webpack打包