<template>
    <div>
        <div class="visitor-head">
            <span class="head-text">过客</span>
        </div>
        <div class="visitorlis">
            <div class="readlis" v-for="(item,index) in vdiary" :key="index" @click="getuser(vdiary[index])">
                <div class="user">{{item.user}}</div>
                <div class="divtext">
                    <div class="text" v-html="item.text"></div>
                </div>
                <div class="dizhi">
                    <b class="icon-dizhi"></b>
                    <p class="dizhi-text">{{item.cip ? item.cip : ''}}</p>
                </div>
            </div>
        </div>

        <botbar></botbar>
    </div>
</template>

<script>
    import Botbar from "../components/Botbar"
    export default {
        data() {
            return {
                vdiary:[
                    {
                        id:'001',
                        user:'a妹妹',
                        dd:{year: 2020, month: 4, date: 17, weekday: "周五"},
                        share:true,
                        text:"<p>一直以为快乐番薯是卖番薯的，哈哈哈</p>",
                        cip:"广东省惠州市惠城区"
                    },
                    {
                        id:'002',
                        user:'b哥哥',
                        dd:{year: 2020, month: 4, date: 17, weekday: "周五"},
                        share:true,
                        text:"<p>给a妹妹买了快乐番薯的手抓饼吃，傻妹妹还以为快乐番薯是卖番薯的，真是个傻妹妹！</p>",
                        cip:"广东省惠州市惠城区"
                    },
                    {
                        id:'003',
                        user:'d姐姐',
                        dd:{year: 2020, month: 4, date: 10, weekday: "周五"},
                        share:true,
                        text:"<p>去松山湖公园野餐，开心</p>",
                        cip:"广东省东莞市松山湖"
                    },
                    {
                        id:'004',
                        user:'K大佬',
                        dd:{year: 2020, month: 4, date: 19, weekday: "周日"},
                        share:true,
                        text:"<p>本大佬终于不用再家带小孩了，解放了，咯咯咯</p>",
                        cip:"广东省广州花都"
                    },
                ],
                sharelis:[],
                sd:[]

            }
        },
        mounted() {
            this.sd = JSON.parse(localStorage.getItem('sd'));
            this.vdiary = this.sd.concat(this.vdiary);
        },
        methods: {
            getuser(dd){
                console.log(dd);
                this.$router.push({
                    path: '/share',
                    name: 'share',
                    params: {
                        shareuser: dd
                    }
                })
            }
        },
        components: {
            Botbar
        }
    }
</script>

<style lang="scss" scoped>
    .visitor-head {
        height: 130px;
        padding: 50px 32px 0 32px;
        background: #16bb7f;
        text-align: center;
        color: #fff;

        .head-text {
            display: inline-block;
            font-size: 48px;
            margin-top: 10px;
            font-weight: 600;
        }
    }

    .visitorlis{
        background: #F0F0F0;
        position: fixed;
        top: 130px;
        bottom: 120px;
        left: 0;
        right: 0;
        padding-top: 20px;
        overflow: hidden;
        overflow-y: scroll;
    }

    .readlis {
        position: relative;
        height: 245px;
        margin: 0px 55px 25px 55px;
        background: #FFF;
        overflow: hidden;
        overflow-y: scroll;
        text-align: left;

        .user{
            border-bottom: 2px solid #D7D7D7;
            padding-left: 20px;
            font-size: 32px;
            line-height: 55px;
            font-weight: 600;
            color: #626262;

        }
        .divtext{
            height: 170px;
            padding: 15px 20px;
        }
        .text{
            height: 125px;
            overflow:hidden;
            font-size: 28px;
            line-height: 46px;
            /*white-space:nowrap;*/
            text-overflow: ellipsis;
        }

        .dizhi {
            position: absolute;
            bottom: 8px;
            left: 16px;
            color: rgb(198, 198, 198);
            font-size: 24px;
        }

        .dizhi-text {
            vertical-align: bottom;
            margin-left: 6px;
            display: inline-block;
            max-width: 360px;
            line-height: 28px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;

        }
    }



</style>