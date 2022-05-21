import axios from "../api/index";
export default {
    // banner: axios.getBanner()
    banners: new Array(5).fill("null").map( (item, index) => {
        return `banner/banner_0${index + 1}.jpg`
    }),
    navs: "每日上新 小米众筹 显示抢购 热销排行 小米自营 0元专享 小米庄园 生活超市 雷军同款 新人必买".split(" "),
    activitys: new Array(6).fill(null).map( (item, index) =>  {
        // console.log(require('@/assets/images/home_activify_' + (index + 1) + '.jpg'))
        return `home_activify_${index + 1}.jpg`
    }),
    news: axios.getNews(),
    hots: axios.getHots(),
    limitTime: axios.getLimitTimeShop(),
    shops: axios.getShops({
        firstLoading: true
    })
}