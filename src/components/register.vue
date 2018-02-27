<template>
  <div id="reg">
    <Head></Head>
    <div class="reg-warp">
        <h2 class="reg-title">账号注册</h2>
        <form action="api/regist" method="post">
            <div class="contarner">
                <div class="user box">
                    <label  class="user-title lab">用户名：</label>
                    <input type="text" :class="{inputred:tips.username.err}" v-model="register.username" @input="user()" class="input" name="username" placeholder="请输入用户名">
                    <div class="tips" :class="{err:tips.username.err,fin:tips.username.fin}">{{tips.username.text}}</div>
                </div>
                <div class="password box">
                    <label class="pass-title lab">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                    <input type="password" :class="{inputred:tips.password.err}" v-model="register.password" @input="pass()"  class="input" name="password" placeholder="请输入密码">
                    <div class="tips" :class="{err:tips.password.err,fin:tips.password.fin}">{{tips.password.text}}</div>
                </div>
                <div class="repassword box">
                    <label class="repass-title lab">再次输入密码：</label>
                    <input type="password" :class="{inputred:tips.repassword.err}" v-model="register.repassword" @input="repass()" class="input" name="repassword" placeholder="请再次输入密码">
                    <div class="tips" :class="{err:tips.repassword.err,fin:tips.repassword.fin}">{{tips.repassword.text}}</div>
                </div>
                <div class="email box">
                    <label class="email-title lab">请输入邮箱：</label>
                    <input type="text" :class="{inputred:tips.email.err}" v-model="register.email" @input="email()" class="input" name="email" placeholder="请输入邮箱">
                    <div class="tips" :class="{err:tips.email.err,fin:tips.email.fin}">{{tips.email.text}}</div>
                </div>
                <div class="qq box">
                    <label class="qq-title lab">请输入QQ：</label>
                    <input type="text"  :class="{inputred:tips.qq.err}" v-model="register.qq" @input="qq()" class="input" name="qq" placeholder="请输入QQ">
                    <div class="tips" :class="{err:tips.qq.err,fin:tips.qq.fin}">{{tips.qq.text}}</div>
                </div>
                <div class="phone box">
                    <label class="phone-title lab">请输入手机号：</label>
                    <input type="text" :class="{inputred:tips.phone.err}" v-model="register.phone"   @input="phone()" class="input phone-number" name="phone" placeholder="请输入手机号">
                    <div class="tips" :class="{err:tips.phone.err,fin:tips.phone.fin}">{{tips.phone.text}}</div>
                </div>
                <div class="code bpx">
                    <label class="code-title lab">验&nbsp;&nbsp;&nbsp;&nbsp;证：</label>
                    <div class="code-bg input">
                        请按住滑块，拖动到最右边
                        <div class="code-btn"></div>
                        <div class="code-mask"></div>
                        <p class="code-text">验证通过</p>
                    </div>
                </div>
                <div class="pact box">
                    <label class="arc"></label>
                    <input type="checkbox" checked v-model="tips.term.fin" @click="tips.term.fin = !tips.term.fin">
                    <span>我已阅读
                        <a href="javascript:void(0)">《隐私政策》</a>并同意
                        <a href="javascript:void(0)">《XXXX服务条款》</a>
                    </span>
                </div>
                <div class="reg box">
                    <label class="arc"></label>
                    <button class="register" @click="regBtn($event)">注册</button>
                    <div class="regBtn" :class="{err:reg.err,fin:reg.fin}">{{reg.text}}</div>                    
                </div>
            </div>
        </form>
        </div>
  </div>
</template>

<script>
function anime(ele, json) {
  clearInterval(ele.timer);
  ele.timer = setInterval(function() {
    var bool = true;
    for (var key in json) {
      var leader = parseInt(window.getComputedStyle(ele, null)[key]);
      var speed = (json[key] - leader) / 10;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      leader += speed;
      ele.style[key] = leader + "px";
      if (json[key] !== leader) {
        bool = false;
      }
      if (bool) {
        clearInterval(ele.timer);
      }
    }
  }, 23);
}
import Head from "./head"
import request from '../common/api/request'
import {mapActions,mapState} from 'vuex'
export default {
  data() {
    return {
      register: {
        username: "",
        password: "",
        repassword: "",
        email: "",
        qq: "",
        phone: ""
      },
      tips: {
        username: {
          text: "",
          err: false,
          fin: false
        },
        password: {
          text: "",
          err: false,
          fin: false
        },
        repassword: {
          text: "",
          err: false,
          fin: false
        },
        email: {
          text: "",
          err: false,
          fin: false
        },
        qq: {
          text: "",
          err: false,
          fin: false
        },
        phone: {
          text: "",
          err: false,
          fin: false
        },
        code: {
            fin:false,
            err:false
        },
        term: {
            fin:true
        },
      },
              reg: {
          text: "",
          err: false,
          fin: false
        }
    };
  },
  computed:{
    ...mapState([])
  },
  components:{
      Head
  },
  methods: {
    user() {
      this.checkInput(
        "username",
        /^([a-zA-Z])([a-zA-Z0-9]{3,17})$/,
        "验证通过",
        "请输入4-18位并以字母开头"
      );
    },
    pass() {
      this.checkInput(
        "password",
        /^([a-zA-Z])([a-zA-Z0-9]{3,17})$/,
        "验证通过",
        "请输入4-18位并以字母开头"
      );
    },
    repass() {
      this.checkInput("repassword", /^([a-zA-Z])([a-zA-Z0-9]{3,17})$/);
    },
    email() {
      this.checkInput(
        "email",
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        "验证通过",
        "请输入正确的邮箱地址"
      );
    },
    qq() {
      this.checkInput(
        "qq",
        /^[1-9][0-9]{4,12}$/,
        "验证通过",
        "请输入正确的QQ号"
      );
    },
    phone() {
      this.checkInput(
        "phone",
        /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
        "验证通过",
        "请输入正确的手机号"
      );
    },
    checkInput(inp, reg, text1, text2) {
      this.tips[inp].text = "";
      this.tips[inp].err = false;
      this.tips[inp].fin = false;
      var reg = reg;
      if (inp == "repassword") {
        if (
          this.register[inp] == this.register.password &&
          this.register[inp].length > 3
        ) {
          this.tips[inp].text = "验证通过";
          this.tips[inp].fin = true;
        } else {
          if (this.register[inp].length < 4) {
            this.tips[inp].text = "请输入4-18位并以字母开头";
            this.tips[inp].err = true;
          } else {
            this.tips[inp].text = "两次输入密码不一致";
            this.tips[inp].err = true;
          }
        }
      } else {
        if (reg.test(this.register[inp]) && this.register[inp].length != 0) {
          this.tips[inp].text = text1;
          this.tips[inp].fin = true;
        } else {
          this.tips[inp].text = text2;
          this.tips[inp].err = true;
        }
      }
    },
    coder(e) {
      var that = this
      that.tips.code.fin = false
      var inputWidth = document.querySelector(".input").offsetWidth;
      var input = document.querySelector(".code-bg");
      var btn = input.querySelector(".code-btn");
      var mask = input.querySelector(".code-mask");
      var codeText = input.querySelector(".code-text");
      var bool = false;
      btn.onmousedown = function(e) {
        var pagex = e.pageX;
        var xx = pagex - input.offsetLeft - btn.offsetLeft;
        document.onmousemove = function(e) {
          var x = e.pageX;
          x = x - input.offsetLeft - xx;
          if (x <= 0) {
            x = 0;
          } else if (x >= 260) {
            x = 260;
            mask.style.width = x + "px";
            btn.style.left = x + "px";
            setTimeout(() => {
              codeText.style.display = "block";
            }, 800);
            bool = true;
          }
          if (!bool) {
            mask.style.width = x + "px";
            btn.style.left = x + "px";
            that.tips.code.fin = false
          } else {
            that.tips.code.fin = true;
          }
          window.getSelection
            ? window.getSelection().removeAllRanges()
            : document.selection.empty();
          btn.onmouseup = function(e) {
            document.onmousemove = null;
            if (x < 260) {
              anime(btn, {
                left: 0
              });
              anime(mask, {
                width: 0
              });
            }
          };
        };
      };
    },
    async regBtn(e){
      e.preventDefault();
      this.reg.text = "";
      this.reg.err = false;
      var err = [];
      var user = JSON.stringify(this.register)
      Object.keys(this.tips).forEach((item, index) => {
        if (this.tips.term.fin == false) {
          err.push(this.tips[item].fin);          
          this.reg.text = "请勾上条约";
          this.reg.err = true;
        } else if (this.tips[item].fin == false) {
          err.push(this.tips[item].fin);
          this.reg.err = true;
          this.reg.text = "请填写完星号内容";
        } else {
        }
      });
        if(err.length == 0){
           request.register(this.register).then((data)=>{
             console.log(data.data)
              if(data.data.code == 200){
                this.$store.dispatch('getUsername',data.data.msg)
                this.$router.push({path:'/finish',query:{user:this.register.username}})
              }else if(data.data.code == 400){
                this.tips.username.text = data.data.msg
                this.tips.username.err = true
                this.tips.username.fin = false
              }
          })
          // this.$refs.form.submit()
        }
    }
  },
  mounted() {
    this.coder();
  }
};
</script>

<style lang="less" scoped>
.reg-warp {
  width: 1000px;
  margin: 0 auto;
  padding-bottom: 150px;
  background-color: #fff;
  .reg-title {
    font-weight: 500;
    text-align: left;
    padding-top: 30px;
    font-size: 24px;
  }

  .reg-title::before {
    content: "";
    padding: 0 2px;
    margin-right: 10px;
    background-color: #4ad7ca;
  }

  .contarner {
    width: 740px;
    margin: 0 auto;
    margin-top: 50px;
  }

  .box {
    margin-bottom: 20px;
    line-height: 44px;
  }

  .lab,
  .arc {
    display: inline-block;
    width: 228px;
    height: 44px;
    padding-right: 12px;
    text-align: right;
    font-size: 16px;
  }

  .lab::before {
    content: "*";
    display: inline-block;
    color: red;
    margin-right: 4px;
    vertical-align: middle;
  }

  .input {
    width: 274px;
    height: 38px;
    padding: 0 12px;
    vertical-align: top;
    border: 1px solid #aaa;
    outline-style: none;
  }

  .input-active {
    border-color: red;
  }

  .code-title {
    line-height: 44px;
  }

  .code-bg {
    display: inline-block;
    width: 208px;
    line-height: 40px;
    padding-left: 80px;
    font-size: 14px;
    background-color: #ccc;
    border: 0;
    position: relative;
    cursor: default;
  }

  .code-mask {
    width: 0;
    height: 100%;
    background-color: #168aed;
    position: absolute;
    top: 0;
    left: 0;
  }

  .code-btn {
    width: 40px;
    height: 38px;
    background-color: #fff;
    box-shadow: 0 0 10px #888;
    position: absolute;
    font-family: "simsun";
    top: 0;
    left: 0;
    z-index: 1;
  }

  .code-text {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }

  .code-btn::before {
    content: ">>";
    padding-left: 13px;
  }

  .register {
    border: none;
    width: 150px;
    height: 44px;
    background-color: #168aed;
    color: #fff;
    line-height: 44px;
    text-align: center;
  }

  .tips {
    float: right;
    width: 175px;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 13px;
  }

  .inputred {
    border: 1px solid red;
  }

  .err {
    color: red;
  }

  .fin {
    color: #50d94b;
  }
  .regBtn{
      width:400px;
      margin-top:20px;
      margin-left:240px;
  }
}
</style>
