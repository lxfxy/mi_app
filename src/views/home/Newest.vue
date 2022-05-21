<template>
    <div class="Newests news">
        <div class="title h3">
            每日最新
            <!-- <span class="subTitle">排序由销量、搜索、好评等综合得出</span> -->
            <span class="more">更多 &gt;</span>
        </div>
        <scrollNav :data="news"/>
        <!-- <cube-scroll
        ref="scroll"
        :data="news"
        direction="horizontal"
        class="horizontal-scroll-list-wrap">
            <ul class="list-wrapper">
                <li v-for="item in news" class="list-wrapper-item" :key="item.title">
                    <div class="pixels img" v-if="item.pixels">
                        <img src="../../assets/images/pixels.jpg" alt="">
                    </div>
                    <div class="img">
                        <img :src="require('@/assets/images/shopMsg/item' + item.id + '/min.jpg')" alt="">
                    </div>
                    {{ item.title }}
                </li>
            </ul>
        </cube-scroll> -->
    </div>
</template>

<script>
import scrollNav from "../../components/scrollNav";
export default {
    props: ["News"],
    data() {
        return {
            news: [],
        }
    },

    async created() {
        this.news = (await this.News).data;
        // console.log(this.News)
    },

    components: {
        scrollNav,
    }
}
</script>