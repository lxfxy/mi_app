<template>
    <ul class="shopGuide">
        <li v-for="(item) in datas" :key="item.title">
            <div class="h3">{{item.title}}</div>
            <div class="subTitle">{{item.subTitle}}</div>
            <div class="imgBox">
                <div class="img" v-for="(item) in item.images" :key="item"></div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            datas: [
                {
                    title: "特卖汇",
                    subTitle: "精选品牌特卖",
                    images: "red blue".split(" "),
                },
                {
                    title: "选购指南",
                    subTitle: "达人教你买",
                    images: "red".split(" "),
                },
                {
                    title: "店铺精选",
                    subTitle: "逛好店享特惠",
                    images: "red".split(" "),
                },
            ]
        }
    }
}
</script>