export default {
    getLimitTimeShop(state, data) {
        state.limitTime = data;
    },
    async getShops(state, data) {
        data = JSON.parse(JSON.stringify(data));
        let shops = await state.shops;
        // console.log(data);
        if (data instanceof Array) {
            state.shops = {
                data,
            };
            return;
        };
        if (!(data.page === 1 && shops.data.length !== 0)) {
            data.data = shops.data.concat(data.data);
        };
        state.shops = data;
    }
}