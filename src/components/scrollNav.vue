<template>
  <cube-scroll
  ref="scroll"
  :data="data"
  direction="horizontal"
  class="horizontal-scroll-list-wrap"
  @scroll="scroll"
  :scroll-events="['scroll']">
      <ul class="list-wrapper" ref="listWrapper">
          <li 
          v-for="(item, index) in data" 
          class="list-wrapper-item" 
          :key="item.title"
          @click="goShopInfo(item.id)">
              <div 
              :class="index < 3 ? 'ranking topThree' : 'ranking'" 
              v-if="mode === 'hots'">{{index + 1}}</div>

              <div class="pixels img" v-if="item.pixels && mode !== 'hots'">
                <img src="@/assets/images/pixels.jpg" alt="">
              </div>

              <div 
              :class="index < 3 ? 'img LazyLoad firstLoadImg' : 'img LazyLoad'" 
              :imgSrc="baseImgUrl + 'shopMsg/item'+ item.id +'/min.jpg'" 
              ref="imgs">
                  <img src="" alt="">
              </div>
              <div 
              class="price" 
              v-if="mode === 'limitTime'">
                <template v-if="typeof item.price === 'object'" >
                  <span class="subPrice">
                    &yen;{{item.price.subPrice}}
                  </span>
                  <span 
                  style="text-decoration: line-through; color: gray">&yen;{{item.price.price}}</span>
                </template>

                <template v-else>
                  &yen;{{item.price}}
                </template>
              </div>
              <template v-else>
                {{ item.title }}
              </template>
          </li>
          <body>
            <div></div>
          </body>
      </ul>
  </cube-scroll>
</template>

<script>
import axios from "axios";
export default {
  props: ["data", "mode"],
  data() {
    return {
      scrolls: [],
      width: 0,
    }
  },

  methods: {
    scroll({ x = 0, y = 0 }) {
      let offsetL = Math.abs(parseInt(x)) + this.width;
      for (let i = 3; i < this.scrolls.length; i++) {
        let scrollL = this.scrolls[i];
        let el = this.$refs.imgs[i];
        let img = el.children[0];
        let src = el.getAttribute("imgsrc");
        let imgSrc = img.getAttribute("src");
        if (offsetL > scrollL && !imgSrc) {
          img.setAttribute("src", src);
          img.onload = function () {
            el.className = "img LazyLoad loaded";
          }
          return;
        }
      }
    },
    goShopInfo(id) {
      this.$router.push("/shopInfo?id=" + id);
    }
  },

  updated() {
    if (this.scrolls.length === 0) {
      this.$refs.imgs.reduce( (arr, current, index) => {
        let offsetL = current.parentNode.offsetLeft;
        arr.push(offsetL)
        return arr;
      }, this.scrolls)
    };
  },

  mounted() {
    this.width = this.$refs.scroll.$el.clientWidth;
    console.log(this.baseImgUrl)
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
