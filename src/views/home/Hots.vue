<template>
    <div class="Newests hots">
        <div class="title h3">
            热销榜
            <span class="subTitle">排序由销量、搜索、好评等综合得出</span>
            <span class="more">更多 &gt;</span>
        </div>
        <scrollNav :data="hots" mode="hots"/>
    </div>
</template>

<script>
import scrollNav from "@/components/scrollNav";
export default {
    props: ["Hots"],
    data() {
        return {
            hots: [],
        }
    },

    components: {
        scrollNav,
    },

    async created() {
        this.hots = (await this.Hots).data
    }
}
</script>