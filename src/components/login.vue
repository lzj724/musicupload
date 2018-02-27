<template>
  <div id="login">
    <Head></Head>
        <p class="tipstitle" v-if="tipsShow" @click="to()">{{tips}}  {{count}}</p>
    <div class="login">
        <h2 class="title">账号登陆</h2>
            <div class="container">
        <form action="api/login" method="post" ref="form">
                <div class="box">
                    <label  class="lab">用户名：</label>
                    <input type="text" v-model="user.user"  class="input" name="username" placeholder="请输入用户名">
                </div>
                <div class="box">
                    <label class="lab">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                    <input type="password" v-model="user.pass"  class="input" name="password" placeholder="请输入密码">
                </div>
                <div class="box">
                  <p class="tips" :class="{err:tips.err}">{{tips.text}}</p>
                </div>
                <div class="box log">
                    <button class="login-btn" @click="login($event)">登陆</button>
                    <div class="reg">
                    <span>没有账号？</span><router-link to="register">注册账号</router-link>
                    </div>
                </div>
        </form>
            </div>
    </div>
  </div>
</template>

<script>
import Head from "./head";
import cookie from '../common/cookieApi'
import request from '../common/api/request'
export default {
  data() {
    return {
      tips: "",
      count: 5,
      tipsShow: false,
      user: {
        user: "",
        pass: ""
      },
      tips: {
          text: "",
          err: false
      }
    };
  },
  components: {
    Head
  },
  methods: {
    to() {
      this.tips = "";
      this.tipsShow = false;
      this.$router.push("/index");
    },
    setTime(){
            var clear = setInterval(() => {
        this.count--;
        if (this.count < 0) {
          clearInterval(clear);
          this.tips = "";
            this.tipsShow = false;
          this.$router.push("/index");
        }
      }, 1000);
    },
      login(e){
        e.preventDefault();
        this.tips.err  = false
          this.tips.text = ""        
        if(this.user.user.length == 0 || this.user.pass.length == 0 ){
          this.tips.text = "账号或密码不能为空"
          this.tips.err = true
        }else if(this.user.user.length < 4 && this.user.pass.length < 4){
          this.tips.text = "请输入四位数以上的账号密码"
          this.tips.err = true
        }else{
         request.login(this.user).then(data=>{
            console.log(data.data)
            if(data.data.code == -2){
              this.tips.text = data.data
               this.tips.err = true
            }else if(data.data.code == 200){
              this.tips = "登陆成功";
               this.tipsShow = true;
                cookie.setCookie('access_token',data.data.token)
            }else{
              this.tips.text = data.data
               this.tips.err = true

            }
          })
        }
      }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
  .tipstitle {
    z-index: 20;
    border-radius: 10px;
    box-shadow: 1px 1px 10px forestgreen;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%);
    width: 500px;
    height: 200px;
    background-color: #fff;
    line-height: 200px;
    text-align: center;
    color: black;
    font-size: 20px;
  }
.login {
  width: 1000px;
  padding-bottom: 200px;
      padding-top:70px;  
  background-color: #fff;
  margin: 0 auto;
  .container{
      padding-top:150px;
      text-align:center;
  }
  .title {
    font-weight: 500;
    text-align: left;
    padding-top: 30px;
    font-size: 24px;
    &::before {
      content: "";
      padding: 0 2px;
      margin-right: 10px;
      background-color: #4ad7ca;
    }
  }

  .box {
    margin-bottom: 20px;
    line-height: 44px;
  }
  .lab {
    display: inline-block;
    width: 78px;
    height: 44px;
    padding-right: 12px;
    text-align: right;
    font-size: 16px;
  }
  .input {
    width: 274px;
    height: 38px;
    padding: 0 12px;
    vertical-align: top;
    border: 1px solid #aaa;
    outline-style: none;
  }
  .log {
    padding-top: 30px;
  }
  .login-btn {
    border: none;
    width: 150px;
    height: 44px;
    background-color: #168aed;
    color: #fff;
    line-height: 44px;
  }
  .err {
    color: red;
  }

  .reg {
    font-size: 16px;
    display: inline-block;
    padding-left: 20px;
  }
  .tips{
    line-height: 40px;
    font-size: 20px;
  }
}
</style>
