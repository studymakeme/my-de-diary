<template>
    <div id="app" class="app">
        <router-view @getcutlis="getcutlis"></router-view>
        <Alarm v-show="belltime" :alarm="alarm" @colsebelltime="colsebelltime"></Alarm>
        <Login></Login>
        <!--<div class="login" v-show="islogin" >-->
            <!--<div class="molin">-->
                <!--<span class="mo">MO</span>铃-->
            <!--</div>-->
            <!--<div class="getlog">-->
                <!--<div>-->
                    <!--<div class="title">-->
                        <!--<span>用户名</span>：<input type="text" >-->
                    <!--</div>-->
                    <!--<div class="date">-->
                        <!--<span>密码</span>：<input type="password" >-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="btn">-->
                    <!--<div class="log" @click="islogin = !islogin">登录</div>-->
                    <!--<div class="reg">注册</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import Alarm from './components/Alarm';
    import Login from './components/Login'

    export default {
        provide(){
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                belltime:false,
                cd:localStorage.cd,
                cutlis:[],
                alarmlis:[],
                alarm:{},

            }
        },
        mounted() {
            this.cutlis = JSON.parse(localStorage.getItem('cd'));
        },
        watch:{
            cutlis:function (val) {
                this.cutlis = val;
                for(let key in this.cutlis){
                    console.log(this.cutlis[key].alarm);
                    if(this.cutlis[key].alarm){
                        this.alarmlis.unshift(this.cutlis[key])
                    }
                }
            }
        },
        methods:{
            getcutlis(val){
                this.cutlis = val;
            },
            colsebelltime(dd){
                this.belltime = dd;
                // console.log(this.belltime)
            },
            getnowtime(){

                setInterval(()=>{
                    let nowtime = new Date().getTime();
                    for(let key in this.alarmlis){
                        let tim = this.alarmlis[key].tim;
                        let tt = new Date(tim).getTime();
                            // console.log('tim',tt);
                        if(nowtime-6000 < tt &&  tt < nowtime){
                            this.alarm = this.alarmlis[key];
                            // console.log(this.alarm);
                            this.belltime = true;
                        }
                    }
                },4000)
            },
        },
        created(){
            this.getnowtime();
        },
        components:{
            Alarm,
            Login
        }

    }
</script>
<style>
    @import "./assets/scss/index.scss";

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
