<template>
    <cube-slide ref="slide" :data="items">
        <cube-slide-item v-for="(item) in Banners" :key="item">
            <a href="javascript:;">
                <div style="width: 100%; height: 100%">
                    <img 
                    :src="`${baseImgUrl}${item}`"
                    width="100%"
                    height="100%">
                </div>
            </a>
        </cube-slide-item>
    </cube-slide>
</template>

<script>
export default {
    props: ["Banners"],
    data() {
        return {
            items: []
        }
    },

    mounted() {
        // this.items = new Array(this.banners).fill(null).map( item => Math.random());
    }
}
</script>

<style lang="stylus">
</style>