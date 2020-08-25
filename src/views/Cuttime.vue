<template>
    <div>
        <div class="cuttime-head">
            <span class="icon-zuojiantou head-span zjt" @click="$router.go(-1)"></span>
            <span class="head-text">纪念日</span>
            <span class="head-span zq" @click="isshow">+</span>
        </div>
        <div class="cuttime-content">
            <CutdayCpt :cutlis="cutlis" @delcutday="delcutday" @editcutday="editcutday"></CutdayCpt>
        </div>

        <EditcutdayCpt v-show='ishow' :cutd="cutday" @colseEcut="show" @addcutday="addcutday"></EditcutdayCpt>
        <botbar @show="show"></botbar>
    </div>
</template>

<script>
    import Botbar from "../components/Botbar"
    import CutdayCpt from '../components/CutdayCpt'
    import EditcutdayCpt from '../components/EditcutdayCpt'

    export default {
        data() {
            return {
                ishow:false,
                cutday:{},
                cutlis:[],
                cd:localStorage.cd,
                nowtime:'',
            }
        },
        mounted(){
            if (this.cd && this.cd != "undefined") {
                this.cutlis = JSON.parse(localStorage.getItem('cd'))
            }

            for(let key in this.cutlis){
                let date = this.cutlis[key].date;
                this.getday(date,this.cutlis[key]);
            }

        },
        methods:{
            show(){
                this.ishow = false;
            },
            isshow(){
                this.ishow = true;
                this.cutday = {}
            },
            getnowtime(){
                setInterval(()=>{
                    this.nowtime = new Date();
                },60000)
            },
            getday(date,lis){
                    let d = new Date(date).getTime();
                    let newd = new Date();
                    let num = Math.ceil((d - newd) / 3600000 / 24)
                    lis.add = num > 0 ? 'decday' : 'addday';
                    lis.day = num > 0 ? '还有' + num + '天' : '第' + -num + '天';
            },
            addcutday(dd){
                this.cutday = dd;
                let date = this.cutday.date;
                this.getday(date,this.cutday);

                for(let key in this.cutlis){
                    if(this.cutlis[key].id == this.cutday.id){
                        this.cutlis.splice(key,1);
                    }
                }

                this.cutlis.unshift(this.cutday);
                localStorage.setItem('cd', JSON.stringify(this.cutlis));
                // this.reload();
                location.reload()
                // this.$router.go(\cuttime);
                // this.$emit('getcutlis',this.cutlis);

            },
            delcutday(dd){
                // console.log('dd',dd);
                localStorage.setItem('cd', JSON.stringify(dd))
            },
            editcutday(dd){
                this.ishow = true;
                this.cutday = dd;
                // console.log('day',this.cutday)
            }
        },
        created(){
            this.getnowtime();
        },
        components: {
            Botbar,
            CutdayCpt,
            EditcutdayCpt
        }
    }
</script>

<style lang="scss" scoped>
    .cuttime-head {
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

        .head-span {
            font-size: 60px;
        }

        .zjt {
            float: left;
        }

        .zq {
            float: right;
            color: #fff;
        }
    }

    .cuttime-content {
        position: fixed;
        top: 130px;
        bottom: 120px;
        left: 0px;
        right: 0px;
        padding: 20px 32px;
        background: #F0F0F0;
        overflow: hidden;
        overflow-y: scroll;
    }
    .sercut{
        background: orange;
        width: 100px;
        height: 100px;
    }


</style>