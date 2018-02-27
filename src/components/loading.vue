<template lang="html">
    <div class="loading">
        <span class="fa fa-circle-o-notch"></span>
    </div>
</template>
<script>

</script>
<style  lang="less" scoped>

    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        span {
            font-size: 35px;
            color: red;
            animation: circle 1s infinite cubic-bezier(.55, 0, .1, 1);
        }
        @keyframes circle {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
</style>