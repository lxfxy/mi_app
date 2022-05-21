<template>
    <transition enter-class="enter" leave-to-class="leave">
        <div class="mySwipe" v-show="show">
            <header>
                <div class="back" @click="back">
                    <i class="iconfont icon-back-m"></i>
                </div>
                <p>{{title}}</p>
            </header>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            required: true,
        }
    },
    data() {
        return {

        }
    },

    methods: {
        back() {
            this.$emit("close");
        }
    },
    
}
</script>

<style scoped>
.back {
    position: absolute;
    left: 10px;
    top: 10px;
}

.mySwipe {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fff;
    transition: .5s;
    z-index: 1000;
}

.enter {
    left: 100%;
}

.leave {
    left: 100%;
}

header {
    background-color: #fff;
    border-bottom: 2px solid #ddd;
    position: relative;
    color: #333;
    font-size: 14px;
}
</style>