<template>
    <transition enter-class="enter" leave-class="leave">
        <div class="Popup" v-show="show">
            <div class="Popup-mask" @click="close"></div>
            <div class="PopupContentBox">
                <div class="Popup-header" :style="`height: ${Headheight}`">
                    <div class="Popup-close" @click="close"></div>
                    <slot name="header"></slot>
                </div>
                <div class="Popup-main" :style="`height: ${Mainheight}`">
                    <!-- <cube-scroll ref="scroll"> -->
                        <slot name="main"></slot>
                    <!-- </cube-scroll> -->
                </div>
                <div class="Popup-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        show: {
            default: false,
            type: Boolean,
        },
        Headheight: {
            type: String
        },
        Mainheight: {
            type: String
        },
    },
    computed: {
        
    },

    methods: {
        close() {
            this.$emit("close", false);
        }
    }
}
</script>

<style scoped>
.Popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
}

.enter .PopupContentBox {
    top: 100%;
}

.enter .Popup-mask {
    opacity: 0;
}

.leave .PopupContentBox {
    top: 100%;
}

.leave .Popup-mask {
    opacity: 0;
}

.Popup-mask {
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: 1s;
    opacity: 1;
}

.PopupContentBox {
    position: absolute;
    top: 30%;
    width: 100%;
    height: 70%;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    box-sizing: border-box;
    padding: 10px 0;
    transition: .5s;
}

.Popup-header {
    border-bottom: solid 1px #ddd;
    padding: 0 10px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    position: relative;
}

.Popup-main {
    width: 100%;
    overflow-y: scroll;
    font-size: 12px;
}

.Popup-close {
    position: absolute;
    right: 14px;
    top: 6px;
    width: 15px;
    height: 15px;
}

.Popup-close::after,
.Popup-close::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #999;
}

.Popup-close::after {
    transform: rotate(45deg);
}

.Popup-close::before {
    transform: rotate(-45deg);
}

.Popup-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 5px 0;
    display: flex;
    justify-content: center;
    background-color: #fff;
}
</style>