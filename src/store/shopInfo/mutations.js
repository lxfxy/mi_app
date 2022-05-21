export default {
    setShop(state, data) {
        state.shopInfo = data;
        state.title = data.title;
        state.shopId = data.id;
    },

    setSelArr(state, data) {
        let {
            k,
            v
        } = data;
        state.selectedArr[k] = v;
        state.selectedArr.push(1);
        state.selectedArr.pop();
        // console.log(state.selectedArr)
    },

    setSelObj(state, data) {
        let {
            k,
            v
        } = data;
        if (k instanceof Array) {
            k.forEach( item => {
                state.selectedObj[item] = "";
            });
        } else {
            state.selectedObj[k] = v;
        };
        state.selectedObj = JSON.parse(JSON.stringify(state.selectedObj));
    },

    setTypePopupF(state, flag) {
        // console.log(flag)
        state.typePopupF = flag;
    },

    setJoinCartF(state, flag) {
        // console.log(flag)
        state.joinCartF = flag;
    },

    setPlace(state, data) {
        state.placeArr = JSON.parse(JSON.stringify(data));
    },

    setPlacePopupF(state, flag) {
        state.placePopupF = flag;
    },

    setHasShop(state, flag) {
        state.hasShop = flag;
    },

    setSelShopNum(state, num) {
        // console.log(num);
        state.selectedShopNum = num;
    }
}