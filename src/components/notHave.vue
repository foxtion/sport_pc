
<template>
    <div class="noData">
        <div class="noData-card">
            <div class="noData-img">
                <img src="@/assets/none2.png" alt srcset />
            </div>
            <div class="noData-text">列表空空如也~</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "noHave",
    };
</script>

<style lang="stylus">
.noData {
    text-align: center;
    position: relative;
    height: 500px;
    right :30px;
    border-radius: 4px;

    .noData-img {
        width: 300px;
        margin: 150px auto;

    img {
        width: 100%;
    }
}

.noData-text {
        height: 22px;
        line-height: 22px;
        font-size: 16px;
        color: #b5b5b5;
        margin-top: 12px;
        user-select: none;
        position: absolute;
        top:70px;
        left:60%;
    }
}
</style>