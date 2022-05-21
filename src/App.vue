<template>
  <div id="app" v-if="!isShowAppBox">
    <router-view/>
    <div id="nav">
        <cube-tab-bar
        v-model="selectTab"
        :data="tabs"
        @click="clickHandler">
          <cube-tab v-for="item in tabs" :label="item.value" :key="item.label">
            <span 
            v-if="item.value === '/shopCart' && $store.state.isLogin" 
            class="shopCartNum">{{$store.state.userInfo.allShopNum}}</span>
            <i :class="item.icon"></i>
            <p>{{item.label}}</p>
          </cube-tab>
        </cube-tab-bar>
    </div>

  </div>
  <router-view v-else/>
</template>

<script>
export default {
  data() {
    return {
      tabs:[
        {
          label: "首页",
          icon: "iconfont icon-ziyuan",
          value: "/home"
        },
        {
          label: "分类",
          icon: "iconfont icon-fenlei",
          value: "/classify"
        },
        {
          label: "购物车",
          icon: "iconfont icon-gouwuche",
          value: "/shopCart"
        },
        {
          label: "我的",
          icon: "iconfont icon-wode",
          value: "/user"
        },
      ],
      selectTab: "/home",
      isShowAppBox: false,
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler(value) {
        // console.log(value)
        let { path } = value;
        this.selectTab = path;
        
        if (/(login|register|shopInfo|shopCart)/i.test(path)) {
          this.isShowAppBox = true;
          return
        };
        this.isShowAppBox = false;
      }
    }
  },

  methods: {
    clickHandler(label) {
      this.$router.push(label)
    },
  },

  async created() {
    if (!this.$store.state.isLogin) {
      this.$store.dispatch("getUser");
    }
  },
}
</script>

<style>

button {
  outline: none;
}

.loading {
  width: 100%;
  text-align: center;
  margin: 10px 0;
  font-size: 14px;
}

.downArrow {
  background: url("./assets/images/downArrow.png") no-repeat 0 0;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-size: 100%;
  width: 15px;
  height: 15px;
}

.userBg {
  width: 100%;
  height: 100%;
  background: url("http://127.0.0.1:9999/images/userBg.png") no-repeat 0 0;
  background-size: cover;
  box-sizing: border-box;
  padding-top: 100px;
}

html,
body,
#app {
  height: 100%;
  box-sizing: border-box;
}


#app {
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
}

#app > #nav .cube-tab {
  font-size: 14px;
  position: relative;
}

#app > #nav .cube-tab > p {
  margin-top: 4px;
}

#app > #nav .cube-tab .shopCartNum {
  right: 24px;
  top: 2px;
}

.shopCartNum {
  position: absolute;
  right: 2px;
  top: -6px;
  padding: 2px;
  background-color: red;
  color: #fff;
  border-radius: 6px;
}

.home,
.userBox,
.classifyBox,
.shopCartBox {
  flex: 1;
  overflow: scroll;
}

.cube-tab-bar {
  background-color: #fff;
}

.cube-tab div {
  margin-top: 4px;
}

.iconfont {
  font-size: 20px;
}

header {
  background-color: #845d32;
  height: 40px;
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

header .logo {
  font-size: 22px;
}

.searchInp {
  border-radius: 20px;
  background: #f0f0f0;
  outline: none;
  text-indent: 10px;
  width: 70%;
  height: 60%;
}

.navs,
.activity {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* padding: 10px; */
  text-align: center;
}

.activity li {
  width: 48%;
  height: 100px;
  margin-top: 8px;
  display: flex;
  align-items: center;
}

.activity .img {
  width: 100%;
  height: 100%;
}

.navs {
  font-size: 14px;
}

.navs .img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
  margin: 10px 2px;
}

.img {
  width: 103px;
  height: 103px;
}

.img img {
  width: 100%;
  height: 100%;
}

.cube-slide {
  height: 160px;
}

.cube-slide-dots {
  margin-bottom: 4px;
}

.cube-slide-dots span {
  background-color: #fff;
  height: 4px;
  width: 10px;
}

.home > main {
  padding: 0 10px;
}

.cube-scroll-content {
  display: inline-block;
}

.list-wrapper {
  display: flex;
  flex-wrap: nowrap;
}

.list-wrapper-item {
  width: 103px;
  min-height: 103px;
  text-align: center;
  font-size: 12px;
  position: relative;
  margin: 0 4px;
}

.ranking {
  position: absolute;
  text-align: center;
  height: 20px;
  line-height: 20px;
  width: 20px;
  background-color: #ddd;
}

.ranking::after {
  position: absolute;
  content: "";
  top: 99%;
  width: 100%;
  left: 0;
  background-color: #ddd;
  height: 50%;
  clip-path: polygon(0 0, 100% 0, 50% 50%);
}

.ranking.topThree {
  background: rgb(203, 148, 59);
}

.ranking.topThree::after {
  background: rgb(203, 148, 59);
}

.pixels {
  position: absolute;
  left: 0;
  top: 0;
  width: 34px;
  height: 16px;
}

.Newests {
  background-color: #fff;
  border-radius: 10px;
  margin-top: 20px;
  padding: 10px;
}

.h3 {
  font-size: 18px;
  font-weight: 700;
}

.Newests .title {
  margin-top: 10px;
  margin-bottom: 20px;
}

.more {
  float: right;
  font-size: 14px;
  color: gray;
}

.Newests .title .subTitle {
  font-size: 12px;
  color: darkgray
}

.Newests .image {
  width: 100%;
  margin-bottom: 4px;
  min-height: 90px;
  background: #ddd;
}

.timeBox {
  font-size: 12px;
}

.limitTime .h3 {
  line-height: 18px;
}

.limitTime .time > span {
  display: inline-block;
  background-color: rgb(203, 148, 59);
  color: #fff;
  padding: 1px 2px;
  border-radius: 2px;
}

.shopGuide {
  display: flex;
  /* justify-content: space-between; */
  background: #fff;
  margin-top: 20px;
  border-radius: 10px;
}

.shopGuide li {
  border-right: solid 1px #ddd;
  padding: 10px 6px;
}

.shopGuide li:last-child {
  border: none;
}

.shopGuide .subTitle {
  color:rgb(203, 148, 59);
  font-size: 12px;
  margin-top: 2px;
}

.shopGuide .imgBox {
  display: flex;
  margin-top: 10px;
}

.shopGuide .img {
  width: 76px;
  height: 100px;
  background-color: #ddd;
  margin: 0 2px;
}

.cube-scroll-nav-bar-items {
  display: flex;  
  align-items: center;
}

.cube-scroll-nav-bar {
  background: transparent;
  margin: 20px 0;
}

.cube-scroll-nav-bar-item {
  margin: 0 10px;
  padding: 0 20px;
  border-right: solid 1px #f0f0f0;
}

.cube-scroll-nav-bar-item_active {
  font-size: 18px;
}

.ShopItems {
  display: flex;
  justify-content: space-between;
  height: auto!important;
  width: 100%;
  flex-wrap: wrap;
}

.ShopItem {
  width: 48%;
  transform: none!important;
  position: relative;
  margin: 10px 0;
  background-color: #fff;
  font-size: 14px;
  border-radius: 5px;
  overflow: hidden;
}

.ShopItem .img {
  width: 100%;
  height: 160px;
  background: #f0f0f0;
  margin-bottom: 4px;
  color: #ddd;
  text-align: center;
  line-height: 160px;
}

.ShopItem .msg {
  padding: 4px;
}

.ShopItem .title p {
  margin: 6px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.ShopItem .title p:first-child {
  font-size: 16px;
}

.ShopItem .price {
  color: red;
  margin: 10px 0;
}

.ShopItem .price span {
  font-weight: 600;
}

.price {
  color: red;
  /* text-decoration: line-through; */
}

.subPrice {
  font-size: 14px;
}

.LazyLoad img {
  opacity: 0;
  transition: .5s;
}

.LazyLoad.loaded img {
  opacity: 1;
}

.Shop .msg {
  position: relative;
}

.Shop .otherLabels {
  position: absolute;
  left: 4px;
  top: -26px;
  display: flex;
  align-items: center;
}

.Shop .otherLabels .pixels {
  position: relative;
}
.Shop .otherLabels span,
.Shop .otherLabels img {
  margin-right: 4px;
}

.Shop .special {
  font-size: 12px;
  background-color: red;
  color: #fff;
  padding: 2px 6px;
}

.classifyBox .cube-scroll-nav-bar {
  background-color: #fff;
  margin: 0;
  margin-right: 10px;
}

.classifyBox .cube-scroll-nav-bar-items {
  display: block;
}

.classifyBox .cube-scroll-wrapper {
  overflow: none;
}

.classifyBox .cube-scroll-nav-bar-item {
  border: none;
  margin: 0;
  padding: 6px 14px;
  margin: 12px;
  border-radius: 10px;
  font-size: 12px;
}

.classifyBox .cube-scroll-nav-bar-item_active {
  /* font-size: 100%; */
  color:#fff;
  background-color: red;
}

.rightIcon {
  background: url("http://127.0.0.1:9999/images/rightIcon.png") no-repeat center;
  width: 20px;
  height:36px;
  position: absolute;
  top:50%;
  right: 10px;
  transform: translateY(-50%);
  background-size: 100%;
}

.ShopInfo-place .Popup-header,
.user-Address .Popup-header {
    flex-direction: column;
    font-size: 12px;
    align-items: unset!important;
}

.cube-popup {
  z-index: 99999!important;
}

.userBg h1 {
    text-align: center;
    font-size: 24px;
}

.userBg main {
    margin: 20px auto;
    
    width: 90%;
}
.userBg .cube-form-field {
    border-bottom: solid 1px #ddd;
    position: relative;
}

.userBg .cube-form-item:nth-child(n + 1) .cube-form-field {
    margin-top: 14px;
}

.userBg .cube-form-field span {
    position: absolute;
}

.userBg .cube-form-field input {
    text-indent: 10px;
    padding-bottom: 10px;
}

.userBg .cube-form-group {
    padding-bottom: 10px;
}

.userBg .getPhoneCode {
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    color: rgb(203, 148, 59);
}

.userBg .cube-form,
.userBg .cube-input {
    background-color: transparent;
}

.userBg .cube-btn-primary {
    padding: 10px 4px;
    border-radius: 40px;
    margin-top: 20px;
    box-shadow: 0 2px 2px #999;
}

.register .cube-btn-primary {
  margin-top: 40px;
}

.formErr {
    font-size: 12px;
    color: red;
    margin: 10px 0 0 10px;
}

.errIcon::before {
    content: "\e614";
    padding-left: 0.133333rem;
    font-family: "cube-icon" !important;
}

.register .formErr {
  position: absolute;
  left: -18px;
  bottom: -22px;
}

.userBg .loginOptions {
    text-align: center;
    margin: 40px 0;
    font-size: 14px;
    color: #888
}

.userBg .changeLoginMode {
    margin: 14px 0;
    font-size: 12px;
    color: #333;
    text-indent: 6px;
}
</style>
