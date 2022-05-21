<template>
    <div class="userBg login">
        <h1>欢迎登录小米有品</h1>
        <main>
            <cube-form :model="model">
                <cube-form-group>
                    <cube-form-item :field="fields[0]" ref="name">
                        <cube-input 
                        v-model="model.name" 
                        :placeholder="pwdLogin ? '请输入用户名' : '中国大陆手机号码'"></cube-input>
                    </cube-form-item>
                    <cube-form-item :field="fields[1]" ref="pwd">
                        <cube-input 
                        v-model="model.pwd" 
                        :placeholder="pwdLogin ? '请输入密码' : '请输入验证码'"
                        :type="pwdLogin ? 'password' : 'text'"></cube-input>
                        <span 
                        v-if="!pwdLogin" 
                        class="getPhoneCode"
                        @click="getCode"
                        ref="getCodeBtn">
                            {{getCodeTime >= 60 ? "获取验证码" : `请${getCodeTime}后重新尝试`}}
                        </span>
                    </cube-form-item>
                    <div class="formErr" v-show="errMsg">
                        <span class="errIcon"></span>{{errMsg}}
                    </div>
                    <cube-button :primary="true" @click="submit">
                        {{pwdLogin ? '立即登录' : '立即登录/注册'}}
                    </cube-button>
                </cube-form-group>
            </cube-form>
            
            <div class="changeLoginMode" @click="changeLoginMode">
                {{pwdLogin ? '手机短信登录/注册' : '用户名密码登录'}}
            </div>
            <div class="loginOptions">
                <template v-if="pwdLogin">
                    <span @click="goReg">立即注册</span>
                    |
                    <span>忘记密码?</span>
                </template>
                <template v-else>
                    <span>收不到验证码?</span>
                </template>
            </div>
            <!-- <div class="moreLogin">
                <div class="title">其他方式登录</div>
            </div> -->

            <div class="userOptions">
                
            </div>
        </main>
    </div>
</template>

<script>
import api from "../../store/api/index";
import axios from "axios";
import md5 from "md5";
import util from "@/assets/utils";
import { createNamespacedHelpers, mapState, mapMutations } from "vuex"; 
let { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers("user");
export default {
    data() {
        return {
            model: {
                name: ""/* "sdx" */,
                pwd: ""/* "123456789" */
            },
            fields: [
                {
                    type: 'input',
                    modelKey: "name",
                },
                {
                    type: "input",
                    modelKey: "pwd",
                }
            ],
            pwdLogin: true,
            getCodeTime: 60,
            errMsg: "",
        }
    },

    methods: {
        ...mapUserActions(["setCode"]),
        ...mapMutations(["login"]),
        changeLoginMode() {
            this.pwdLogin = !this.pwdLogin;
            this.model.name = "";
            this.model.pwd = "";
        },
        async getCode(e) {
            if (!this.checkName()) return;
            if (this.getCodeTime < 60) return;
            let { data } = await api.getCode(md5(parseInt(this.model.name)));
            if (data.codeText === "NO") {
                this.errMsg = data.data;
                return;
            };
            this.setCode(data.data);
            this.setCodeTime();
        },
        setCodeTime() {
            this.getCodeTime--;
            let el = this.$refs.getCodeBtn;
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
        goReg() {
            this.$router.push("/register")
        },
        checkName() {
            let val = this.model.name.trim();
            let loginType = this.pwdLogin;
            let msg = "";
            let flag = false;
            let el = this.$refs.name.$el;
            if (!val) {
                msg = loginType ? "请输入用户名" : "请输入手机号码";
            } else {
                flag = loginType ? true : /^1\d{10}$/.test(val);
                if (loginType) {
                    flag = true;
                    msg = "";
                } else {
                    flag = /^1\d{10}$/.test(val);
                    flag ? (flag = true, msg = "") : msg = "请输入正确的手机号"
                };
            };
            !flag 
            ? el.lastElementChild.style.borderColor = "red" 
            : el.lastElementChild.style.borderColor = "#ddd";
            this.errMsg = msg;
            return flag;
        },
        async checkCode() {
            let {
                name,
                pwd
            } = this.model;
            let el = this.$refs.pwd.$el;
            let requestType = null;
            pwd = md5(pwd);
            requestType = this.pwdLogin ? "checkPwd" : "checkCode";
            requestType === "checkCode" ? name = md5(parseInt(name)) : null;
            let { data } = await api[requestType]({
                name,
                pwd
            });
            if (/[\u4e00-\u9FA5]+/.test(data.data)) {
                this.errMsg = data.data;
                return false;
            };
            if (typeof data.data === "object") {
                this.login(data.data);
                return true;
            };
        },
        async submit() { 
            let flag = this.checkName() && await this.checkCode();
            // console.log(flag);
            if (!flag) return;
            this.$router.back();
        }
    },

    computed: {
        ...mapUserState(["code"]),
        ...mapState(["isLogin", "userInfo"])
    },

    watch: {
        isLogin: {
            immediate: true,
            handler() {
                if (this.isLogin) {
                    this.$router.back();
                }
            }
        }
    },

    mounted() {
        if (this.isLogin) {
            this.$router.back();
        }
    }
}
</script>
