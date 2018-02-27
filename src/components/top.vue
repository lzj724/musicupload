<template>
   <div id="top">
       <div  class="top" v-if="showTop">
           <div class="log" v-if="isCookie">
          <router-link to="login">点击登陆</router-link>||
          <span>没有账号？</span><router-link to="register">注册账号</router-link>
          </div>
             <div class="log" v-else>
                    <span style="color:red;">{{username}}</span><span>，欢迎您！ </span>
                    <span class="link" @click="toUser()" style="color:blue;" v-if="!page">用户中心</span>
                    <span class="link" @click="toIndex()" style="color:blue;" v-else>回到首页</span>
             </div>
          </div>
      </div>
</template>

<script>
import cookie from '../common/cookieApi'
import axios from '../common/api/request'

export default {
    data(){
        return{
            show:this.$route.path,
            username:'',
            isCookie:false
        }
    },
    computed:{
        page(){
            if(this.$route.path == '/usercenter'){
                return true
            }
        },
        showTop(){
            if(this.show == '/register' || this.show == '/login'){
                return false
            }else{
                return true
            }
        },
    },
    methods:{
        isLogin(){
            axios.check(cookie.getCookie("access_token")).then((data)=>{
                console.log(data)
                if(data.data.code == 200){
                    this.username = data.data.payload.name
                    this.$store.state.username = data.data.payload.name
                }else{
                    this.isCookie = true
                }
            })
        },
        toUser(){
          this.$router.push({path:'/usercenter',query:{user:this.username}})  

        },
        toIndex(){
            this.$router.push({path:'/index'})            
        }
    },
    mounted(){
        this.isLogin()
    },
}
</script>

<style lang="less" scoped>
#top{
        position: absolute;
        width:100%;
        height:25px;
}
    .top{
        background-color: #333;
        text-align:right;
        color:white;
        line-height:25px;
        font-size:16px;
        a{
            color:antiquewhite;
            margin-right:30px;
        }

    }
    .log{
        .link{
            cursor: pointer;
            padding-right:30px;
        }

    }
</style>
