<template>
    <div class="user-Address">
        <main>
            <template v-if="userInfo.data.address && userInfo.data.address.length > 0">
                <div class="user-Address-item" v-for="item in userInfo.data.address" :key="item.name">
                    <p class="user-Address-item-name">{{item.name}}</p>
                    <p class="user-Address-item-place">{{item.place}}</p>
                    <i class="iconfont icon-iconset0136"></i>
                </div>
            </template>
            <div class="noAddress" v-else>
                您还没有收货地址, 请点击下面的按钮新建一个
            </div>
        </main>
        <button class="createAddressBtn" @click="changeShow">新建收货地址</button>


        <swipe :show="show" @close="changeShow" title="新建收货地址">
            <cube-form class="user-addAddress" :model="model" @submit.prevent="submit">
                <cube-form-group>
                    <cube-form-item :field="fields[0]"></cube-form-item>
                    <cube-form-item :field="fields[1]"></cube-form-item>
                    <cube-form-item :field="fields[2]" class="useraddRess-placeBox" ref="placeBox">
                        {{placeArr.length > 0 ? placeArr.join(" ") : null}}
                        <span class="downArrow"></span>
                    </cube-form-item>
                    <cube-form-item :field="fields[3]"></cube-form-item>
                    <cube-form-item :field="fields[4]"></cube-form-item>
                </cube-form-group>
                <cube-form-group>
                    <cube-button 
                    :style="btnStyle"
                    type="submit">保存</cube-button>
                </cube-form-group>
            </cube-form>
        </swipe>
        <placePopup :show="placePopupFlag" @close="changePlacePopupFlag"/>
    </div>

</template>

<script>
import swipe from "@/components/swipe";
import placePopup from "@/components/PlacePopup";
import { mapState } from "vuex";
import { Validator } from "cube-ui";
import api from "@/store/api";
Validator.addRule("odd", (val, config, type) => {
    console.log(val, config, type)
})
export default {
    data() {
        return {
            show: false,
            model: {
                name: "",
                phone: "",
                placeArr: [],
                place: "",
                defaultPlace: false,
            },
            fields: [
                {
                    type: "input",
                    modelKey: "name",
                    label: "收货人姓名",
                    props: {
                        placeholder: "请输入姓名",
                    }
                },
                {
                    type: "input",
                    modelKey: "phone",
                    label: "手机号码",
                    props: {
                        placeholder: "请输入手机号码"
                    }
                },
                {
                    type: "input",
                    modelKey: "phone",
                    label: "收货地址",
                },
                {
                    type: "input",
                    modelKey: "place",
                    label: "街道地址",
                    props: {
                        placeholder: "请输入街道地址"
                    }
                },
                {
                    type: "checkbox",
                    modelKey: "defaultPlaceFlag",
                    props: {
                        option: {
                            label: "默认地址"
                        }
                    }
                }
            ],
            btnStyle: {
                fontSize: "14px",
                width: "14%",
                padding: "10px 0",
                margin: "0 auto",
                backgroundColor: "rgb(131, 94, 63)"
            },
            placePopupFlag: false,
            errMsg: {
                phone: "请输入正确的手机号码",
                name: "请输入收货人姓名",
                placeArr: "请选择收货地址",
                place: "请选择街道地址"
            },
            infoReg: {
                phone: /^1{1}\d{10}$/,
                name: /^[\u4e00-\u9FA5]{2,4}$/,
                placeArr: /^([\u4e00-\u9FA5]+\s*){4}$/,
                place: /^([\u4e00-\u9FA5]|\w)+$/
            }
        }
    },

    computed: {
        ...mapState(["userInfo"]),
        ...mapState("shopInfo", ["placeArr", "placeArr"]),
    },

    methods: {
        changeShow() {
            this.show = !this.show;
        },
        changePlacePopupFlag() {
            this.placePopupFlag = !this.placePopupFlag;
        },
        async submit() {
            this.model.placeArr = this.placeArr.join(" ");
            let data = this.model;
            let errMsg = this.errMsg;
            let infoReg = this.infoReg;
            let flag = true;
            let result = null;
            let toast = null;
            for (let k in data) {
                if (k === "defaultPlace") break;
                let item = data[k];
                if ( !infoReg[k].test(item) ) {
                    this.$createToast({
                        txt: errMsg[k],
                        type: "txt",
                        time: 1000,
                    }).show();
                    flag = false;
                    break;
                }
            };
            if (!flag) return;
            toast = this.$createToast({
                txt: "请您稍加等待",
                mask: true,
                time: 0,
            });
            toast.show();
            result = await api.addAddRess({
                user: this.userInfo.phone,
                ...data,
            });
            toast.hide();
            if (parseInt(result.data.code) === 1) {
                this.$createToast({
                    txt: result.data.codeText,
                    time: 1000,
                    type: "txt"
                }).show();
                return;
            };
            this.show = false;
            this.model.name = "";
            this.model.phone = "";
            this.model.place = "";
            this.model.placeArr = "";
            this.model.defaultPlace = false;
        }
    },

    components: {
        swipe,
        placePopup,
    },

    mounted() {
        this.$refs.placeBox.$el.onclick = this.changePlacePopupFlag;
    }
}
</script>
