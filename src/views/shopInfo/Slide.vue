<template>
    <div class="Slide">
        <cube-slide 
        ref="slide" 
        :data="slide" 
        @change="changeSlide"
        :showDots="false"
        style="height: 400px">
            <cube-slide-item 
            v-for="(item, index) in slide" 
            :key="index" 
            @click="clickHandler(item, index)">
                <img 
                :src="require('@/assets/images/shopMsg/item' + id + '/' + (index + 1) + '.jpg')"
                width="100%"
                height="100%">
            </cube-slide-item>
        </cube-slide>
        <div class="slideIndex">
            {{index}} / {{slide.length}}
        </div>
    </div>
</template>

<script>
export default {
    props: ["id", "slide"],
   data() {
       return {
           index: 1,
       }
   },

   methods: {
       changeSlide(num) {
           this.index = num + 1;
       }
   }
}
</script>