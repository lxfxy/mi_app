import axios from "axios";
export default {
    async getShop({ commit }, id) {
        let { data } = await axios.get("/shopInfo/getShop", {
            params: {
                id,
            }
        });
        if (parseInt(data.code) === 0) {
            commit("setShop", data.data);
            return;
        };
        commit("setShop", null);
    }
}