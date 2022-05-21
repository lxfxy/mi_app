import axios from "../api/index";
export default {
    async getLimitTimeShop({ commit }) {
        let data = await axios.getLimitTimeShop();
        if (parseInt(data.data.code) !== 0) return;
        commit("getLimitTimeShop", data);
    },
    async getShops({ commit }, { type, callback, firstLoading } = {}) {
        let data = await axios.getShops({
            type,
            firstLoading
        });
        let noDate = data instanceof Array;
        // console.log(firstLoading, noDate)
        if (noDate && !firstLoading) {
            callback && callback();
            return;
        };
        if (noDate && firstLoading) {
            commit("getShops", []);
            return;
        }
        commit("getShops", data);
    }
}