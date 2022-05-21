<template>
    <div class="classifyBox">
        <cube-scroll-nav-bar 
        :current="current" 
        :labels="labels" 
        @change="changeHandler"
        direction="vertical"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            current: "有品推荐",
            labels: `有品推荐 家用电器 居家餐厨 家居家装 智能家庭 电视影音 手机电脑 数码周边 日用文创 服装配饰 鞋靴装包 美妆个护 运动户外 出行车品 健康保健 美食餐饮 母婴亲子 宠物生活 有品海购 DLAB 品牌墙`.split(" "),
            labelsType: {
                "有品推荐": "",
                "家用电器": "electric",
                "智能家庭": "intelligence",
                "居家餐厨": "kitchen",
                "家居家装": "furniture",
                "电视影音": "tv",
                "手机电脑": "science",
                "数码周边": "digital",
                "日用文创": "life",
                "服装配饰": "clothing",
                "鞋靴装包": "shoes",
                "美妆个护": "makeup",
                "运动户外": "motion",
                "出行车品": "trip",
                "健康保健": "healthy",
                "母婴亲子": "baby",
                "宠物生活": "pets",
                "有品海购": "moregoods",
                "DLAB": "dlab",
                "品牌墙": "brandWall",
            },
        }
    },

    methods: {
        changeHandler(labels) {
            let type = this.labelsType[labels];
            console.log(type)
        }
    }
}
/* 
    推荐：""
    电器：electric
    智能：intelligence
    餐厨：kitchen
    家居：furniture
    电视：tv
    电脑：science
    数码：digital
    日用：life
    服装：clothing
    鞋装：shoes
    美妆：makeup
    运动：motion
    出行：trip
    健康：healthy
    母婴：baby
    宠物：pets
    有品海购：moregoods
    DLAB：dlab
    品牌墙：brandWall
 */
</script>

<style scoped>
.classifyBox {
    display: flex;
    box-sizing: border-box;
}

.cube-scroll-nav-bar-items {
    display: block!important;
}
</style>