<template>
  <div>
    <nav class="navbar navbar-transparent navbar-absolute">
      <div class="container">
        <div class="navbar-header">
          <p style="font-size:20px;color:white">宁波甬航商旅</p>
          <!-- <router-link class="navbar-brand">宁波甬航商旅</router-link> -->
        </div>
        <div class="collapse navbar-collapse"></div>
      </div>
    </nav>

    <div class="wrapper wrapper-full-page">
      <div
        class="full-page login-page"
        data-color=""
        data-image="static/img/background/background-2.jpg"
      >
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                <form method="#" action="#">
                  <div class="card" data-background="color" data-color="blue">
                    <div class="card-header">
                      <h3 class="card-title">登录</h3>
                    </div>
                    <div class="card-content">
                      <a-form
                        id="formLogin"
                        class="user-layout-login"
                        ref="formLogin"
                        :form="form"
                        @submit="handleSubmit"
                      >
                        <a-form-item>
                          <label>手机号</label>

                          <a-input
                            size="large"
                            type="text"
                            placeholder="手机号"
                            v-decorator="[
                              'phonenumber',
                              {
                                rules: [
                                  {
                                    required: true,
                                    pattern: /^1[345789]\d{9}$/,
                                    message: '请输入正确的手机号',
                                  },
                                ],
                                validateTrigger: 'change',
                              },
                            ]"
                          ></a-input>
                        </a-form-item>
                        <!-- <div class="form-group">                       
                        <input
                          type="phone"
                          placeholder="手机号"
                          class="form-control input-no-border"
                          v-decorator="[
                              'phonenumber',
                              {
                                rules: [
                                  {
                                    required: true,
                                    pattern: /^1[345789]\d{9}$/,
                                    message: '请输入正确的手机号',
                                  },
                                ],
                                validateTrigger: 'change',
                              },
                            ]"
                        />
                      </div>
                        <div class="form-group">
                        <label>验证码</label>
                        <input
                          placeholder="验证码"
                          class="form-control input-no-border"
                          v-validate="code"
                        />
                        <button
                          class=" btn btn-fill btn-info"
                          :disabled="disabled"
                          @click.stop.prevent="getCode"
                        >
                          获取验证码
                        </button>
                      </div> -->
                        <a-row :gutter="16">
                          <a-col class="gutter-row" :span="16">
                            <a-form-item>
                              <label>验证码</label>
                              <a-input
                                size="large"
                                type="text"
                                placeholder="验证码"
                                v-decorator="[
                                  'code',
                                  {
                                    rules: [
                                      {
                                        required: true,
                                        message: '请输入验证码',
                                      },
                                    ],
                                    validateTrigger: 'blur',
                                  },
                                ]"
                              >
                              </a-input>
                            </a-form-item>
                          </a-col>
                          <div class="row">
                            <div class="col-6">
                                
                            </div>
                            <div class="col-6"></div>
                          </div>
                          <a-col class="gutter-row" :span="8">
                            <button
                              class="getCode btn btn-info btn-fill"
                              tabindex="-1"
                              :disabled="state.smsSendBtn"
                              @click.stop.prevent="getCode"
                              v-text="
                                (!state.smsSendBtn && '获取验证码') ||
                                  state.time + ' s'
                              "
                            ></button>
                          </a-col>
                        </a-row>
                        <a-form-item>
                          <button class="btn btn-info btn-fill" :loading="state.loginBtn" :disabled="state.loginBtn">登录</button>
                        </a-form-item>
                      </a-form>
                    </div>

                    <div class="card-footer text-center">
                      <!-- <div class="forgot">
                        :loading="state.loginBtn"
                        :disabled="state.loginBtn"
                        <router-link to="/register">
                          Forgot your password?
                        </router-link>
                      </div> -->
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div
          class="full-page-background"
          style="background-image: url(static/img/background/background-2.jpg) "
        ></div>
      </div>
    </div>
    <div class="collapse navbar-collapse off-canvas-sidebar">
      <ul class="nav nav-mobile-menu">
        <router-link to="/register" tag="li">
          <a>Register</a>
        </router-link>
        <router-link to="/admin/overview" tag="li">
          <a>Dashboard</a>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import md5 from "md5";
import { mapActions } from "vuex";
// 用于获取表单中的手机号
import { getSmsCode } from "@/api/login";

export default {
  data() {
    return {
      loginBtn: false,
      loginType: 0,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        loginType: 0,
        smsSendBtn: false,
      },
    };
  },
  mounted() {
    let accesstoken = localStorage.getItem("Access-Token");
    let expire = localStorage.getItem("Expire");
    if (accesstoken && expire && new Date().getTime() < +expire) {
      this.$router.push("/admin");
    }
  },

  methods: {
    ...mapActions(["Login"]),
    // handler
    btn() {
      alert("btn");
    },
    handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state,
        Login,
      } = this;
      validateFields((err, values) => {
        if (!err) {
          state.loginBtn = true;
          let loginParams = values;
          Login(loginParams)
            .then((res) => {
              this.$router.push("/forms/tfdate");
            })
            .catch((err) => {
              this.$message.error(err);
            })
            .finally(() => {
              state.loginBtn = false;
            });
        } else {
          setTimeout(() => {
            state.loginBtn = false;
          }, 600);
        }
      });
    },
    // 获取验证码
    getCode(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state,
      } = this;
      validateFields(["phonenumber"], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true;
          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60;
              state.smsSendBtn = false;
              window.clearInterval(interval);
            }
          }, 1000);
          getSmsCode({ phonenumber: values.phonenumber })
            .then((res) => {
              if (res.state) {
                clearInterval(interval);
                state.time = 60;
                state.smsSendBtn = false;
                this.$message.error("发送失败", 2);
              }
            })
            .catch((err) => {
              clearInterval(interval);
              state.time = 60;
              state.smsSendBtn = false;
            });
        }
      });
    },
  },
};
</script>
<style>
.form-group {
  margin-bottom: 0;
}
</style>
