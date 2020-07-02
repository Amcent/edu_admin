<template>
  <div class="passport-container">
    <div class="passport-container-left">
      <p class="container-left-title">
        EDU Pro
        <br />
        面向未来 培养人才
      </p>
    </div>
    <div class="passport-container-right">
      <div class="passport-container">
        <div class="passport-container-content">
          <div class="passport-content-main" v-if="smsLoginStep === 1">
            <div class="passport-method">
              <p class="method-title">欢迎来到EDU Pro</p>
              <p class="method-desc">
                以企业为教学出发点，以企业为人才流向地，面向市场及职场打造“教 → 学 → 求职”全流程的创新式闭环
              </p>
              <div class="method-main">
                <div class="input-prepend-container">
                  <input type="text" class="phone-input-prepend" autocomplete="off" disabled value=" + 86 " />
                </div>
                <div class="phone-input-container">
                  <input class="phone-input" type="text" placeholder="请输入手机号码" v-model="phone" autocomplete="off" />
                </div>
              </div>
              <div class="phone-error">
                <p class="phone-error-message" v-show="showPhoneError">请输入正确的手机号码</p>
              </div>
              <div class="sms-send-btn">
                <el-button type="primary" round :disabled="validatePhone" @click="handleSendSms">下一步</el-button>
              </div>
            </div>
          </div>
          <div class="passport-content-main" v-if="smsLoginStep === 2">
            <div class="passport-method">
              <p class="method-title">验证手机号码</p>
              <p class="method-desc">请输的 6 位验证码，有效期十分钟。如未收到，请尝试重新获取验证码。</p>
              <p class="current-phone">当前手机号码： {{ phone }}</p>
              <div class="code-input-row">
                <input type="text" class="code-input" v-for="(item, index) in code" v-model="code[index]" :key="index"
                  :data-index="index" :data-focusIndex="focusIndex" :disabled="focusIndex !== index" autocomplete="off"
                  maxlength="1" @keyup="codeInputChange" v-focus />
              </div>
              <div class="passport-back">
                <el-button type="text" class="sms-back" @click="smsLoginStep = 1">&lt; 返回</el-button>
              </div>
              <div class="sms-send-btn" @click="handleCodeSubmit">
                <el-button type="primary" round>下一步</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authService from "../global/service/auth";

export default {
  name: "Login",

  data() {
    return {
      phone: "",
      phoneError: false,
      smsLoginStep: 1,
      code: ["", "", "", "", "", ""],
      focusIndex: 0
    };
  },

  methods: {
    handleSendSms() {
      let phone = this.phone;

      authService
        .getSmsCode({ phone })
        .then(res => {
          this.$message({
            message: "手机验证码：" + res,
            type: "success"
          });

          this.smsLoginStep = 2;
        })
        .catch(err => {
          console.log("err", err);
        });
    },

    codeInputChange(e) {
      let value = this.code[this.focusIndex];

      if (e.keyCode === 8 && this.focusIndex !== 0) {
        this.focusIndex -= 1;
        this.code[this.focusIndex] = "";
        return;
      }

      if (/^\d$/.test(value)) {
        this.focusIndex += 1;
      } else {
        this.$set(this.code, this.focusIndex, "");
      }

      if (this.focusIndex == 6) {
        this.handleCodeSubmit();
        this.focusIndex = 0;
        this.code = ["", "", "", "", "", ""];
      }
    },

    handleCodeSubmit() {
      if (!this.code[5]) {
        return;
      }

      let phone = this.phone;
      let code = this.code.join("");

      authService
        .smsLogin({ phone, code })
        .then(() => {
          window.location.reload();
        })
        .catch(err => {
          console.log("handleCodeSubmit -> err", err);
        });
    }
  },

  computed: {
    validatePhone() {
      return !/^1[3456789]\d{9}$/.test(this.phone);
    },

    showPhoneError() {
      return /^\d{11}/.test(this.phone) && this.validatePhone;
    }
  },

  directives: {
    focus: function(el) {
      let index = el.getAttribute("data-index");
      let focusIndex = el.getAttribute("data-focusIndex");
      if (index == focusIndex) {
        el.focus();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.passport-container {
  display: flex;
  height: 100%;
  width: 100%;

  .passport-container-left {
    position: relative;
    width: 480px;
    background: url("../assets/edu-passport.jpg") no-repeat center center /
      480px 990px;

    .container-left-title {
      display: inline-block;
      position: absolute;
      top: 82px;
      left: 50px;
      line-height: 50px;
      text-align: left;
      font-size: 36px;
      font-weight: 600;
      color: #fff;
    }
  }

  .passport-container-right {
    display: flex;
    height: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;

    .passport-container {
      width: 600px;
      height: 600px;
      padding: 20px;
      background-color: #b2b1bf;

      .passport-container-content {
        width: 100%;
        padding: 20px;
        background-color: #fff;

        .passport-content-main {
          height: 100%;
          padding: 20px;

          .passport-method {
            position: relative;
            height: 100%;
            text-align: left;

            .method-title {
              line-height: 32px;
              font-size: 32px;
              color: #333;
              font-weight: 600;
            }

            .method-desc {
              margin-top: 36px;
              line-height: 24px;
              font-size: 16px;
              color: #999;
            }

            .current-phone {
              margin-top: 15px;
              line-height: 24px;
              font-size: 18px;
              color: #666;
            }

            .method-main {
              display: flex;
              height: 50px;
              margin-top: 30px;
              border: 1px solid #e0e0e0;
              border-radius: 10px;

              .input-prepend-container {
                width: 80px;
                height: 50px;
                padding: 12px;
                border-right: none;

                .phone-input-prepend {
                  width: 56px;
                  height: 26px;
                  border: none;
                  border-right: 1px solid #e0e0e0;
                  background-color: #fff;
                  line-height: 48px;
                  font-size: 18px;
                  color: #666;
                }
              }

              .phone-input {
                width: 390px;
                height: 100%;
                padding: 12px;
                border: none;
                line-height: 48px;
                font-size: 18px;
                color: #666;

                &:focus {
                  outline: none;
                }
              }

              &:hover {
                border: 1px solid #409eff;
              }
            }

            .phone-error {
              position: absolute;
              top: 185px;
              left: 0;
              line-height: 20px;
              font-size: 18px;
              color: #f56c6c;
            }

            .code-input-row {
              display: flex;
              margin-top: 30px;
              justify-content: space-between;

              .code-input {
                width: 50px;
                height: 50px;
                border: 1px solid #e0e0e0;
                padding: 15px;
                background-color: #fff;
                line-height: 48px;
                text-align: center;
                font-size: 30px;
                color: #666;

                &:focus {
                  outline: none;
                  border: 1px solid #409eff;
                }
              }
            }

            .passport-back {
              margin-top: 30px;

              .sms-back {
                line-height: 24px;
                font-size: 16px;
              }
            }

            .sms-send-btn {
              position: absolute;
              width: 100%;
              bottom: 0;

              .el-button {
                width: 100%;
                height: 50px;
                border-radius: 30px;
                font-size: 20px;
              }
            }

            .login-switch-wechat {
              margin-top: 40px;

              .login-switch-btn {
                line-height: 20px;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
