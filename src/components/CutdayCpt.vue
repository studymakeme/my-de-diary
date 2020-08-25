<template>
    <div>
        <div class="item" v-for="(item,index) in cutlis" :key="index">
            <div @click="editcutday(index)">
                <div class="record dv">
                    <p class="markday">{{item.title}}</p>
                    <p class="ymr">{{item.date}}<span class="alarm" v-show="item.alarm">闹铃：{{item.tim}}</span></p>
                </div>

                <div class="dv dvr" :class="item.add">
                    <p class="dec">{{item.day}}</p>
                    <div class="del" @click.stop="delcutday(index,item.id)">✖</div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        props:['cutlis'],
        data() {
            return {
                cd: localStorage.cd
            }
        },
        methods:{
            editcutday(index){
                // console.log(this.cutlis[index]);
                this.$emit('editcutday',this.cutlis[index])

            },
            delcutday(index, id) {
                if (!localStorage.da || localStorage.da == undefined) {
                    return
                }
                let daid = JSON.parse(localStorage.getItem('cd'))
                for (let i = 0; i < daid.length; i++) {
                    if (id == daid[i].id) {
                        this.cutlis.splice(index, 1)
                        daid.splice(i, 1)
                        this.$emit("delcutday", daid)
                    }
                }
            },
        }

    }
</script>

<style lang="scss" scoped>
    .item {
        background: #fff;
        padding: 20px 32px;
        margin-bottom: 24px;
        content: "";
        display: block;
        clear: both;
        overflow: hidden;
        border-radius: 30px;
        position: relative;

        .dv {
            display: inline-block;
        }

        .record {
            /*background: salmon;*/
            width: 450px;
            float: left;
            text-align: left;

            .markday {
                font-size: 32px;
                color: #333;
                line-height: 40px;
                margin-bottom: 16px;
            }

            .ymr {
                font-size: 28px;
                color: rgb(177, 177, 177);
            }

            .alarm{
                margin-left: 30px;
            }
        }

        .decday {
            background: rgb(103,208,235);
        }

        .addday {
            background: rgb(93,235,183);
        }

        .dvr {
            position: absolute;
            right: 0px;
            top: 0px;
            bottom: 0px;
            padding: 0 32px 0 20px;
            font-size: 32px;
            color: #fff;
            /*font-weight: 600;*/


            .dec {
                position: relative;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .add {
                position: relative;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);


            }

            .del{
                position: absolute;
                top: 6px;
                right: 24px;
                height: 36px;
                width: 36px;
                border-radius: 50%;
                line-height: 30px;
                font-size: 20px;
            }
        }
    }
</style>