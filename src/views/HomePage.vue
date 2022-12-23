<template>
    <div>This is toolsdog home page!</div>
    <a-space>
        <a-button type="primary" size="mini" @click="handleClickMini">Mini</a-button>
        <a-button type="primary" size="small">Small</a-button>
        <a-button type="primary">Medium</a-button>
        <a-button type="primary" size="large">Large</a-button>
    </a-space>
    <!-- 这里 -->
    <HelloWorld />
    <!-- 使用icones的图标，Iconify IntelliSense vscode插件支持在代码中预览图标 -->
    <icon-teenyicons-area-chart-solid />
    <!-- 使用自定义图标 -->
    <icon-home-table class="" />
    <icon-user-user />
</template>

<script setup lang='ts'>
const handleClickMini = () => {
    AMessage.info('hello isboyjc, click mini AButton!')
};

</script>
<style scoped lang='less'>

</style>