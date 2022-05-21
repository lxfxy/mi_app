export default {
    fillZero(num) {
        return num >= 10 ? num : "0" + num;
    },
    _type(val) {
        let toString = {}.toString;
        return /\[object (\w+)\]/.exec(toString.call(val))[1].toLowerCase()
    }
}