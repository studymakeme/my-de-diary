<template>
    <div>
        <div class="readlis" v-for="(item,index) in diarylis" :key="index">
            <div class="tiemaxis">
                <p class="readdd">{{item.dd.date > 10 ? item.dd.date :"0" + item.dd.date}}<span class="readww">{{item.dd.weekday}}</span>
                </p>
                <p class="readym">{{item.dd.year}}.{{item.dd.month}}</p>
            </div>
            <div class="diarytext" @click="areaddiary(index)">
                <i class="pot"></i>
                <div class="textinfo">
                    <i class="triangle"></i>
                    <div class="text" v-html="item.text"></div>
                    <div class="dizhi">
                        <b class="icon-dizhi"></b>
                        <p class="dizhi-text">{{item.cip ? item.cip : ''}}</p>
                    </div>
                    <span class="cha" @click.stop="delDiary(index,item.id)">✖</span>
                    <div class="forward icon-forward"
                         :class="item.share ? 'fbtn':''"
                         v-show="btn"
                         @click.stop="shareDiary(index,item.id)"></div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['diarylis','btn'],
        data() {
            return {
                dils: [],
                da: localStorage.da,
                fbtn:'',
                sharelis:[],
                daid:'',
            }
        },
        mounted(){
            this.daid = JSON.parse(localStorage.getItem('da'))

            for (let i = 0; i < this.daid.length; i++) {
                if (this.daid[i].share) {
                    this.sharelis.unshift(this.daid[i])
                }
            }
        },
        watch: {
            diarylis(newValue) {
                this.dils = newValue;
            },
        },
        methods: {
            delDiary(index, id) {
                if (!localStorage.da || localStorage.da == undefined) {
                    return
                }
                // let daid = JSON.parse(localStorage.getItem('da'))
                for (let i = 0; i < this.daid.length; i++) {
                    if (id == this.daid[i].id) {
                        this.dils.splice(index, 1)
                        this.daid.splice(i, 1)
                        this.$emit("deldlis", this.daid)
                    }
                }
            },
            shareDiary(index, id){
                if (!localStorage.da || localStorage.da == undefined) {
                    return
                }

                for (let i = 0; i < this.daid.length; i++) {
                    if (id == this.daid[i].id) {

                        if(this.dils[index].share){
                            this.dils[index].share =false;

                            for (let j = 0; j < this.sharelis.length; j++) {
                                if (this.sharelis[j].id == this.dils[index].id) {
                                    this.sharelis.splice(j, 1)
                                }
                            }

                        }else {
                            this.dils[index].share = true;
                            this.sharelis.unshift(this.dils[index]);
                        }

                        localStorage.setItem('sd', JSON.stringify(this.sharelis));
                        this.$emit("getsharelis", this.sharelis)
                        this.$emit("deldlis", this.dils)
                    }
                }
            },
            areaddiary(index) {
                this.$router.push({
                    name: 'adiary',
                    params: {
                        diaryinfo: this.dils[index]
                    }
                })
                console.log("this.dils", this.dils[index]);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .readlis {
        display: flex;
        height: 200px;
        overflow: hidden;
        overflow-y: scroll;
    }

    .tiemaxis {
        height: 100%;
        border-right: 2px solid rgb(219, 219, 219);
        width: 200px;

        .readdd {
            font-size: 36px;
            font-weight: 600;
            color: rgb(53, 53, 53);
            margin: 40px 0 10px 0;
        }

        .readww {
            font-size: 28px;
            margin-left: 10px;
            color: rgb(109, 109, 109);
        }

        .readym {
            font-size: 28px;
            color: rgb(170, 170, 170);
        }
    }

    .diarytext {
        flex: 1;
        position: relative;
        animation:myfirst 0.5s ease 0s 1 alternate;

        @keyframes myfirst
        {
            0%   {left:200px; top:0px;}
            100% {left:0px; top:0px;}
        }

        .pot {
            display: inline-block;
            width: 32px;
            height: 32px;
            background: rgb(240, 240, 240);
            border: 1px solid rgb(219, 219, 219);
            border-radius: 50%;
            position: absolute;
            top: 58px;
            left: -16px;

        }

        .textinfo {
            height: 170px;
            width: 460px;
            background: #fff;
            position: relative;
            top: 20px;
            left: 52px;

            .triangle {
                position: absolute;
                top: 28px;
                left: -24px;
                width: 0px;
                height: 0px;
                border: 24px solid #fff;
                border-left: 0;
                border-top: 24px solid transparent;
                border-bottom: 24px solid transparent;
            }

            .text {
                text-align: left;
                padding: 12px 16px 0 16px;
                max-height: 120px;
                max-width: 420px;
                font-size: 28px;
                line-height: 38px;
                color: rgb(130, 130, 130);
                overflow: hidden;
                word-wrap: break-word;
                /*background: #f59;*/
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

            .cha {
                display: inline-block;
                width: 50px;
                height: 50px;
                text-align: center;
                line-height: 50px;
                position: absolute;
                top: 0px;
                right: 0px;
                font-size: 24px;
                color: rgb(130, 130, 130);
            }
        }

        .forward{
            position: absolute;
            bottom: 8px;
            right: 12px;
            width: 32px;
            height: 32px;
            vertical-align: center;
            font-size: 24px;
            color: rgb(198, 198, 198);
        }
        .fbtn{
            color: #18CB8A;
        }
    }
</style>