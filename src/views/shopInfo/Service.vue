<template>
    <div class="ShopInfo-Service">
        <div class="fillShopInfoBox" @click="changeShowPopup(true)">
            <div class="fillShopInfoBox-Title">
                服务
            </div>

            <div class="fillShopInfoBox-Content">
                <span v-for="item in data" :key="item.title">{{item.title}}</span>
            </div>

            <div class="rightIcon"></div>
            
        </div>

        <Popup :show="show" @close="changeShowPopup">
            <template #header>
                <div class="center">说明</div>
            </template>
            <template #main>
                <div class="ShopInfo-Service-item" v-for="(item) in data" :key="item.title">
                    <div class="ShopInfo-Service-item-title">
                        {{item.title}}
                    </div>
                    <div class="ShopInfo-Service-item-content">
                        {{item.content}}
                    </div>
                </div>
            </template>
        </Popup>
    </div>
</template>

<script>
import Popup from "@/components/Popup";

export default {
    props: ["data"],
    data() {
        return {
            show: false
        }
    },

    methods: {
        changeShowPopup(flag) {
            this.show = flag;
        },
    },

    components: {
        Popup,
    }
}
</script>