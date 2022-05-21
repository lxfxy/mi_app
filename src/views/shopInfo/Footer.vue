<template>
    <div class="shopInfo-footer">
        <div class="shopInfo-footer-item" style="flex-direction: column">
            <i class="iconfont icon-dianpu"></i>
            店铺
        </div>
        <div class="shopInfo-footer-item" style="flex-direction: column" @click="goShopCart">
            <i class="iconfont icon-gouwuche1"></i>
            购物车
            <span v-if="userInfo && userInfo.allShopNum > 0" class="shopCartNum">
                {{userInfo.allShopNum}}
            </span>
        </div>
        <Options />
    </div>
</template>

<script>
import Options from "./FooterOptions";
export default {
   data() {
       return {

       }
   },

    components: {
        Options,
    },

    methods: {
        goShopCart() {
            this.$router.push("/shopCart");
        }
    },

    computed: {
        userInfo() {
            return this.$store.state.userInfo
        }
    }
}
</script>