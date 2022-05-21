<template>
  <div class="home" ref="home">
    <header>
      <div class="logo">有品</div>
      <input type="text" class="searchInp" placeholder="请输入内容">
    </header>
    <Slide :Banners="banners"/>
    <main>
      <Navs :Navs="navs"/>
      <Activity :Activitys="activitys"/>
      <News :News="news"/>
      <Hots :Hots="hots"/>
      <LimitTime :LimitTime="limitTime"/>
      <shopGuide />
      <Shops :Shops="shops"/>
    </main>
  </div>
</template>

<script>
import Slide from "./Slide";
import Navs from "./Navs";
import Activity from "./Activity";
import News from "./Newest";
import Hots from "./Hots";
import LimitTime from "./LimitTime";
import shopGuide from "./shopGuide";
import Shops from "./Shops";

import { createNamespacedHelpers } from "vuex";
let { mapState: mapHomeState } = createNamespacedHelpers("home")
export default {
  name: 'home',
  components: {
    Slide,
    Navs,
    Activity,
    News,
    Hots,
    LimitTime,
    shopGuide,
    Shops,
  },

  methods: {
  },

  async created() {
    
  },

  computed: {
    ...mapHomeState(["banners", "activitys", "navs", "news", "hots", "limitTime", "shops"]),
  }
}
</script> 

<style scoped>
.searchInp {
    font-size: 14px;
}
</style>
