<template>
    <div class="ShopInfo" v-if="shopInfo">
        <Nav :navs="navs" :navOptions="navOptions"/>
        <Slide :id="id" :slide="slides"/>
        <div class="priceBox">
            <span>
                <b>&yen; </b>
                {{shopInfo.price}}
            </span>
        </div>
        <div class="msg">
            <div class="title">
                {{shopInfo.title}}
                {{selectedArr.length > 0 ? selectedArr.join(" ") : null}}
            </div>
            <div class="content">
                {{shopInfo.content}}
            </div>
        </div>

        <Type :data="shopInfo" />
        <Place />
        <Service :data="shopInfo.msg.service"/>

        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <Foot />
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import Nav from "./Nav";
import Slide from "./Slide";
import Type from "./Type";
import Place from "./Place";
import Service from "./Service";
import Foot from "./Footer";
let { 
    mapState: mapShopInfoState,
    mapActions: mapShopInfoActions,
    mapMutations: mapShopInfoMutations
} = createNamespacedHelpers("shopInfo");
export default {
   data() {
       return {
           id: 1,
           title: "",
       }
   },

    computed: {
        ...mapShopInfoState([
            "shopInfo", 
            "navs", 
            "navOptions", 
            "slides", 
            "selectedArr",
        ]),
    },

    created() {
        // let { id } = this.$route.query;
        // this.id = id || 1;
        this.getShop(this.id);
        // console.log(this.getShop, id, this.shopInfo)
    },

    methods: {
        ...mapShopInfoActions(["getShop"]),
        // setPlace(place) {
        //     this.place = place;
        // }
    },

    components: {
        Nav,
        Slide,
        Type,
        Place,
        Service,
        Foot,

    },

    beforeRouteLeave(to, form, next) {
        this.$store.commit("shopInfo/setPlace", []);
        next();
    }
}
</script>

<style scoped>
.priceBox {
    margin: 16px;
    font-size: 24px;
    color: darkred;
}

.priceBox span,
.priceBox b {
    font-weight: 700;
}

.priceBox b {
    font-size: 18px;
}

.msg {
    margin: 10px;
}

.msg .title {
    font-weight: 600;
    margin-bottom: 10px;
}

.msg .content {
    font-size: 12px;
    word-wrap: break-word;
    line-height: 14px;
}
</style>

<style>
.ShopInfo {
    width: 100%;
    height: 100%;
}

.ShopInfo .Slide {
    position: relative;
}

.ShopInfo .slideIndex {
    position: absolute;
    background-color: rgba(0, 0, 0, .5);
    right: 10px;
    bottom: 10px;
    padding: 4px;
    border-radius: 10px;
    font-size: 12px;
    color: #fff;
}

.fillShopInfoBox {
    width: 100%;
    height: 40px;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 10px;
    position: relative;
    margin-bottom: 1px;
}

.fillShopInfoBox .rightIcon {
    background-size: 80%;
}

.fillShopInfoBox-Title {
    font-size: 12px;
    color: #999;
}

.fillShopInfoBox-Content {
    font-size: 14px;
    font-weight: 600;
    margin-left: 20px;
}

.ShopInfo-type .Popup-header .img {
    width: 80px;
    height: 80px;
    background-color: #f0f0f0;
    border-radius: 5px;
    margin: 0 10px;
}

.ShopInfo-type .selectType {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
}

.ShopInfo-type .price {
    color: darkred;
    letter-spacing: -1px;
    font-weight: 600;
}

.ShopInfo-type .price b {
    font-weight: 600;
    font-size: 12px;
}


.ShopInfo-place .cube-scroll-content {
    font-size: 12px;
    width: 100%;
}

.ShopInfo-place .place-Item {
    box-sizing: border-box;
    padding: 14px;
    border-bottom: 1px solid #ddd;
}

.ShopInfo-place .place-Item.active {
    color: red;
}

.ShopInfo-place .placeMsg-Item {
    border-right: 1px solid #999;
    margin: 0 4px;
    padding-right: 2px;
}

.ShopInfo-place .placeMsg-Item:last-child {
    border-right: none;
}

.ShopInfo-Service .fillShopInfoBox-Content span {
    font-size: 12px;
    margin-right: 4px;
}

.center {
    width: 100%;
    display: block;
    text-align: center;
    font-size: 12px;
}

.ShopInfo-Service-item {
    font-size: 12px;
    margin: 10px;
}

.ShopInfo-Service-item-title {
    margin-bottom: 4px;
}

.ShopInfo-Service-item-content {
    color: #999;
}

.ShopInfo-type-popupMain {
    box-sizing: border-box;
    padding: 0 10px;
}

.ShopInfo-type-popupMain-item {
    margin-top: 10px;
    font-size: 14px;
}

.ShopInfo-type-popupMain-content {
    margin-top: 6px;
    display: flex;
    flex-wrap: wrap;
}

.ShopInfo-type-popupMain-content-item {
    margin: 0 6px;
    font-size: 12px;
    padding: 6px 10px;
    background-color: #f0f0f0;
    color: #333;
    border-radius: 10px;
    border: 1px solid transparent;
}

.ShopInfo-type-popupMain-content .ShopInfo-type-popupMain-content-item.selected {
    color: darkred;
    /* background-color: rgba(250, 51, 51, .5); */
    border-color:darkred;
}

.ShopInfo-type-popupMain-content-item.noShop {
    color: #ddd;
}

.shopInfo-footer {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 12px;
}

.shopInfo-footer-item {
    display: flex;
    align-items: center;
    position: relative;
    /* flex-direction: ; */
}

.shopInfo-footer-options {
    width: 70%;
}

.shopInfo-footer-options button {
    color: #fff;
    border: none;
    padding: 10px 0;
}

.shopInfo-footer-options .joinCart {
    flex: 1;
    background: linear-gradient(to right, rgb(240, 206, 123), rgb(221, 177, 81));
    border-radius: 20px 0 0 20px;
}

.shopInfo-footer-options .buyShop {
    width: 40%;
    background: linear-gradient(to right, rgb(240, 78, 46), rgb(213, 16, 16));
    border-radius: 0 20px 20px 0;
}

.shopInfo-footer-options button.noShop {
    width: 100%;
    background: #888;
    border-radius: 20px;
}

.ShopInfo-type-popupMain .shopNumBox {
    box-sizing: border-box;
    margin-top: 20px;
    position: relative;
    height: 30px;
    line-height: 30px;
}

.ShopInfo-type-popupMain .shopNumBox span {
    font-size: 24px;
    font-weight: bold;
}

.ShopInfo-type-popupMain .shopNumBox input {
    width: 40px;
    background-color: #ddd;
    outline: none;
    text-align: center;
    margin: 0 6px;
    /* height: 80%; */
}

.ShopInfo-type-popupMain .shopNumBox .ShopInfo-type-popupMain-content {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    margin-top: 0;
}

.ShopInfo-type-popupMain-maxShopNumBox {
    font-size: 12px;
    color: darkred;
    font-weight: bold;
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translateY(-50%);
}

</style>