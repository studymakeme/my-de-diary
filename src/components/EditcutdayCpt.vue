<template>
    <div>
        <div class="editcut"></div>

        <div class="ecut">
            <div class="eday">
                <div class="title">
                    标题：<input type="text" v-model="title">
                </div>
                <div class="date">
                    日期：<input type="text" v-model="date" placeholder="格式：年/月/日">
                </div>
                <div class="alarm"   >
                    闹铃: <span @click="openAlarm" :class="[abtn ? 'open' : 'close']"></span>
                </div>
                <div class="time">
                    <div class="hide" v-show="!abtn"></div>
                    时间：<input type="text" v-model="tim" placeholder="格式：年/月/日 时:分">
                </div>
            </div>
            <div class="btn">
                <div class="save" @click="colseEcut">取消</div>
                <div class="cancel" @click="saveEcut">保存</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['cutd'],
        data() {
            return {
                abtn:false,
                cutday:{},
                title:'',
                date:'',
                alarm:'',
                tim:'',
            }
        },
        mounted(){

        },
        watch: {
            cutd(newValue) {
                this.cutd = newValue;
                this.title = this.cutd.title;
                this.date = this.cutd.date;
                this.abtn = this.cutd.alarm;
                this.tim =this.cutd.tim;
                // console.log('cutd',this.cutd);
            },
            abtn(){
                this.tim = this.abtn ? this.tim : '';
            }
        },
        methods:{
            openAlarm(){
                this.abtn = !this.abtn;
            },
            colseEcut(){
                this.$emit('colseEcut',false)
            },
            saveEcut(){

                this.cutday = {
                    id:this.cutd.id ? this.cutd.id : 'cutday' + (new Date()).getTime(),
                    title: this.title,
                    date: this.date,
                    alarm:this.abtn,
                    tim: this.tim,
                    day:'',
                    tt:'',
                    add:''
                }

                if(this.cutday.title != '' && this.cutday.date != ''){
                    this.$emit('addcutday',this.cutday);
                }

                // this.cutd = {};

                this.$emit('colseEcut',false);

                this.tim = '';
                this.title = '';
                this.date = '';
                this.abtn = false
            }
        }
    }
</script>

<style lang="scss" scoped>
.editcut{
    position: absolute;
    top: 130px;
    bottom: 120px;
    right: 0px;
    left: 0px;
    background: #000000;
    opacity: 0.6;
    
}
.ecut{
    position: relative;
    top: 160px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    margin: auto;
    border-radius: 30px;
    width: 550px;
    height: 600px;
    background: #FFF;

    .eday{
        padding: 60px 20px;

        div{
            margin-left: 20px;
            padding: 0 0 30px 0;
            font-weight: 600;
            text-align: left;
        }

        input{
            border: none;
            border-bottom: 2px solid #A9A9A9;
            padding: 5px 10px;
            outline: none;
            color: #565656;
        }

        input::-webkit-input-placeholder {
            color: #C6C6C6;
            font-size: 28px;
        }
        input::-moz-input-placeholder {
            color: #C6C6C6;
            font-size: 28px;
        }
        input::-ms-input-placeholder {
            color: #C6C6C6;
            font-size: 28px;
        }

    }
    .alarm>span{
        /*display: block;*/

        display: inline-block;
        width: 28px;
        height: 28px;
        margin-left: 10px;
        border-radius: 50%;
        border: 5px solid #7A7A7A;

    }
    .open{
         background: #16BB7F;
    }
    .close{
        background: #FFFFFF;
    }

    .btn{
        position: relative;
        left: 0;
        right: 0;
        margin: auto;
        /*background: #16BB7F;*/
        /*width: 250px;*/
        color: #FFF;

        div{
            background: #16BB7F;
            margin: 0 20px;
            width: 150px;
            border-radius: 30px;
            padding: 20px 0px;
            display: inline-block;
        }
    }

    .time{
        position: relative;
        .hide{
            position: absolute;
            top: 0;
            bottom: 30px;
            left: 70px;
            right: 0;
            background: #ccc;
            opacity: .7;
        }
    }
}
</style>