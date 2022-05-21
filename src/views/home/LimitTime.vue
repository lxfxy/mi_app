<template>
    <div class="Newests limitTime">
        <div class="title h3">
            限时购
            <span class="timeBox">
                <span ref="curTimeBox">00</span>点起
                <span class="time">
                    <span class="hours" ref="hoursBox">00</span>:
                    <span class="minutes" ref="minutesBox">00</span>:
                    <span class="seconds" ref="secondsBox">00</span>
                </span>
            </span>
            <span class="more">更多 &gt;</span>
        </div>
        <scrollNav :data="limitTime" mode="limitTime"/>
    </div>
</template>

<script>
import scrollNav from "@/components/scrollNav";
import utils from "@/assets/utils";
import { createNamespacedHelpers } from "vuex";
let { mapActions: mapHomeActions } = createNamespacedHelpers("home");
export default {
    props: ["LimitTime"],
    data() {
        return {
            limitTime: []
        }
    },

    components: {
        scrollNav,
    },

    methods: {
        ...mapHomeActions(["getLimitTimeShop"]),
        setTime(_time) {
            _time = new Date(_time)
            let {
                curTimeBox,
                hoursBox,
                minutesBox,
                secondsBox
            } = this.$refs;
            let _curTime = /(\d+):\d+:\d+/.exec(_time.toString())[1] - 0;
            let timer = null;
            let fillZero = utils.fillZero;
            let dispatch = this.getLimitTimeShop;
            _curTime = _curTime - (_curTime % 3)
            _curTime >= 10 ? curTimeBox.innerHTML = _curTime : curTimeBox.innerHTML = "0" + _curTime;

            function getTime() {
                let time = _time.getTime() + 1000;
                let curTime = new Date(`${new Date().toLocaleDateString()} ${_curTime + 3}:00:00`).getTime();
                time = curTime - time;
                if (time <= 0) {
                    dispatch()
                    clearInterval(timer);
                    return;
                }
                let hours = parseInt(time / (60 * 60 * 1000));
                let min = parseInt(time / (60 * 1000) - hours * 60);
                let seconds = parseInt(time / 1000 - (min * 60 + hours * 60 * 60));
                _time = new Date(_time.getTime() + 1000);
                hoursBox.innerHTML = fillZero(hours);
                minutesBox.innerHTML = fillZero(min);
                secondsBox.innerHTML = fillZero(seconds);
            }
            getTime();
            timer = setInterval(getTime, 1000)
            // console.log(this.limitTime, new Date(time), curTime, curTimeBox)
        }
    },

    watch: {
        LimitTime: {
            immediate: true,
            async handler() {
                let { data, time } = await this.LimitTime;
                this.limitTime = data;
                this.setTime(time);
            }
        }
    }
}
</script>