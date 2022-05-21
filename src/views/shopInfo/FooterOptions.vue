<template>
    <div class="shopInfo-footer-item shopInfo-footer-options" :style="'width:' + width ">
        <template v-if="hasShop">
            <button v-if="joinCartF" @click="joinCart" class="joinCart">加入购物车</button>
            <button 
            class="buyShop"
            :style="!joinCartF ? 'border-radius: 20px; width: 100%' : '' "
            @click="!joinCartF ? joinCart : null">
                {{!joinCartF ? '确认' : '立即购买'}}
            </button>
        </template>
        <template v-else>
            <button class="noShop">已售空</button>
        </template>
    </div>
</template>

<script>
import { createNamespacedHelpers, mapMutations, mapState } from "vuex";
import api from "@/store/api";
let { 
    mapState: mapShopInfoState,
    mapActions: mapShopInfoActions,
    mapMutations: mapShopInfoMutations
} = createNamespacedHelpers("shopInfo");
export default {
    props: {
        width: {
            default: "70%",
            type: String
        }
    },
    data() {
        return {
            
        }
    },

    computed: {
        ...mapShopInfoState([
            "joinCartF", 
            "selectedArr", 
            "placeArr", 
            "selectedObj", 
            "hasShop", 
            "shopInfo",
            "typePopupF",
            "selectedShopNum"
        ]),
        ...mapState(["userInfo", "isLogin"])
    },

    methods: {
        ...mapShopInfoMutations(["setTypePopupF", "setJoinCartF", "setPlacePopupF"]),
        ...mapMutations(["setUserCart"]),
        async joinCart() {
            let selArr = this.selectedArr.filter( item => item );
            let phone = this.userInfo.phone;
            let { id, msg } = this.shopInfo;
            let toast = null;
            if (selArr.length < msg.shopTypes.length) {
                if (this.typePopupF) return;
                !this.typePopupF ? this.setTypePopupF(true) : null;
                this.setJoinCartF(false);
                return;
            };
            if (this.placeArr.length <= 0) {
                this.setTypePopupF(false);
                this.setPlacePopupF(true);
                return;
            };
            if (!phone) {
                setTimeout(() => {
                    this.$router.push("/login");
                })
                return;
            };
            let params = {
                phone,
                place: this.placeArr.join(" "),
                types: "",
                shopId: id,
                shopNum: this.selectedShopNum,
            };
            for(let k in this.selectedObj) {
                params.types += `${k}:${this.selectedObj[k]};`
            };
            toast = this.$createToast({
                time: 0,
                mask: true,
                txt: "加入购物车中"
            });
            toast.show();
            let result = await api.joinCart(params);
            if (parseInt(result.data.code) !== 0) {

            } else {
                await this.setUserCart(result.data.data);
            }
            toast.hide();
            this.$createToast({
                type: "Correct",
                txt: result.data.codeText,
                time: 500
            }).show();
        }
    }
}
</script>