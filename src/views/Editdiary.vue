<template>
    <div class="edit">
        <div class="edit-head">
            <!--this.$router.replace('/login')-->
            <span class="icon-zuojiantou head-span zjt" @click="$router.replace('/dmark')"></span>
            <span class="icon-zhengque head-span zq"
                  @click="saveDiary">
            </span>
            <div class="ymrw">
                <div class="month-date">{{dd.month}}月{{dd.date}}日</div>
                <div class="year-weekday">
                    <span class="yw">{{dd.year}}</span>
                    <span class="yw">{{dd.weekday}}</span>
                </div>
            </div>
        </div>

        <div class="edit-content">
            <quill-editor v-model="content"
                          ref="myQuillEditor"
                          :options="custom">
            </quill-editor>
        </div>


        <div class="edit-tools">
            <i class="icon-dizhi dizhi " @click="show = true"></i>
            <span class="dizhi-text" @click="show = true" v-show="!show">{{cip = str}}</span>
            <input class="inp" type="text" v-show="show" @blur="show = false" v-model="str">
        </div>
        <!--<div class="tools">-->
        <!--<div class="tool-block tools-weather">-->
        <!--<span class="tool-block-close icon-arrow-null"></span>-->
        <!--222222222-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show:false,
                str:null,
                toolIndex: null,
                dd: this.$route.params.dd,
                diaryinfo: this.$route.params.diaryinfo,
                content: '',
                diary: {},
                custom: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'indent': '-1'}, {'indent': '+1'}],
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],
                            [{'color': []}, {'background': []}],
                            [{'align': []}],
                            ['clean'],
                            ['image'] //图片
                        ]
                    }
                },
                cip: '',
                id:null,
                share:null
            }
        },
        mounted() {
               // console.log('aa',this.diaryinfo.id);
            if(this.diaryinfo == undefined){
                this.getCip()
            }else {
                this.content = this.diaryinfo.text;
                this.str = this.diaryinfo.cip;
                this.id = this.diaryinfo.id;
                this.share = this.diaryinfo.share;
            }

            // this.$http('/api/v1/live?limit=20&offset=0').then(res => console.log('/api', res))
            // this.axios('/dmzj/recommend.json').then(res => console.log('/dmzj', res))
        },
        methods: {
            getCip() {
                this.$http('/api').then(res => {
                    let temperature = res.data.result.ad_info;
                    // let temperature = JSON.parse(res.data);
                    this.str = temperature.province + temperature.city + temperature.district;
                    console.log(this.str);
                    // this.cip = temperature.cname
                    // this.str = this.cip
                })
            },
            saveDiary() {
                this.diary = {
                    id: this.id != null ? this.id : 'diary' + (new Date()).getTime(),
                    user:'zao',
                    dd: this.dd,
                    text: this.content,
                    cip: this.cip,
                    share: this.share != null ? this.share : false,
                }

                if (this.content == "<p>记下你的心情...</p>") {
                    return
                }
                // console.log(this.diary)
                this.$router.push({
                    path: '/',
                    name: 'diary',
                    params: {
                        diary: this.diary
                    }
                })
            },

        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            },
        },
    }
</script>

<style lang="scss" scoped>
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

        .head-span {
            font-size: 60px;
        }

        .zjt {
            float: left;
        }

        .zq {
            float: right;
        }
    }

    .edit-content {
        position: fixed;
        top: 130px;
        right: 0;
        left: 0;
        bottom: 100px;
        /*background: rgb(235, 255, 251);*/
        text-align: left;

        overflow-y: scroll;

        .edit-text {
            outline: 0;
            min-height: 100%;
        }
    }

    .edit-tools {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100px;
        width: 100%;
        border-top: 1px solid #DEDEDE;
        line-height: 100px;

        .dizhi-text {
            display: inline-block;
            margin-left: 10px;
            font-size: 28px;
            max-width: 420px;
            height: 28px;
            line-height: 28px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            /*background: #5a5a68;*/
            color: #000;
        }
        .inp{
            outline: 0;
            font-size: 28px;
            border: 0;
            border-bottom: 1px solid #B9B9B9;
            text-align: center;
        }
    }

    .tools {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0 20px 00px 20px;
        border-top: 1px solid rgb(234, 234, 234);
        background-color: #fff;

        .tool-block {
            height: 260px;
            background: #fff;
            position: relative;


            .tool-block-close {
                position: absolute;
                top: 0px;
                right: 0px;
                display: inline-block;
                font-size: 50px;
                width: 60px;
                height: 60px;
                line-height: 60px;
            }
        }

        .tools-time {
            /*background: #9933ff;*/
        }

        .tools-ymr {
            padding-top: 60px;
        }

        .uls {
            content: "";
            clear: both;
            display: inline-block;
            margin-bottom: 40px;
            text-align: center;

            .lis {
                float: left;
            }

            .inps {
                outline: 0;
                width: 120px;
                text-align: center;
                border: 0;
                border-bottom: 1px solid seagreen !important;
            }
        }
    }
</style>