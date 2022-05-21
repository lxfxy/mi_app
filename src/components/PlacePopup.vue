<template>
    <Popup :show="show" @close="$emit('close')" Headheight="8%" Mainheight="92%">
        <template #header>
            <div style="text-align: center; width: 100%; font-size: 12px; margin-bottom: 12px;">所在地区</div>
            <div class="placeMsg">
                <template v-if="placeArr.length > 0">
                    <span 
                    class="placeMsg-Item" 
                    v-for="(item, index) in placeArr" :key="item + index"
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
            v-for="(item) in curData || places" 
            :key="item.title"
            :class="placeArr && placeArr.includes(item.title) ? 'active' : ''"
            @click="selectPlace(item.title)">
                {{item.title}}
            </div>
        </template>
    </Popup>
</template>

<script>
import Popup from "@/components/Popup";
import { createNamespacedHelpers } from "vuex";
let { 
    mapState: mapShopInfoState,
    mapMutations: mapShopInfoMutations
} = createNamespacedHelpers("shopInfo");
export default {
    props: ["show"],
    data() {
        return {
            curData: null,
            hasChild: true,
            placeIndex: 0,
            curData: null,
        }
    },

    components: {
        Popup,
    },

    computed: {
        ...mapShopInfoState(["placeArr", "places"])
    },

    methods: {
        ...mapShopInfoMutations(["setPlace"]),
        selectPlace(title) {
            let data = null;
            let hasChild = null;
            let place = this.placeArr.slice(0);
            if (!this.curData) {
                data = this.places.find( item => item.title === title)
            } else {
                data = this.curData.find( item => item.title === title)
            };
            hasChild = data.children;
            if (!hasChild && !place.includes(title)) {
                place[this.placeIndex] = title;
                this.curData.push(1);
                this.curData.pop();
                this.hasChild = false;
                // return;
            };
            this.setPlace(place.slice(0, this.placeIndex).concat([title]));
            if (hasChild) {
                this.curData = data.children;
                this.placeIndex++;
                return
            };
        },
        changeCurData(index) {
            let place = this.placeArr.slice(0, index);
            let pos = 0;
            let _data = this.places;
            this.placeIndex = index;
            this.setPlace(this.placeArr.slice(0, index + 1));
            while (pos <= index) {
                let data = _data.find(item => item.title === place[pos]);
                if (data && data.children) {
                    _data = data.children;
                    pos++;
                } else {
                    break;
                }
            };
            this.curData = _data;
            if (_data[0].children) {
                this.hasChild = true;
            } else {
                this.hasChild = false;
            };
        }
    },

    created() {
        if (this.placeArr.length > 0) {
            this.setPlace(this.placeArr.slice(0));
            this.changeCurData(this.placeArr.length - 1);
        }
    }
}
</script>

<style scoped>
.placeMsg-Item {
    border-right: 1px solid #999;
    margin: 0 4px;
    padding-right: 2px;
}

.placeMsg-Item:last-child {
    border-right: none;
}

.place-Item {
    box-sizing: border-box;
    padding: 14px;
    border-bottom: 1px solid #ddd;
}

.place-Item.active {
    color: red;
}
</style>