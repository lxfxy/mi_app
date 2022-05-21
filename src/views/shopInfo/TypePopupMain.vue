<template>
    <div class="ShopInfo-type-popupMain">
        <div class="ShopInfo-type-popupMain-item" v-for="(typeItem, index) in shopTypes" :key="typeItem.k">
            <div class="ShopInfo-type-popupMain-title">
                {{typeItem.k}}
            </div>
            <div class="ShopInfo-type-popupMain-content">
                <div class="ShopInfo-type-popupMain-content-item" 
                v-for="dataItem in typeItem.v" 
                :key="dataItem.name"
                :class="createClassName(dataItem.selected, dataItem.hasShop)"
                @click="shopTypesClick(typeItem.k, dataItem.name, index, dataItem.id)">
                    {{dataItem.name}}
                </div>
            </div>
        </div>
        <div class="ShopInfo-type-popupMain-item shopNumBox">
            <div class="ShopInfo-type-popupMain-title">
                数量
            </div>
            <div class="ShopInfo-type-popupMain-maxShopNumBox" v-if="data.maxSelShopNum">
                一次限购{{data.maxSelShopNum}}件
            </div>
            <div class="ShopInfo-type-popupMain-content">
                <span @click="changeShopNum('-')">-</span>
                <input type="text" :value="selectedShopNum">
                <span @click="changeShopNum('+')">+</span>
            </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let {
    mapMutations: mapShopInfoMutaions,
    mapState: mapShopInfoState,
} = createNamespacedHelpers("shopInfo")
export default {
    props: ["data"],
    data() {
        return {
            shopDatas: null,
            shopTypes: null,
            selectedId: null,
            selectedIndex: null,
            selectedShopNums: [],
        }
    },

    created() {
        let data = JSON.parse(JSON.stringify(this.data));
        let arr = [];
        this.shopTypes = data.shopTypes;
        this.shopDatas = data.shopData;
        this.shopDatas.forEach(item => {
            if (item.num < 0) return;
            arr.push(item.name);
        });
        if (arr.length <= 0) return;
        this.shopTypes.forEach(item => {
            let data = item.v.find( item => arr.includes(item.name));
            if (!data) return;
            data.hasShop = false;
        });
        console.log(this.shopTypes)
    },

    methods: {
        ...mapShopInfoMutaions(["setSelArr", "setSelObj", "setHasShop", "setSelShopNum"]),
        shopTypesClick(k, v, i, id) {
            this.shopTypes.find( (typeItem, index) => {
                if (typeItem.k === k) {
                    typeItem = typeItem.v.map( item => {
                        if (item.name === v) {
                            item.selected = !item.selected;
                            let val = item.selected ? item.name : "";
                            this.setSelArr({
                                k: i,
                                v: val
                            });
                            this.setSelObj({
                                k,
                                v: val
                            });
                        } else {
                            item.selected = false;
                        };
                        if (item.id && item.id === id && item.selected) {
                            this.selectedId = parseInt(id);
                        };
                        if (item.id && item.id === id && !item.selected) {
                            this.selectedId = null;
                        }
                        return item;
                    });
                    return true;
                };
            });
            this.changeShopTypes(i);
            this.shopTypes.push(1)
            this.shopTypes.pop();
        },
        changeShopTypes(_i) {
            let arr = [];
            let flag = true;
            for (let selInd = 0; selInd < this.selectedArr.length; selInd++) {
                let selItem = this.selectedArr[selInd];
                if (!selItem) continue;
                this.shopDatas.forEach( item => {
                    let curData = item.data.find(item => item.name === selItem);
                    if (item.id === this.selectedId) {
                        let num = item.num;
                        if (curData) {
                            num = curData.num;
                        };
                        this.selectedShopNums[_i] = num;
                    };
                    if (item.num <= 0) {
                        arr.push(item.name);
                    };
                    if (!curData) {
                        if (item.name !== selItem) return;
                        item.data.forEach( item => {
                            if (item.num > 0) return;
                            arr.push(item.name);
                        })
                        return;
                    };
                        console.log(curData, selItem, item.num, item.name);
                    if (curData.num > 0) return;
                    arr.push(item.name);
                });
                let timer = setTimeout(() => {
                    for (let i = 0; i < this.shopTypes[selInd].v.length; i++) {
                        let { name, hasShop } = this.shopTypes[selInd].v[i];
                        if (name === selItem && !hasShop) {
                            flag = false;
                            clearTimeout(timer);
                            break;
                        }
                    };
                    this.setHasShop(flag);
                }, 0);
            };
            this.shopTypes.forEach( (item, index) => {
                item.v.forEach( item => {
                    let name = item.name;
                    if (arr.includes(item.name)) {
                        item.hasShop = false;
                        return;
                    };
                    if (name === arr[index] && !item.hasShop) {
                    };
                    item.hasShop = true;
                })
            });
        },
        createClassName(selected, hasShop) {
            // console.log(123)
            let result = "";
            hasShop = hasShop === false;
            if (selected && hasShop) {
                result = "selected noShop";
            } else if (selected) {
                result = "selected";
            } else if (hasShop) {
                result = "noShop"
            };
            return result;
        },
        changeShopNum(type) {
            let selArr = this.selectedArr.filter( item => item );
            if (selArr.length !== this.data.shopTypes.length) {
                this.createToast("请选择产品规格哦亲");
                return;
            };
            let maxShopNum = Math.min(...this.selectedShopNums);
            console.log(maxShopNum)
            let selNum = parseInt(this.selectedShopNum);
            maxShopNum = parseInt(maxShopNum);
            if (selNum === 1 && type === "-") {
                this.createToast("选择数量已经是最小了哦亲");
                return;
            };
            if ((selNum >= this.data.maxSelShopNum || selNum === maxShopNum) && type === "+") {
                this.createToast("选择数量已经是最大了哦亲");
                return;
            };
            this.setSelShopNum(eval(`${selNum}${type}1`));
        },
        createToast(msg) {
            this.$createToast({
                txt: msg || "提示信息",
                time: 1500,
                type: "txt",
            }).show();
        }
    },

    computed: {
        ...mapShopInfoState(["selectedArr", "selectedObj", "selectedShopNum"])
    }
}
</script>