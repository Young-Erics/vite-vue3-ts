<template>
    <div>
        <h2>子组件</h2>
        <h3>msg:{{ msg }}</h3>
        <button @click="emitFn">emit事件</button>
    </div>
</template>

<script lang='ts'>
// defineComponent函数,目的是定义一个组件 内部可以传入一个配置对象
export default defineComponent({
    name: 'Child', //组件名字
    props: ['msg'],
    setup(props, { attrs, slots, emit }) {
        console.log('props:', props)
        console.log('attrs:', attrs)
        const emitFn = () => {
            emit('show')
        }
        return {
            emitFn
        }
    }
})

</script>
<style scoped lang='scss'>

</style>