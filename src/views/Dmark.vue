<template>
    <div class="dmark">
        <div class="dmark-head">
            <div class="month-date">{{dd.month}}月{{dd.date}}日</div>
            <div class="year-weekday">
                <span class="yw">{{dd.year}}</span>
                <span class="yw">{{dd.weekday}}</span>
            </div>
        </div>
        <div class="dmark-content">
            <div>
                <DmarkCpt @getCalendarData="getCalendarData(arguments)"  :potcolor="potcolor"></DmarkCpt>
            </div>
            <div class="dmark-diary">
                <div class="diary-num">
                    <ReaddiarysCpt :diarylis="dlis" :btn="btn" @deldlis="deldlis"></ReaddiarysCpt>
                </div>
            </div>
        </div>
        <router-link :to="{name:'editdiary',params:{dd}}">
            <Editicon></Editicon>
        </router-link>
        <Botbar></Botbar>
    </div>
</template>

<script>

    import DmarkCpt from "../components/DmarkCpt";
    import Editicon from "../components/Editicon";
    import Botbar from "../components/Botbar"
    import ReaddiarysCpt from "../components/ReaddiarysCpt"

    export default {
        data() {
            return{
                dd: {},
                da: localStorage.da,
                dlis: [],
                potcolor:[],
                btn:'',

            }
        },

        mounted() {
            this.btn = JSON.parse(localStorage.getItem('vbtn'));
            this.getPotcolor();
        },
        methods: {
            getCalendarData(dd) {
                this.dd = {
                    year: dd[0],
                    month: dd[1],
                    date: dd[2],
                    weekday: dd[3]
                }

                if (!this.da) {
                    return
                }
                this.getPotcolor()

            },
            deldlis(dd){
                localStorage.setItem('da', JSON.stringify(dd))
            },
            getPotcolor(){
                if(!this.da || this.da == "undefined"){
                    return
                }
                this.potcolor = JSON.parse(localStorage.getItem('da'))
                // console.log('111111',this.potcolor)
                this.dlis = [];
                for (let i = 0; i < this.potcolor.length; i++) {
                    let dds = this.potcolor[i].dd;
                    if (dds.year == this.dd.year &&
                        dds.month == this.dd.month &&
                        dds.date == this.dd.date) {
                        this.dlis.push(this.potcolor[i])
                    }
                }
            }
        },
        components: {
            DmarkCpt,
            Editicon,
            Botbar,
            ReaddiarysCpt
        }
    }
</script>

<style lang="scss" scoped>
    .dmark-head {
        height: 130px;
        padding: 50px 32px 0 32px;
        background: #16bb7f;
        text-align: left;

        .month-date {
            display: inline-block;
            font-size: 48px;
            line-height: 48px;
            font-weight: 600;
            color: #fff;
        }

        .year-weekday {
            display: inline-block;
            margin-left: 20px;
            vertical-align: top;

            .yw {
                display: block;
                max-width: 80px;
                font-size: 20px;
                line-height: 24px;
                color: #fff;

            }
        }
    }

    .dmark-content {
        position: fixed;
        top: 130px;
        left: 0;
        right: 0;
        bottom: 120px;
        display: flex;
        flex-direction: column;
        /*background-color: beige;*/

        .dmark-diary {
            flex: 1;
            position: relative;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: rgb(240, 240, 240);
            overflow: hidden;
            overflow-y: scroll;
        }

    }

</style>