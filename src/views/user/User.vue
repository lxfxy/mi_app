<template>
    <div class="userBox">
        <div class="userInfo" @click="goLogin">
            <div class="img"></div>
            <span>{{(isLogin && userInfo.name) || "请登录"}}</span>
            <div class="rightIcon" v-show="!isLogin"></div>
        </div>
        <div class="orderBox">
            <div class="list">
                我的订单
                <div class="rightIcon"></div>
            </div>
            <ul class="orderList">
                <li v-for="(item, index) in orderList" :key="item">
                    <div class="img">
                        <img :src="`${baseImgUrl}orderIcon_${index + 1}.png`" alt="">
                    </div>
                    {{item}}
                </li>
            </ul>
        </div>

        <img :src="`${baseImgUrl}user_activity.png`" alt="" class="activity">

        <ul class="userOptions">
            <li class="list" v-for="item in userOptions" :key="item.title" @click="optionsClick(item)">
                <div class="rightIcon"></div>
                <div class="img">
                    <img :src="`${baseImgUrl}${item.icon}`" alt="">
                </div>
                {{item.title}}
                <div v-if="item.subTitle" class="subTitle">{{item.subTitle}}</div>
            </li>
        </ul>

        <cube-button 
        :light="true" 
        style="width: 200px; margin:10px auto;" 
        @click="loginout"
        v-if="$store.state.isLogin">退出登录</cube-button>

        <swipe :show="showSwipe" @close="changeShowSwipe" :title="curTitle">
            <router-view></router-view>
        </swipe>
    </div>

</template>

<script>
import { createNamespacedHelpers, mapState } from "vuex";
import swipe from "@/components/swipe";
import util from "@/assets/utils";
let { mapState: mapUserState } = createNamespacedHelpers("user");


export default {
    data() {
        return {
            showSwipe: false,
            curTitle: "",
        }
    },

    computed: {
        ...mapUserState(["orderList", "userOptions"]),
        ...mapState(["isLogin", "userInfo"]),
    },

    methods: {
        goLogin() {
            // console.log(this.userInfo)
            if (this.isLogin || this.userInfo && this.userInfo.phone) {
                return;
            };
            this.$router.push("/login")
        },
        loginout() {
            this.$store.commit("loginout");
        },
        optionsClick(data) {
            let {
                path,
                title
            } = data;
            if (!path) return;
            path = this.isLogin ? path : "/login";
            this.$router.push(path);
            this.showSwipe = true;
            this.curTitle = title;
        },
        changeShowSwipe() {
            this.showSwipe = false;
            this.$router.back();
        }
    },

    components: {
        swipe,
    },

    created() {
        let obj = this.userOptions.find(item => item.path === this.$route.path);
        if (!obj) return;
        this.curTitle = obj.title;
        this.showSwipe = true;
        // console.log(this.$route.path)
    }
}
</script>

<style>

.userBox .activity {
    width: 100%;
    margin: 10px 0;
}

.userBox .userInfo {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    background-color: rgb(203, 148, 59);
    color: #fff;
}

.userBox .userInfo .img {
    border-radius: 50%;
    background-color: #ddd;
    margin: 10px;
    width: 60px;
    height: 60px;
}

.userBox .list {
    width: 100%;
    height: 40px;
    background-color: #fff;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 12px;
    margin-top: 2px;
}

.userBox .list .rightIcon {
    background-size: 80%;
}

.userBox .list .img {
    width: 40px;
    height: 40px;
}

.userBox .list .subTitle {
    position: absolute;
    right: 40px;
    color: gray;
}

.userBox .orderList .img {
    width: 20px;
    height: 20px;
    margin: 10px auto;
}


.userBox .orderList {
    display: flex;
    text-align: center;
    font-size: 12px;
    background-color: #fff;
    margin-top: 1px;
    padding-bottom: 10px;
}

.userBox .orderList li {
    flex: auto;
}

.user-Address {
    display: flex;
    flex-direction: column;
    height: 92%;
}

.user-Address main {
    flex: 2;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
}

.createAddressBtn {
    margin: 0 10px;
    height: 40px;
    border-radius: 10px;
    background-color: #fff;
    border: solid 1px rgb(132, 95, 63);
    color:rgb(132, 95, 63);
}

.user-Address .noAddress {
    font-size: 12px;
    color: #999;
    margin: 0 auto;
    margin-top: 70%;
    width: 70%;
}

.user-Address-item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    position: relative;
    font-size: 12px;
    line-height: 25px;
}

.user-Address-item .icon-iconset0136 {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}

.user-addAddress {
    font-size: 12px;
}

.user-addAddress .cube-form-label {
    padding-right: 10px;
    width: 60px;
}

.user-addAddress .cube-form-label {
    display: block;
    text-align: right;
}

.user-addAddress .cube-form-item {
    border-bottom: 1px solid #ddd;
    margin: 4px 0;
}

.user-addAddress .cube-form-item:last-child {
    border-color: transparent;
}

.cube-input-field {
    font-size: 12px;
}

.useraddRess-placeBox .cube-form-field {
    position: relative;
    font-size: 12px;
}


</style>