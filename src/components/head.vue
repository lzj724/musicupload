<template>
  <div id="head">
     <Top></Top>    
      <img src="../common/img/head.png" alt="" @click="toindex()" >
      <h2>欢迎使用XX音乐上传服务V1.0</h2>
  </div>
</template>

<script>
import Top from './top'
export default {
  components:{
      Top
  },
  methods:{
      toindex(){
          this.$router.push({path:'/index'})
      }
  }
}
</script>

<style lang="less" scoped>
#head{
    width:100%;
    height:100px;
    background: #0094ff;
    position: relative;
    top: 0;
    img{
        margin-top:10px;
        position: absolute;
        height: 80%;
        left:100px;
        top:50%;
        transform: translateY(-50%);
    }
    h2{
        text-align: center;
        font-size:40px;
        color:white;
        line-height:110px;
    }

}
</style>
