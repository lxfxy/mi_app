<template>
    <div class="back" @click="back">
        <i class="iconfont icon-back-m"></i>
    </div>
</template>

<script>
export default {
   data() {
       return {

       }
   },

   methods: {
       back() {
           this.$router.back();
       }
   }
}
</script>

<style scoped>
.back {
    position: absolute;
    left: 10px;
    
}
</style>