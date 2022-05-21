export default {
    shopInfo: null,
    navs: "商品 评价 详情 推荐".split(" "),
    navOptions: [{
        text: "首页",
        path: "/home"
    }],
    slides: new Array(5).fill(null),
    places: [
        {
            title: "北京",
            children: [
                {
                    title: "北京市",
                    children: [
                        {
                            title: "东城区",
                            children: [
                                {
                                    title: "安定门街道",
                                },
                                {
                                    title: "北新桥街道",
                                },
                                {
                                    title: "东华门街道",
                                }
                            ]
                        },
                        {
                            title: "西城区",
                            children: [
                                {
                                    title: "白纸坊街道",
                                },
                                {
                                    title: "金融街道",
                                },
                                {
                                    title: "牛街街道",
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        // {
        //     title: "湖南"
        // },
        // {
        //     title: "广东"
        // },
    ],
    title: "",
    selectedArr: [],
    selectedObj: {},
    selectedShopNum: 1,
    typePopupF: false,
    placePopupF: false,
    hasShop: true,
    joinCartF: true,
    placeArr: [],
}