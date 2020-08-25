<template>
    <div class="login" v-show="islogin" >
        <div class="molin">
            <span class="mo">MO</span>铃
        </div>
        <div class="getlog">
            <div>
                <div class="title">
                    <span>用户名</span>：<input type="text" >
                </div>
                <div class="date">
                    <span>密码</span>：<input type="password" >
                </div>
            </div>
            <div class="btn">
                <div class="log" @click="islogin = !islogin">登录</div>
                <div class="reg">注册</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // islogin:true,
                islogin:false,
            }
        }
    }
</script>

<style lang="scss" scoped>

    .login{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #FFF;

    }


    .login input{
        border: none;
        border-bottom: 2px solid #A9A9A9;
        padding: 5px 10px;
        outline: none;
        color: #565656;
    }
    .molin{
        position: absolute;
        top: 20%;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        font-size: 48px;
        color: #16BB7F;
    }
    .molin .mo{
        font-size: 72px;
        margin-right: 5px;
        color: #16BB7F;
    }
    .getlog{
        position: absolute;
        top: 35%;
        left: 0;
        right: 0;
        margin: auto;
    }
    .getlog span{
        width: 120px;
        display: inline-block;
        text-align-last:justify
    }
    .getlog .title{
        margin-bottom: 20px;
    }
    .btn {
        margin-top: 80px;
        color: #FFF;

    }
    .btn div{
        position: relative;
        left:50%;
        top:50%;
        margin-left:-275px;
        margin-bottom: 20px;
        background: #16BB7F;
        width: 550px;
        padding: 20px 0px;
    }
    .btn div:active{
        background: #119A69;
    }
</style>