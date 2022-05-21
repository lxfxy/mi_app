<template>
    <div class="ShopInfo-place">
        <div class="fillShopInfoBox" @click="changeShowPopup(true)">
            <div class="fillShopInfoBox-Title">
                送至
            </div>

            <div class="fillShopInfoBox-Content">
                {{placeArr.length > 0 ? placeArr.slice(1, 3).join(" ") : "请选择地区"}}
            </div>

            <div class="rightIcon"></div>
        </div>
        <!-- <Popup :show="placePopupF" @close="changeShowPopup" Headheight="8%" Mainheight="92%">
            <template #header>
                <div style="text-align: center; width: 100%; font-size: 12px; margin-bottom: 12px;">所在地区</div>
                <div class="placeMsg">
                    <template v-if="place.length > 0">
                        <span 
                        class="placeMsg-Item" 
                        v-for="(item, index) in place" :key="item + index"
                        @click="changeCurData(index)">
                            {{item}}
                        </span>
                        <span v-if="hasChild">请选择地区</span>
                    </template>

                    <span v-else>请选择地区</span>
                </div>
            </template>

            <template #main>
                <div 
                class="place-Item" 
                v-for="(item) in curData || data" 
                :key="item.title"
                :class="place && place.includes(item.title) ? 'active' : ''"
                @click="selectPlace(item.title)">
                    {{item.title}}
                </div>
            </template>
        </Popup> -->
        <PlacePopup :show="placePopupF" @close="changeShowPopup" />
    </div>
</template>

<script>
import PlacePopup from "@/components/PlacePopup";
import { createNamespacedHelpers } from "vuex";
let { 
    mapState: mapShopInfoState,
    mapMutations: mapShopInfoMutations
} = createNamespacedHelpers("shopInfo");
export default {
    props: [],
    data() {
        return {
            show: false,
        }
    },

    components: {
        PlacePopup,
    },

    computed: {
        ...mapShopInfoState(["placePopupF", "placeArr"])
    },

    methods: {
        ...mapShopInfoMutations(["setPlacePopupF"]),
        changeShowPopup(flag) {
            this.setPlacePopupF(flag);
        },
    },
}
</script>