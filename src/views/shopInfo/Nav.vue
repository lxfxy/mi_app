<template>
    <div class="shopInfo_Nav">
        <Back />
        <div v-for="(item) in navs" :key="item" class="shopInfo_Nav-item">
            {{item}}
        </div>
        <div class="shopInfo_Nav-optionsBox">
            <i class="iconfont icon-gengduo" @click.prevent="showOptions"></i>
            <ul class="shopInfo_Nav-options" v-show="isShowOptions">
                <li 
                class="shopInfo_Nav-options-item" 
                v-for="(item) in navOptions" 
                :key="item.text"
                @click="optionsClick(item.path)">
                    {{item.text}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Back from "@/components/back";

export default {
    props: ["navs", "navOptions"],
    data() {
        return {
            isShowOptions: false,
        }
    },

    components: {
        Back
    },

    methods: {
        optionsClick(path) {
            this.$router.push(path);
        },

        showOptions(ev) {
            this.isShowOptions = !this.isShowOptions;
            if (this.isShowOptions) {
                let timer = setTimeout(() => {
                    let fn = () => {
                        this.isShowOptions = false;
                        document.removeEventListener("click", fn);
                    };
                    document.addEventListener("click", fn);
                });
            }
        }
    }
}
</script>

<style scoped>
.shopInfo_Nav {
    height: 40px;
    background-color: #f0f0f0;
    position: fixed;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
}

.shopInfo_Nav-item {
    margin: 0 10px;
}

.shopInfo_Nav-optionsBox {
    position: absolute;
    right: 20px;
}

.shopInfo_Nav-options {
    background-color: #fff;
    position: absolute;
    transform: translate3d(-35%, 4px, 0);
    width: 60px;
    line-height: 30px;
    text-align: center;
    z-index: 10;
}

.shopInfo_Nav-options::after {
    content: "";
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    width: 15px;
    height: 10px;
    clip-path: polygon(50% 0, 0 100%, 100% 100%);
}
</style>