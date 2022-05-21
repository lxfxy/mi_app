<template>
    <div class="userBg register">
        <h1>小米有品注册</h1>
        <main>
            <cube-form >
                <cube-form-item v-for="(item, index) in model" :key="index">
                    <!-- {{item}} -->
                    <cube-input 
                    v-model="item.value" 
                    :placeholder="item.placeholder"
                    @blur="checkFormVal(index)"
                    :type="item.type || 'text'" />
                    <div class="formErr" v-show="errMsg[index]">
                        <b class="errIcon"></b> {{ errMsg[index] }}
                    </div>
                    <span 
                    class="getPhoneCode" 
                    v-if="index === 'code'" 
                    ref="getPhoneBtn"
                    @click="getCode">
                        {{getCodeTime < 60 ? `请在${getCodeTime}后尝试重新获取` : "获取验证码"}}
                    </span>
                </cube-form-item>
                <cube-button :primary="true" @click="submit">立即注册</cube-button>
            </cube-form>

            <p class="changeLoginMode" @click="$router.push('/login')">已有账号 ? 前去登录</p>
        </main>
    </div>
</template>

<script>
import Back from "@/components/back";
import { mapMutations } from "vuex";
import api from "../../store/api";
import md5 from "md5";
console.log(md5(123456789));
export default {
    data() {
        return {
            model: {
                name: {
                    value: "",
                    reg: /^(\w|[\u4e00-\u9FA5])+$/,
                    placeholder: "请输入您的名称",
                    errMsg: "名称由数字或字母或中文组成"
                },
                username: {
                    value: "",
                    reg: /^\w+$/,
                    errMsg: "用户名只能由英文组成",
                    placeholder: "请输入用户名",
                },
                pwd: {
                    value: "",
                    reg: /^\S{6,12}$/,
                    errMsg: "密码由非空格类6-12位字符组成",
                    placeholder: "请输入密码",
                    type: "password",
                },
                phone: {
                    value: "",
                    reg: /^1\d{10}$/,
                    errMsg: "请输入正确的手机号码",
                    placeholder: "请输入手机号码",
                },
                code: {
                    value: "",
                    reg: /^\d{6}$/,
                    errMsg: "验证码由6位数字组成",
                    placeholder: "请输入验证码",
                },
            },
            errMsg: {
                name: "",
                username: "",
                pwd: "",
                phone: "",
                code: "",
            },
            usernameReg: /^(\w|[\u4e00-\u9FA5])+$/,
            spaceReg: /\s+/,
            getCodeTime: 60,
            codeVal: "",
        }
    },

    components: {
        Back
    },

    methods: {
        ...mapMutations(["login"]),
        checkFormVal(val) {
            let {
                value,
                reg,
                placeholder,
                errMsg,
            } = this.model[val];
            value = value.trim();
            let flag = reg.test(value);
            if (val === "code") {
                if (this.getCodeTime >= 60) {
                    this.errMsg.code = "请获取验证码"
                    return false;
                };
                flag = md5(parseInt(value)) === this.codeVal;
                if (!flag) {
                    errMsg = "验证码错误"
                }
            }
            if (!value) {
                this.errMsg[val] = placeholder;
            } else if (!flag) {
                this.errMsg[val] = errMsg;
            } else {
                this.errMsg[val] = "";
            };
            return flag;
        },
        async getCode(e) {
            if (!this.checkFormVal("phone")) return;
            if (this.getCodeTime < 60) return;
            let { data } = await api.getCode(md5(parseInt(this.model.phone.value)), "register");
            if (data.codeText === "NO") {
                this.errMsg.phone = data.data;
                return;
            };
            this.codeVal = data.data;
            this.setCodeTime();
        },
        setCodeTime() {
            this.getCodeTime--;
            let el = this.$refs.getPhoneBtn[0];
            el.style.filter = "grayscale(100%)";
            el.timer = setInterval(() => {
                this.getCodeTime--;
                if (this.getCodeTime <= 0) {
                    this.getCodeTime = 60;
                    el.style.filter = "none";
                    clearInterval(el.timer);
                    return;
                }
            }, 1000)
        },
        async submit() {
            let flags = Object.keys(this.model).map(item => this.checkFormVal(item));
            flags = flags.includes(false);
            if (flags) return;
            let data = {};
            for (let k in this.model) {
                let item = this.model[k];
                data[k] = item.value;
            };
            let result = await api.register(data);
            console.log(result);
            if (parseInt(result.data.code) === 0) {
                this.login(result.data.data);
                this.$router.push('/user');
                return;
            }
        }
    }
}
</script>

<style>
.back {
    top: 20px;
}
</style>