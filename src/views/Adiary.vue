<template>
    <div class="bg">
        <div class="edit-head">
            <span class="icon-zuojiantou head-span zjt" @click="$router.go(-1)"></span>
            <router-link :to="{name:'editdiary',params:{dd,diaryinfo}}">
                <span class="icon-eidt head-span ed"></span>
            </router-link>
            <div class="ymrw">
                <div class="month-date">{{dd.month}}月{{dd.date}}日</div>
                <div class="year-weekday">
                    <span class="yw">{{dd.year}}</span>
                    <span class="yw">{{dd.weekday}}</span>
                </div>
            </div>
            <!--<span class="eicon-eidt head-span ed">+</span>-->
        </div>
        
        <div class="content">
            <div class="waddr" v-show="cip">
                <i class="icon-dizhi dizhi"></i>
                <span class="addr">{{cip}}</span>
            </div>
            <div class="aread">
                <div class="read-text" v-html="diaryinfo.text"></div>
            </div>
        </div>


        <div class="coment" v-show="isshow">
            <div class="plun">评论</div>
            <div class="ping" v-for="(item,index) in reply" :key="index">
                <div class="up">{{item.user}}</div>
                <div class="upl">{{item.coment}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                diaryinfo: {},
                // diarydd:{},
                cip:'',
                dd:{},
                reply:[],
                isshow:false
            }
        },
        mounted() {
            this.diaryinfo = this.$route.params.diaryinfo;
            // this.diarydd = this.$route.params.diaryinfo.dd;
            this.dd = this.diaryinfo.dd;
            this.cip = this.diaryinfo.cip ? this.diaryinfo.cip : '';


            let rp = JSON.parse(localStorage.getItem('rp'));
            if (rp && rp != "undefined") {
                for(let key in rp){
                    if(this.diaryinfo.id == rp[key].id){
                        this.isshow = true;
                        this.reply.unshift(rp[key]);
                    }
                }
                // this.reply = JSON.parse(localStorage.getItem('rp'))
            }
        },
        methods:{
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
        background: #fff;
        min-height: 600px;
        flex-direction: column;
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
    }

    .aread {
        flex: 1;
        overflow-y: scroll;
        padding: 32px 32px;
        text-align: left;

    }

    .coment{
        margin-top: 40px;
        background: #FFF;
        min-height: 300px;
        padding-bottom: 40px;

        .plun{
            text-align: left;
            padding-left: 50px;
            line-height: 70px;
            border-bottom: 1px solid #E4E4E4;
        }

        .ping{
            margin: 20px 60px;
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
                font-size: 32px;
                color: #5a5a68;
                background-color: #F3F3F3;
            }
        }
    }
</style>