<template>
    <div @click="colsebelltime">
        <div class="bg"></div>
        <div class="alarm">
            <div class="title">{{alarm.title}}</div>
            <div class="date">{{alarm.date}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['alarm'],
        data() {
            return {
            }
        },
        methods:{
            colsebelltime(){
                this.$emit('colsebelltime',false);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .alarm{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -70%);
        margin: auto;
        background: #A7A7A7;
        border-radius: 30px;
        padding: 100px 0;
        width: 500px;
        color: #FFF;
        animation:myfirst 1s linear 0s 1 alternate;




        .title{
            font-size: 64px;
            padding-bottom: 50px ;
        }
        .date{
            font-size: 32px;
        }
    }
    .bg{
        position: absolute;
        top: 0px;
        bottom: 120px;
        left: 0;
        right: 0;
        background: #000;
        opacity: 0.6;

    }

    @keyframes myfirst
    {
        /*top: 50%;*/
        /*left: 50%;*/
        /*transform: translate(-50%, -70%);*/
        0%   {transform: translate(-40%, -80%);}
        20%   {transform: translate(-50%, -70%);}
        40% {transform: translate(-60%, -60%);}
        60%   {transform: translate(-50%, -70%);}
        80% {transform: translate(-40%, -80%);}
        100% {transform: translate(-50%, -70%);}
    }
</style>