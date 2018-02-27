<template>
  <div id="finish">
      <div class="finish">
          <h2 class="title">恭喜你注册成功啦！</h2>
          <p>你的用户名是：<span>{{user}}</span>你已经正式成为本站会员啦！    </p>
          <p>系统将在<span>{{time}}</span>秒后跳转至首页</p>
          <p><router-link to="/index" @click="time=-1">返回首页</router-link>||<router-link @click="time=-1" to="login">登录用户</router-link>    </p>
          <img src="../common/img/finfish.jpg" alt="">
      </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      time: 10,
      user:this.$route.query.user,
      clear:undefined
    };
  },
  computed:{

  },
  methods: {
    count(path) {
      this.clear = setInterval(() => {
        this.time--;
        if (this.time > 0) {
          return this.count();
        }else if(this.time == -1){
          clearInterval(this.clear)          
        }else{
          clearInterval(this.clear)
          this.$router.push({path})
        }
      }, 1000);

    },
    clearTime(){
          clearInterval(this.clear)          
      
    }
  },
  mounted() {
    this.count();
  }
};
</script>

<style lang="less" scoped>
.finish {
  width: 1000px;
  height: 800px;
  background-color: #fff;
  margin: 0 auto;
  text-align: center;
  h2 {
    font: 700 40px/50px "微软雅黑";
    color: #ff649e;
    text-align: center;
    padding: 40px 0;
    padding-top: 80px;
  }
  p {
    font: 500 20px/30px "simsun";
    text-align: center;
    padding-top: 30px;
  }
  span {
    color: #ff649e;
  }
  img {
    vertical-align: middle;
    width: 25%;
    margin-top: 50px;
  }
}
</style>
