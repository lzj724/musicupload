<template>
<div id="masks">
        <div class="bg"></div>
        <img src="../common/img/load.gif" alt="">
        <p>正在上传中，请等待……</p>
    </div>  
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>

#masks{
    position: fixed;
    width:100vw;
    height:100vh;
    background-color:rgba(255,255,255,.9);
    z-index:10;
    top: 0;
    left: 0;
p{
    font-size:28px;
    color:black;
    text-align:center;
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%);
}
img{
    width:100px;
    position: absolute;
     top:30%;
    left:50%;
    transform:translate(-50%);
}
}
</style>
