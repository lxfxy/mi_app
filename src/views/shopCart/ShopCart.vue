<template>
    <div class="shopCartBox" v-if="userInfo.data && userInfo.data.cart">
        <header>
            <Back />
            <h1>购物车</h1>
            <span class="shopCartOptions" @click="changeStatus">
                {{editStatus ? "完成" : "编辑"}}
            </span>
        </header>
        <div class="shopCartMsg" v-if="userInfo.data.cart.length > 0">
            <div class="shopCartMsg-Head">
                <div class="checkBox checkAll" @click="checkShop()">
                    <span class="iconfont icon-ok" v-show="checkAllFlag"></span>
                </div>
                全选
                <span>已免运费</span>
            </div>
            <div class="shopCartMsg-Content">
                <div class="shopCartMsg-Content-item" 
                v-for="(item, index) in userInfo.data.cart" 
                :key="item.place + index">
                    <div class="checkBox" @click="checkShop(item)">
                        <span class="iconfont icon-ok" v-show="item.checkFlag"></span>
                    </div>
                    <div class="img">
                        <img :src="require('@/assets/images/shopMsg/item' + item.shopId + '/min.jpg')" alt="">
                    </div>
                    <div class="shopCartMsg-Content-itemMsg">
                        <div class="shopCartMsg-Content-itemMsg-til">
                            {{item.title}}
                        </div>
                        <div class="shopCartMsg-Content-itemMsg-types">
                            {{item.types}}
                        </div>
                        <div class="shopCartMsg-Content-itemMsg-price">
                            &yen; {{item.price}}
                        </div>
                        <div class="shopCartMsg-Content-itemMsg-shopNum">
                            <span @click="changeShopNum(item, '-')">-</span>
                            <input type="text" :value="item.shopNum">
                            <span @click="changeShopNum(item, '+')">+</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="noShop" v-else>
            暂无商品
        </div>

        <div class="shopCartBox-footer">
            <div class="checkBox checkAll" @click="checkShop" data-title="全选">
                <span class="iconfont icon-ok" v-show="checkAllFlag"></span>
            </div>
            <div class="shopCartBox-footerMsg">
                <div class="shopCartBox-footerMsg-priceBox" v-show="!editStatus">
                    <p>
                        <b>合计: </b>
                        <span class="shopCartBox-footerMsg-price">&yen; {{allMoney|transMoney}}</span>
                    </p>
                </div>
                <button v-if="editStatus" @click="delCartShop">{{"删除"}}</button>
                <button v-show="!editStatus">结算({{selectedShopNum}})</button>
            </div>
        </div>
    </div>
</template>

<script>
import Back from "@/components/back";
import api from "@/store/api";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    data() {
        return {
            checkAllFlag: false,
            selectedShopNum: 0,
            editStatus: false,
        }
    },

    components: {
        Back,
    },

    computed: {
        ...mapState(["userInfo", "isLogin"]),
        allMoney() {
            let result = 0;
            let selShopNum = 0;
            let flag = true;
            if (!this.userInfo.data) return result;
            this.userInfo.data.cart.forEach(item => {
                if (!item.checkFlag) {
                    flag = false;
                    return;
                };
                result += item.price * item.shopNum;
                selShopNum += item.shopNum;
            });
            this.checkAllFlag = flag;
            this.selectedShopNum = selShopNum;
            return result;
        }
    },

    filters: {
        transMoney(val) {
            return val.toFixed(2);
        }
    },

    methods: {
        ...mapMutations(["setUserCart"]),
        ...mapActions(["changeCheckShop", "delShop"]),
        async changeShopNum(data, type) {
            if (data.shopNum === 0) {
                this.$createToast({
                    type: "txt",
                    time: 500,
                    txt: "商品数量已经是最少"
                }).show();
                return;
            };
            let obj = {
                title: data.title,
                shopId: data.shopId,
                shopNum: 1,
                types: data.types,
                phone: this.userInfo.phone,
                place: data.place,
            };
            let toast = null;
            let result = null;
            if (type === "-") {
                obj.shopNum = -1;
            };
            toast = this.$createToast({
                txt: "正在加入购物车",
                mask: true,
            });
            toast.show();
            result = await api.joinCart(obj);
            if (parseInt(result.data.code) === 0) {
                await this.setUserCart(result.data.data);
            }
            toast.hide();
            this.$createToast({
                txt: result.data.codeText,
                type: "txt",
                time: 2000
            })
        },
        async checkShop(data) {
            let toast = this.$createToast({
                txt: "请您稍加等候",
                mask: true,
            });
            console.log(data);
            if (!data || data === false) {
                let flag = !this.checkAllFlag;
                data === false ? flag = false : null;
                data = {
                    phone: this.userInfo.phone,
                    flag
                };
            };
            toast.show();
            let result = await this.changeCheckShop(data);
            toast.hide();
            if (result) {
                this.$createToast({
                    txt: result.codeText,
                    time: 1000,
                }).show();
            }
        },
        changeStatus() {
            this.editStatus = !this.editStatus;
            this.checkShop(false);
        },
        async delCartShop() {
            let toast = this.$createToast({
                mask: true,
                txt: "正在删除中",
                time: 0,
            });
            toast.show();
            let { codeText } = await this.delShop();
            toast.hide();
            this.$createToast({
                txt: codeText,
                time: 1000,
                type: "txt",
            })
        },
    },

    created() {
        if (!this.isLogin) {
            this.$router.push("/login");
        };
    },
}
</script>

<style>
.shopCartBox {
    box-sizing: border-box;
    padding: 0 4px;
}

.shopCartBox header {
    position: relative;
    margin: 20px 0;
    background-color: transparent;
    color: #333;
}

.shopCartBox .checkAll {
    margin-right: 10px;
}

.shopCartBox .checkAll::after {
    content: attr(data-title);
    position: absolute;
    width: 26px;
    right: -40px;
    line-height: 16px;
}

.shopCartBox .icon-ok {
    color: red;
    position: absolute;
    top: -4px;
    left: -4px;
    font-size: 24px;
}

.shopCartBox .checkBox {
    background-color: #fff;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: solid 1px #ddd;
    position: relative;
}

.shopCartOptions {
    position: absolute;
    right: 14px;
    font-size: 12px;
}

.shopCartMsg {
    width: 80%;
    margin: 0 auto;
    border-radius: 10px;
    background-color: #f0f0f0;
    font-size: 12px;
}

.shopCartMsg-Head {
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 10px;
}

.shopCartMsg-Head span {
    position: absolute;
    right: 10px;
}

.shopCartMsg-Content-item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 8px;
}

.shopCartMsg-Content-item .img {
    width: 80px;
    height: 80px;
    background-color: #fff;
    border-radius: 10px;
    margin: 0 8px;
}

.shopCartMsg-Content-itemMsg {
    line-height: 20px;
    position: relative;
    flex: 1;
}

.shopCartMsg-Content-itemMsg-shopNum {
    position: absolute;
    right: 4px;
    bottom: -5px;
    display: flex;
    align-items: center;
}

.shopCartMsg-Content-itemMsg-shopNum span {
    font-size: 16px;
    font-weight: bold;
}

.shopCartMsg-Content-itemMsg-shopNum input {
    width: 26px;
    height: 20px;
    outline: none;
    background-color: #ddd;
    text-align: center;
    margin: 0 8px;
}

.shopCartMsg-Content-itemMsg-price {
    color: darkred;
    font-weight: bold;
    margin-top: 6px;
}

.shopCartBox-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-top: 1px solid #ddd;
    font-size: 12px;
    box-sizing: border-box;
    padding: 0 6px;
}

.shopCartBox-footerMsg {
    display: flex;
    align-items: center;
}

.shopCartBox-footerMsg > button {
    background: linear-gradient(to right, rgb(240, 78, 46), rgb(213, 16, 16));
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    padding: 6px 10px;
}

.shopCartBox-footerMsg-priceBox {
    margin-right: 10px;
}

.shopCartBox-footerMsg-price {
    color: red;
    font-size: 14px;
}
</style>