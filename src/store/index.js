import Vue from 'vue';
import Vuex from 'vuex';
import md5 from "md5";

import home from "./home/index";
import user from "./user/index";
import shopInfo from "./shopInfo/index";
import api from "./api";

Vue.use(Vuex)

// console.log(md5("user_cookieName"))

export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {},
    cookieName: md5("user_cookieName"),
  },
  mutations: {
    login(state, userInfo) {
      document.cookie = `${state.cookieName}=${userInfo.phone}`;
      state.userInfo = userInfo;
      state.isLogin = true;
      return Promise.resolve();
    },
    loginout(state) {
      state.isLogin = false;
      state.userInfo = null;
      document.cookie = `${state.cookieName}=null`
    },
    setUserCart(state, data) {
      let {
        cart,
        allShopNum
      } = data;
      state.userInfo.data.cart = JSON.parse(JSON.stringify(cart));
      state.userInfo.allShopNum = allShopNum;
      // console.log(state.userInfo.data.cart);
      return Promise.resolve(10);
    },
  },
  actions: {
    async changeCheckShop({ commit, state }, data) {
      let obj = {
        phone: state.userInfo.phone,
        title: data.title,
        types: data.types,
        flag: data.flag,
        place: data.place,
      };
      let result = await api.changeCheckShop(obj);
      if (parseInt(result.data.code) === 0) {
        commit("setUserCart", result.data);
        return Promise.resolve();
      };
      return Promise.resolve(result.data);
    },
    async delShop({ commit, state }) {
      let { data } = await api.delShop({
        phone: state.userInfo.phone,
      });
      if (parseInt(data.code) === 0) {
        commit("setUserCart", data);
      };
      data.cart = "";
      return Promise.resolve(data);
    },
    async getUser({ commit, state }) {
      let username = null;
      let reg = new RegExp(`${state.cookieName}=(\\w+)`);
      document.cookie.replace(reg, (...[, $1]) => {
        $1 ? username = $1 : null;
      });
      if (!username || username === "null") return;
      let { data } = await api.getUser(username);
      commit("login", data.data);
    }
  },
  modules: {
    home,
    user,
    shopInfo
  }
})
