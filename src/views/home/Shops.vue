<template>
    <div class="Shop">
        <cube-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler" />
        <ul class="ShopItems">
            <li 
            class="ShopItem" 
            v-for="(item) in datas" :key="item.title"
            @click="goShopInfo(item.id)">
                <div class="img LazyLoad" 
                :imgSrc="baseImgUrl + 'shopMsg/item' + item.id + '/min.jpg'">
                    <img src="" alt="">
                </div>
                <div class="msg">
                    <div class="otherLabels">
                        <img src="../../assets/images/pixels.jpg" alt="" width="34" v-if="item.pixels" class="pixels">
                        <span class="special" v-if="item.special">
                            特价
                        </span>
                    </div>
                    <div class="title">
                        <p>{{item.title}}</p>
                        <p>{{item.content}}</p>
                    </div>
                    <div class="price" v-if="typeof item.price === 'object'">
                        <span class="subPrice">&yen;{{item.price.subPrice}}</span>
                        <span 
                        style="color: gray; font-weight: 400; margin-left: 4px; text-decoration: line-through;"
                        >&yen;{{item.price.price}}</span>
                    </div>
                    <div class="price" v-else>&yen;{{item.price}}</div>
                </div>
            </li>
        </ul>
        <div v-if="isAddData" class="loading">正在加载...</div>
        <div v-else-if="noData" class="loading">暂无数据 请尝试重新获取</div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import axios from "../../store/api/index";
let { mapActions: mapHomeActions } = createNamespacedHelpers("home");
let obj = "推荐 智能 电器 生活 时尚 特惠".split(" ").reduce( (obj, current) => {
    let { labels = [], labelType = {} } = obj;
    let value = "";
    if (current === "智能") value = "intelligence";
    if (current === "电器") value = "electric";
    if (current === "生活") value = "life";
    if (current === "时尚") value = "fashion";
    if (current === "特惠") value = "discount";
    labels.push(current);
    labelType[current] = value;
    obj.labels = labels;
    obj.labelType = labelType;
    return obj;
}, {});
export default {
    props: ["Shops"],
    data() {
        return {
            ...obj,
            current: "推荐",
            datas: [],
            isAddData: false,
            noData: false,
            timer: null,
            lazyImgIndex: 0,
        }
    },

    methods: {
        changeHandler(label) {
            this.getShop({
                type: this.labelType[label],
                firstLoading: true
            });
            this.current = label;
            this.lazyImgIndex = 0
        },
        ...mapHomeActions(["getShops"]),
        showScrollImg(scrollT) {
            document.querySelectorAll(".Newests").forEach( item => {
                if (eval(item.getAttribute('isLoad')) === true) return;
                let offsetT = item.offsetTop;
                let titleH = item.querySelector(".title").clientHeight;
                offsetT = offsetT - titleH;
                if (scrollT > offsetT) {
                    let parent = item;
                    let num = 0;
                    item.querySelectorAll(".firstLoadImg").forEach(item => {
                        let src = item.getAttribute("imgSrc");
                        let img = item.querySelector("img");
                        let imgSrc = img.getAttribute("src");
                        if (imgSrc) return;
                        img.setAttribute("src", src);
                        img.onload = function () {
                            item.className = item.className + " loaded";
                            img.onload = null;
                            num++;
                            if (num === 3) {
                                parent.setAttribute("isLoad", true)
                            }
                        }
                    })
                }
            });
        },
        showShopsImg(scrollT) {
            let lazyBox = document.querySelector(".Shop");
            let index = 0;
            if (scrollT < lazyBox.offsetTop) return;
            scrollT = parseInt(scrollT) - lazyBox.offsetTop + lazyBox.children[1].offsetTop;
            let imgBox = lazyBox.querySelectorAll(".img");
            let i = this.lazyImgIndex;
            for(i; i < this.datas.length; i++) {
                let item = imgBox[i];
                // if (scrollT < item.parentNode.offsetTop) break;
                let src = item.getAttribute("imgSrc");
                let img = item.querySelector("img");
                let imgSrc = img.getAttribute(img);
                img.setAttribute("src", src);
                img.onload = function () {
                    item.className = "img LazyLoad loaded";
                    this.lazyImgIndex++;
                    img.onload = null;
                };
            }
        },
        showImg(scrollT) {
            this.showShopsImg(scrollT);
            this.showScrollImg(scrollT)
        },
        getShop(options) {
            this.isAddData = true;
            this.getShops({
                ...options,
                callback: () => {
                    let timer = setTimeout(() => {
                        this.isAddData = false;
                        this.noData = true;
                        clearTimeout(timer);
                    }, 2000)
                }
            });
        },
        goShopInfo(id) {
            this.$router.push(`/shopInfo?id=${id}`)
        }
    },

    watch: {
        Shops: {
            immediate: true,
            deep: true,
            async handler() {
                let { data, page, pages } = await this.Shops;
                if (parseInt(page) === parseInt(pages)) {
                    this.noData = true;
                }
                // console.log(this.homeEl)
                this.datas = data;
                this.isAddData = false;
                setTimeout(() => {
                    this.showShopsImg(this.homeEl.scrollTop + this.homeEl.clientHeight)
                })
            }
        }
    },

    mounted() {
        let el = document.querySelector(".home");
        this.homeEl = el;
        el.onscroll = () => {
            if (this.isAddData) return;
            let scrollT = el.scrollTop;
            let height = el.scrollHeight - 700;
            this.showImg(scrollT + el.clientHeight);
            if (scrollT >= height) {
                this.getShop({
                    type: this.labelType[this.current],
                })
            }
        };
        this.showImg(el.scrollTop + el.clientHeight);
    }
}
</script>