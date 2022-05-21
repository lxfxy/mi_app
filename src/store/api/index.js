import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:9999";
axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.transformRequest = function (data) {
    if (!data) return data;
    let result = ``;
	for (let attr in data) {
		if (!data.hasOwnProperty(attr)) break;
		result += `&${attr}=${data[attr]}`;
	}
	return result.substring(1);
};
let getDate = async (url, options) => {
    let result = await axios.get(url, options);
    if (parseInt(result.data.code) === 0) {
        return result.data;
    };
    return [];
};
export default {
    getNews() {
        return getDate("home/news");
    },
    getHots() {
        return getDate("home/hots");
    },
    getLimitTimeShop() {
        return getDate("/home/limitTimeShop")
    },
    getShops({ type, firstLoading, limit } = {}) {
        firstLoading = !!firstLoading;
        let data = getDate("/home/shops", {
            params: {
                type,
                firstLoading,
                limit
            }
        });
        // console.log(data)
        return data;
    },
    getCode(phone, type) {
        return axios.post("/user/getCode", {
            phone,
            type
        })
    },
    checkCode(data) {
        return axios.post('/user/checkCode', data)
    },
    checkPwd(data) {
        return axios.post("/user/checkPwd", data);
    },
    joinCart(data) {
        return axios.post("/shopInfo/joinCart", data);
    },
    changeCheckShop(data) {
        return axios.post("/shopInfo/changeCheckShop", data)
    },
    delShop(data) {
        return axios.post("/shopInfo/delShop", data)
    },
    getUser(phone) {
        return axios.post("/user/getUser", {
            phone,
        })
    },
    addAddRess(data) {
        return axios.post("/user/addAddRess", data);
    },
    register(data) {
        return axios.post("/user/register", data);
    }
}