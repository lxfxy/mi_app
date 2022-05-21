<template>
    <ul class="activity">
        <li v-for="(item) in Activitys" :key="item">
            <div class="img">
                <img :src="`${baseImgUrl}${item}`" alt="">
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: ["Activitys"],
    data() {
        return {
            activitys: [],
        }
    },

    mounted() {
        
    }
}
</script>