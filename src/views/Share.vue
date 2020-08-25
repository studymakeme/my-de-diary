<template>
    <div class="bg">
        <div class="edit-head">
            <span class="icon-zuojiantou head-span zjt" @click="$router.go(-1)"></span>
            <!--<div class="ymrw">-->
                <!--<div class="month-date">{{shared.dd.month}}月{{shared.dd.date}}日</div>-->
                <!--<div class="year-weekday">-->
                    <!--<span class="yw">{{shared.dd.year}}</span>-->
                    <!--<span class="yw">{{shared.dd.weekday}}</span>-->
                <!--</div>-->
            <!--</div>-->
        </div>

        <div class="content">
            <div class="user">{{shared.user}}</div>
            <div class="waddr" v-show="shared.cip">
                <i class="icon-dizhi dizhi"></i>
                <span class="addr">{{shared.cip}}</span>
                <span class="addr date">{{shared.dd.year}}年{{shared.dd.month}}月{{shared.dd.date}}日</span>
            </div>
            <div class="aread">
                <div class="read-text" v-html="shared.text"></div>
            </div>

        </div>

        <div class="coment">
            <div class="plun">评论</div>
            <div class="ping" v-for="(item,index) in reply" :key="index">
                <div class="up">{{item.user}}</div>
                <!--<div class="upl">{{item.coment}}</div>-->
                <!--v-show="!show"-->
                <div class="upl" @click="isuser(item.user)" >{{item.coment}}</div>
                <input class="inp" type="text" v-show="show" @blur="editcometn(index,item.coment)" v-model="item.coment">
            </div>
            <div class="replybtn">
                <textarea class="reply" v-model="coment"></textarea>
                <div class="btn" @click="getreply()">发布</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show:false,
                shared: this.$route.params.shareuser,
                coment:'',
                reply:[],
                itcoment:'',
                rp:JSON.parse(localStorage.getItem('rp'))
            }
        },
        mounted() {

            if (this.rp && this.rp != "undefined") {
                for(let key in this.rp){
                    if(this.shared.id == this.rp[key].id){
                        this.reply.unshift(this.rp[key]);
                    }
                }
                // this.reply = JSON.parse(localStorage.getItem('rp'))
            }

        },
        watch:{
            coment(newval){
                console.log('id',this.shared);
                console.log(newval);
            }
        },
        methods:{
            isuser(cc){
                if(cc == 'zao'){
                    this.show = true;
                }else {
                    this.show = false;
                }

            },
            editcometn(dd,cc){
                this.show = false;
                // console.log(dd,cc)
                //     console.log('33',cc)
                if(cc == ''){

                    this.reply.splice(dd, 1);
                    console.log('33',this.reply)
                    // for(let key in this.rp){
                    //     if(this.reply[dd].sid == this.rp[key].sid){
                    //         this.rp.splice(key, 1);
                    //         localStorage.setItem('rp', JSON.stringify(this.rp));
                    //     }
                    // }
                }else {
                    this.reply[dd].coment = cc;
                }

                // localStorage.setItem('rp', JSON.stringify(this.rp));
            },
            getreply(){
                let shlis = {
                    id:this.shared.id,
                    sid:new Date().getTime(),
                    user:'zao',
                    coment:this.coment,
                };
                console.log(shlis);
                this.reply.unshift(shlis);


                if (this.rp && this.rp != "undefined") {
                    this.rp.unshift(shlis);
                    localStorage.setItem('rp', JSON.stringify(this.rp));
                }else {
                    localStorage.setItem('rp', JSON.stringify([shlis]));
                }
                this.rp = JSON.parse(localStorage.getItem('rp'));
                this.coment = ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bg{
        background: #F0F0F0;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .edit-head {
        height: 130px;
        padding: 50px 32px 0 32px;
        background: #16bb7f;
        text-align: center;
        color: #fff;

        .ymrw {
            margin-top: 10px;

            .month-date {
                display: inline-block;
                font-size: 48px;
                font-weight: 600;
            }

            .year-weekday {
                display: inline-block;
                margin-left: 20px;
                vertical-align: top;

            }

            .yw {
                display: block;
                max-width: 80px;
                font-size: 20px;
                line-height: 24px;
            }
        }

        .zjt {
            float: left;
            font-size: 60px;
        }
        .ed{
            float: right;
            font-size: 60px;
            color: #fff;
        }
    }

    .content{
        display: flex;
        background: #FFF;
        min-height: 500px;
        flex-direction: column;
    }
    .user{
        font-size: 64px;
        font-weight: bold;
        text-align: left;
        padding-left: 50px;
    }
    .waddr {
        height: 80px;
        font-size: 28px;
        line-height: 80px;
        padding: 0 40px;
        /*background: #ff9900;*/
        border-bottom: 1px solid rgb(228, 228, 228);
        text-align: left;
        color: #999999;

        .addr {
            vertical-align: middle;
            display: inline-block;
            margin-left: 10px;
            font-size: 28px;
            max-width: 550px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .date{
            float: right;
        }
    }

    .aread {
        flex: 1;
        overflow-y: scroll;
        padding: 32px 50px;
        text-align: left;

    }

    .coment{
        margin-top: 40px;
        background: #FFF;

        .plun{
            text-align: left;
            padding-left: 50px;
            line-height: 70px;
            border-bottom: 1px solid #E4E4E4;
        }

        .ping{
            margin: 20px 60px;
            position: relative;
            /*border-bottom: 1px solid salmon;*/

            .up{
                text-align: left;
                font-size: 40px;
                line-height: 60px;
                border-bottom: 1px solid #E4E4E4;
            }
            .upl{
                padding: 20px 50px;
                text-align: left;
                line-height: 46px;
                height: 85px;
                font-size: 32px;
                color: #5a5a68;
                background-color: #F3F3F3;
            }
            .inp{
                position:absolute;
                top: 60px;
                left: 0px;
                right: 0px;
                outline: none;
                width: 530px;
                line-height: 46px;
                font-size: 32px;
                padding: 20px 50px;
                border: none;
                background-color: #F3F3F3;

            }
        }

        .replybtn{
            margin-top: 50px;
            height: 300px;

            .reply{
                outline: none;
                width: 620px;
                height: 200px;
            }
            .btn{
                float: right;
                margin-right: 60px;
                background: #15B37A;
                width: 150px;
                height: 70px;
                line-height: 70px;
                color: #FFF;
            }
            .btn:active{
                background: #119A69;
            }
        }
    }
</style>