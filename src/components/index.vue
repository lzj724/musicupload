<template>
  <div id="index">
    <Head></Head>
    <Masks v-if="mask"></Masks>
    <p class="tips" v-if="tipsShow" @click="to()">{{tips}}  {{count}}</p>
      <p  class="title"></p>
      <img src="../common/img/1.jpg" alt="">
      <div class="controll">
        <form action="/upload" method="post" ref="form" enctype="multipart/form-data">
          <label class="fileLad" for="file">{{filetitle}}</label><!-- <div>
            </div> --><input @change="filechange($event)" accept="audio/mp3" type="file" ref="file" id="file" style="position:absolute;clip:rect(0 0 0 0);"><!-- <div>
            </div> --><input type="submit" class="submit" ref="submit" @click.prevent="upload($event)">
        </form>
      </div>
        <div class="audio" v-if="url">
          <audio class="audioMode" :src="url" controls autoplay></audio>
          <p>音乐的歌曲名为：{{songname}}</p>
          <p>音乐的链接地址为：</p>
          <p>{{url}}</p>
        </div>
  </div>
</template>

<script>
import Head from "./head";
import Masks from "./mask";
import cookie from '../common/cookieApi'
import request from '../common/api/request'
import {mapState} from 'vuex'
export default {
  components: {
    Head,
    Masks
  },
  data() {
    return {
      tips: "",
      count: 5,
      tipsShow: false,
      filetitle: "点击上传文件",
      file: [],
      mask: false,
      url: "",
      songname: ""
    };
  },
  computed:{
    ...mapState(['username'])
  },
  methods: {
    to() {
      this.tips = "";
      this.tipsShow = false;
      this.$router.push("/login");
    },
    async upload(e) {
      this.tips = "";
      this.tipsShow = false;
      this.mask = true;
      var username = this.username;
      var formdata = new FormData();
      formdata.append("file", this.file);
      formdata.append("username", username);
      if (!cookie.getCookie("access_token")) {
        this.mask = false;
        this.filetitle = "点击上传文件";
        this.tips = "您尚未登陆，请登陆后在使用此功能";
        this.tipsShow = true;
        this.toLogin();
      }
      request.upload(formdata,cookie.getCookie("access_token")).then(data => {
          console.log(data.data);
          if (data.data.code == 200) {
            this.mask = false;
            this.url = "api" + data.data.src;
            var num = data.data.musicname.lastIndexOf(".");
            this.songname = data.data.musicname.substring(0, num);
        } else if (data.data.msg == 'jwt expired') {
            this.mask = false;
            this.filetitle = "点击上传文件";
            this.tips = "cookie已过期，请重新登陆后再上传文件";
            this.tipsShow = true;
            this.toLogin();
          }
        });
    },
    toLogin() {
      var clear = setInterval(() => {
        this.count--;
        if (this.count < 0) {
          clearInterval(clear);
          this.tips = "";
          this.tipsShow = false;
          cookie.delCookie("name");
          cookie.delCookie("access_token");
          this.$router.push("/login");
        }else if(this.count == 0){
          this.$router.push("/login");
        }
      }, 1000);
    },
    filechange(e) {
      this.file = e.target.files[0];
      this.filetitle = e.target.files[0].name;
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
#index {
  position: relative;
  img {
    width: 100%;
  }
  .tips {
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
  .controll {
    width: 652px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    .fileLad {
      display: inline-block;
      width: 500px;
      height: 48px;
      line-height: 50px;
      font-size: 18px;
      color: black;
      padding-left: 20px;
      border: 1px solid #0094ff;
      background: #fff;
    }
    .submit {
      border: 0;
      width: 130px;
      height: 50px;
      background: #0094ff;
      font-size: 18px;
      color: white;
    }
  }
  .audio {
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50%, 0);
    .audioMode {
      margin-left: 50%;
      width: 500px;
      transform: translateX(-50%);
    }
    p {
      padding-top: 20px;
      font-size: 24px;
      color: white;
      text-align: center;
      line-height: 30px;
      text-shadow: 1px 1px 20px blue;
    }
  }
}
</style>
