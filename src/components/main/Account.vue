<template>
    <div>
        <p class="account">Account组件</p>
        <router-link to="/account/login">登录</router-link>
        <router-link to="/account/resgiter">注册</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
    .account{
        font-size: 30px;
        color: skyblue;
    }
</style>