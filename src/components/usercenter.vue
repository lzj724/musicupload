<template>
  <div id="userinfo">
      <Head></Head>
      <h2 class="tips">{{username}}，欢迎您！</h2>
        <h2>您共计上传了{{list.length}}首歌曲，继续努力吧！</h2>
        <p>歌曲列表</p>
        <ul v-for="item in list">
            <li>
                <div class="item">{{item.song}}</div>
                <audio :src="'/api'+item.path" controls></audio>
            </li>
        </ul>
  </div>
</template>

<script>
import cookie from "../common/cookieApi";
import axios from "../common/api/request";
import Head from "./head";
export default {
  data() {
    return {
      count: 0,
      list:[]
    };
  },
  components: {
    Head
  },
  computed: {
    username() {
      return this.$route.query.user;
    }
  },
  methods: {
    getUserData() {
      
      axios.userinfo(this.$route.query.user,cookie.getCookie("access_token"))
     .then(data=>{
            console.log(data)
            if(data.data.code == 200){
                this.list = data.data.musicInfo
                
            }
    })
    }
  },
  mounted() {
      this.$nextTick(()=>{
          this.getUserData()
      })
  }
}
</script>

<style lang="less" scoped>
#userinfo{

  .tips{
    padding: 20px ;
    font-size:20px;
    color:red;
  }
  h2{
    color:yellowgreen;
    font-size:20px;
    padding:10px 20px;
  }
  p{
    padding:10px 50px;
    font-size:20px;
    font-weight:700;    
  }
  .item{
    padding: 10px 20px;
    font-size:20px;
    background: #6FB2FF;
  }
  audio{
    padding:10px;
    width:500px;

  }
}
</style>
