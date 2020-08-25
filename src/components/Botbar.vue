<template>
<div class="app">
    <!--<router-view></router-view>-->
    <div class="botbar"  @click="show">

        <router-link to="/" tag="div" exact class="item">
            <div class="bot-img icon-diary"></div>
            <span>日记</span>
        </router-link>

        <router-link to="/dmark" tag="div" class="item">
            <div class="bot-img icon-calendar"></div>
            <span>日历</span>
        </router-link>

        <router-link to="/visitor" tag="div" class="item" v-show='btn'>
            <div class="bot-img icon-visitor"></div>
            <span>过客</span>
        </router-link>

        <router-link to="/cuttime" tag="div" class="item">
            <div class="bot-img icon-cutday"></div>
            <span>纪念日</span>
        </router-link>

    </div>
</div>
</template>

<script>
    export default {
        props:{
            visitshow:{type: Boolean}
        },
        data() {
            return {
                btn:null,
            }
        },
        mounted() {
            this.btn = JSON.parse(localStorage.getItem('vbtn'))
        },
        watch: {
            visitshow (newV) { // watch监听props里status的变化，然后执行操作
                // console.log(newV, oldV)
                this.btn = newV
            }
        },
        methods:{
            show(){

                this.btn=JSON.parse(localStorage.getItem('vbtn'))
                // console.log('55',JSON.parse(localStorage.getItem('vbtn')));
                // console.log('11',JSON.parse(localStorage.getItem('vbtn')));
                this.$emit('show');
            }
        }

    }
</script>

<style lang="scss" scoped>
    .app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .botbar {
        position: fixed;
        display: flex;
        bottom: 0;
        left: 0;
        right: 0;
        height: 120px;
        border-top: 1px solid #ccc;
        /*background-color: rgb(255, 255, 255);*/
    }

    .botbar .item {
        flex: 1;
        color: #a6a6a6;
        text-align: center;
        font-size: 28px;
        margin: auto 0;
    }

    .botbar .item.active {
        color: #16bb7f;
    }

    .botbar .bot-img {
        font-size: 50px;
        margin-bottom: 4px;
    }
</style>