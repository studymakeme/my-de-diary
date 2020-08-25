<template>
    <div>
        <div class="calendar-wrapper">
            <!--日历导航-->
            <div class="calendar-toolbar">
                <div class="prev cal-arrow icon-arrow-null" @click="prevMonth"></div>
                <div class="cal-title">{{currentDateStr}}</div>
                <div class="next cal-arrow icon-arrow-null" @click="nextMonth"></div>
            </div>
            <!--星期-->
            <div class="calendar-week">
                <div class="week-days" v-for="item of weekList" :key="item">{{item}}</div>
            </div>
            <!--日历日期-->
            <div class="calendar-inner">
                <div class="calendar-item "
                     :class="[item.disable ? 'disabled' : '']"
                     v-for="(item,index) of calendarList"
                     :key="index"
                     @click="currentIndex = index;getClidays(item.date,index);getCalendarData()"
                >
                    <span class="calspan"
                          :class="[index == currentIndex ? 'con':'',item.calmark ? 'calmark':'']">{{item.date}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['potcolor'],
        name: 'DmarkCpt',
        data() {
            return {
                currentIndex: null,
                current: {},  //当前时间
                calendarList: [],    //遍历日期
                shareDate: new Date(),
                weekList: ['日', '一', '二', '三', '四', '五', '六'],
                dd: {},
                potbg: [],
                curMonthIndex:null
            }
        },
        watch: {
            potcolor(newValue) {
                this.potbg = newValue
                for (let i = 0; i < this.calendarList.length; i++) {
                    for (let k = 0; k < this.potbg.length; k++) {
                        if (this.calendarList[i].date == this.potbg[k].dd.date
                            && this.calendarList[i].year == this.potbg[k].dd.year
                            && this.calendarList[i].month + 1 == this.potbg[k].dd.month) {

                            this.calendarList[i].calmark = true;
                        }
                    }
                }
            }
        },
        computed: {
            // 显示当前时间
            currentDateStr() {
                let {year, month} = this.current;
                return `${year}年${this.pad(month + 1)}月`;
            },
        },
        mounted() {
            this.init();
            this.getClidays();
            this.getCalendarData();
            //保存当前月份
            this.curMonthIndex = this.current.month
        },
        methods: {
            init() {
                //初始当前时间
                this.setCurrent();
                this.calendarCreator();
            },
            getDaysByMonth(year, month) {
                //判断当天有多少天
                return new Date(year, month + 1, 0).getDate();
            },
            pad(num) {
                return num < 10 ? `0${num}` : num;
            },
            prevMonth() {
                this.current.month--;
                this.getOneday()
            },
            nextMonth() {
                this.current.month++;
                this.getOneday()
            },
            stringify(year, month, date) {
                let str = [year, this.pad(month + 1), this.pad(date)].join('-');
                return str;
            },
            setCurrent(d = new Date()) {
                let year = d.getFullYear();
                let month = d.getMonth();
                let date = d.getDate();
                this.current = {
                    year,
                    month,
                    date
                }
                this.currentIndex = date;
            },
            correctCurrent() {
                let {year, month, date} = this.current;
                //某月最多的天数
                let maxDate = this.getDaysByMonth(year, month);

                date = Math.min(maxDate, date);
                let instance = new Date(year, month, date);
                this.setCurrent(instance);
            },
            getFirstDayByMonths(year, month) {
                //一个月第一天是星期几
                return new Date(year, month, 1).getDay();
            },
            getLastDayByMonths(year, month) {
                return new Date(year, month + 1, 1).getDay();
            },
            calendarCreator() {
                //一天的时间戳
                const oneDayMs = 24 * 60 * 60 * 1000;

                let list = [];
                let {year, month} = this.current;

                let firstDay = this.getFirstDayByMonths(year, month);

                let lastDay = this.getLastDayByMonths(year, month);
                lastDay = lastDay == 0 ? 7 : lastDay;

                let begin = new Date(year, month, 1).getTime() - oneDayMs * firstDay;
                let end = new Date(year, month + 1, 0).getTime() + oneDayMs * (7 - lastDay);
                while (begin <= end) {
                    this.shareDate.setTime(begin);
                    let year = this.shareDate.getFullYear();
                    let curMonth = this.shareDate.getMonth();
                    let date = this.shareDate.getDate();
                    list.push({
                        year: year,
                        month: curMonth,
                        date: date,
                        disable: curMonth !== month,
                        value: this.stringify(year, curMonth, date),
                        calmark: false
                    });
                    begin += oneDayMs;
                }
                this.calendarList = list;
                this.currentIndex = this.currentIndex + firstDay - 1;
            },
            getOneday(){
                //month不在0~11范围内，重新计算
                this.correctCurrent();
                //生成新的日期
                this.calendarCreator();

                let {year, month} = this.current;
                //getFirstDayByMonths（）获取一个月的第一天是星期几
                let firstDay = this.getFirstDayByMonths(year, month);
                this.currentIndex = firstDay;
                if(this.current.month == this.curMonthIndex){
                    this.currentIndex = this.current.date + firstDay -1;
                }
                let dd = new Date(year, month).getDate()

                this.getClidays(dd, firstDay, firstDay);
                this.getCalendarData()
            },
            getClidays(text, index, kk) {
                let mon = null;
                if (index || index == 0) {
                    mon = this.calendarList[index].month + 1;
                }
                this.dd = {
                    year: this.current.year,
                    month: mon ? mon : this.current.month + 1,
                    date: text ? text : this.current.date,
                    weekday: '周' + (kk != undefined ? this.weekList[kk] : this.weekList[this.currentIndex % 7])
                }
                return this.dd;
            },
            getCalendarData() {
                this.$emit('getCalendarData', this.dd.year, this.dd.month, this.dd.date, this.dd.weekday);
            },
        }

    }
</script>

<style lang="scss" scoped>
    .calendar-wrapper {
        padding: 0px 32px 10px 32px;
        /*background-color: rgba(254,151,32,.3);*/
    }

    .calendar-toolbar {
        height: 50px;
        width: 100%;
        /*background: #D0FAF5;*/
        /*display: flex;*/

        div {
            /*flex: 1;*/
            display: inline-block;
            line-height: 50px;
        }

        .cal-title {
            font-size: 40px;
        }

        .cal-arrow {
            font-size: 50px;
            text-align: center;

            &.prev {
                transform: rotateZ(90deg);
                float: left;
            }

            &.next {
                transform: rotateZ(-90deg);
                float: right;
            }
        }

    }

    .calendar-week {
        /*background-color: rgb(199,234,248);*/
        margin-top: 30px;
        font-size: 24px;
        height: 30px;
        line-height: 30px;
        display: flex;

        .week-days {
            flex: 1;
        }
    }

    .calendar-inner {
        margin-top: 20px;

        .calendar-item {
            text-align: center;
            display: inline-block;
            width: (100% / 7);
            height: 66px;
            font-weight: 600;
            line-height: 66px;

            .calspan {
                display: inline-block;
                width: 50px;
                height: 50px;
                line-height: 50px;
                vertical-align: middle;
                border-radius: 50%;
            }

            .calmark {
                color: rgba(255, 255, 255, 1);
                background-color: rgb(22, 187, 127);
            }

            .con {
                color: rgba(0, 0, 0, 1);
                background-color: rgb(227, 227, 227);
            }
        }

        .disabled {
            font-weight: normal;
            color: rgb(180, 180, 180);

            .calmark {
                color: rgba(255, 255, 255, .9);
                background-color: rgba(22, 187, 127, .6);
            }

            .con {
                background-color: rgb(227, 227, 227);
                color: rgb(131, 131, 131);
            }
        }
    }

</style>