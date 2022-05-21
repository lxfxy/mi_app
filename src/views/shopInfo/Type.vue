<template>
    <div class="ShopInfo-type">
        <div class="fillShopInfoBox" @click="changeShowPopup(true)">
            <div class="fillShopInfoBox-Title">
                已选
            </div>

            <div class="fillShopInfoBox-Content">
                {{selectedArr && selectedArr.length > 0 ? selectedArr.join(" ") : "请选择商品类型"}}
            </div>

            <div class="rightIcon"></div>
        </div>
        <Popup :show="typePopupF" @close="changeShowPopup" Headheight="20%" Mainheight="70%">
            <template #header>
                <div class="img">
                    <img :src="require('@/assets/images/shopMsg/item' + data.id + '/min.jpg')" alt="">
                </div>
                <div class="msgBox">
                    <div class="price">
                        <b>&yen;</b>
                        {{data.price}}
                    </div>
                    <div class="selectType">
                        已选 : 
                        <span v-for="(item, index) in selectedObj" :key="index">
                            {{index}}: {{item}}; 
                        </span>
                    </div>
                </div>
            </template>
            <template #main>
                <PopupMain :data="data.msg"/>
            </template>
            <template #footer>
                <Options width="90%"/>
            </template>
        </Popup>
    </div>
</template>

<script>
import Popup from "@/components/Popup";
import PopupMain from "./TypePopupMain";
import Options from "./FooterOptions";
import { createNamespacedHelpers } from "vuex";
let { 
    mapState: mapShopInfoState,
    mapActions: mapShopInfoActions,
    mapMutations: mapShopInfoMutations
} = createNamespacedHelpers("shopInfo");
export default {
    props: ["data"],
    data() {
        return {
            
        }
    },
    components: {
        Popup,
        PopupMain,
        Options,
    },

    methods: {
        ...mapShopInfoMutations(["setTypePopupF", "setJoinCartF"]),
        changeShowPopup(flag) {
            this.setTypePopupF(flag);
            if (!flag) {
                this.setJoinCartF(true);
            }
        }
    },

    created() {
        // console.log(this.data, "type 59")
    },

    computed: {
        ...mapShopInfoState(["selectedArr", "selectedObj", "typePopupF"])
    }
}
</script>