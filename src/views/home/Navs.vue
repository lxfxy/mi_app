<template>
    <ul class="navs">
        <li v-for="(item, index) in Navs" :key="item">
            <div class="img">
                <img 
                :src="`${baseImgUrl}home_nav_${index + 1}.jpg`" 
                alt=""
                width="100%"
                height="100%">
            </div>
            {{item}}
        </li>
    </ul>
</template>

<script>
export default {
    props: ["Navs"],
    data() {
        return {
            
        }
    },

    created() {
        
    }
}
</script>