<template>
    <div class="diary">
        <div class="diary-head">
            <div class="sharebtn"
                 :class="[btn ? 'open' : 'close']"
                 @click="openvisit">
                访客
            </div>
            <div class="search">
                <input class="inp-text"
                       type="text"
                       v-model="str"
                       @keydown.enter="searchStr()">
                <div class="icon-search search-ik"></div>
            </div>
        </div>

        <div class="diarylis">
            <ReaddiarysCpt :diarylis="dlis" :btn="btn" @deldlis="deldlis" @getsharelis="getsharelis" ref="read"></ReaddiarysCpt>
        </div>
        <botbar :visitshow="btn"></botbar>
    </div>
</template>

<script>
    import Botbar from "../components/Botbar"
    import ReaddiarysCpt from "../components/ReaddiarysCpt"

    export default {
        props:['visitshow'],
        data() {
            return {
                vibtn:localStorage.vbtn,
                btn:'',
                str: '',
                diary: {},
                da: localStorage.da,
                dlis: [],
                sharelis:[]
            }
        },
        mounted() {
            if(this.vibtn == null){
                localStorage.setItem('vbtn', JSON.stringify(false));
                this.btn = false;
            }else {
                this.btn = JSON.parse(localStorage.getItem('vbtn'));
            }
            // localStorage.setItem('vbtn', JSON.stringify(this.btn));

            this.diary = this.$route.params.diary;
            if (this.da && this.da != "undefined") {
                this.dlis = JSON.parse(localStorage.getItem('da'))
            }

            if (this.diary != undefined) {
                for(let key in this.dlis){
                    if(this.dlis[key].id == this.diary.id){
                        this.dlis.splice(key,1);
                    }
                }

                this.dlis.unshift(this.diary);
                localStorage.setItem('da', JSON.stringify(this.dlis))
                this.diary = {}
            }
        },

        methods: {
            openvisit(){
                this.btn = !JSON.parse(localStorage.getItem('vbtn'));
                localStorage.setItem('vbtn', JSON.stringify(this.btn));
                // console.log('88',JSON.parse(localStorage.getItem('vbtn')))
            },
            deldlis(dd){
                // console.log('dd',dd);
                localStorage.setItem('da', JSON.stringify(dd))
            },
            getsharelis(dd){
                this.sharelis = dd;
                // console.log('ss',dd)
            },
            searchStr() {
                // if(!localStorage.da || localStorage.da == undefined){
                //     return
                // }
                this.dlis = JSON.parse(localStorage.getItem('da'))
                if (!this.str) {
                    return
                }
                let dlisArr = [];
                for (let i = 0; i < this.dlis.length; i++) {
                    if (this.dlis[i].text.indexOf(this.str) != -1) {
                        dlisArr.push(this.dlis[i])
                    }
                }
                this.str = ''
                this.dlis = dlisArr;
            }
        },
        components: {
            Botbar,
            ReaddiarysCpt
        }
    }
</script>

<style lang="scss" scoped>
    .diary-head {
        position: relative;
        height: 130px;
        padding-top: 50px;
        background: #16bb7f;

        .sharebtn{
            position: absolute;
            left: 40px;
            height: 52px;
            width: 90px;
            border-radius: 30px;
            font-size: 28px;
            line-height: 52px;
            text-align: center;
        }
        .open{
            background: #14A771;
            color: #FFFFFF;
        }
        .close{
            background:#fff;
            color: #14A771;
        }
        .search {
            position: relative;
            display: inline-block;
            width: 450px;
            height: 50px;
            text-align: center;

            .inp-text {
                width: 380px;
                height: 50px;
                padding-left: 64px;
                background: rgba(255, 255, 255, .3);
                font-size: 28px;
                color: #ffffff;
                outline: 0;
                border: 0 {
                    radius: 90px;
                };
            }

            .search-ik {
                position: absolute;
                top: 8px;
                font-size: 40px;
                left: 20px;
                color: #fff;
            }
        }

        .menu-ik {
            position: absolute;
            top: 50px;
            right: 16px;
            font-size: 50px;
            color: #FFFFFF;
            opacity: .9;
        }
    }

    .diarylis {
        background: #F0F0F0;
        position: fixed;
        top: 130px;
        bottom: 120px;
        left: 0;
        right: 0;
        overflow: hidden;
        overflow-y: scroll;
    }
</style>