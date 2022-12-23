<template>
    <div>
        <Child :msg="msg" id="childone" @show="show" />
        <button @click="addCount">点击+1：{{ count }}</button>
        <input style="margin-left:30px;" type="text" ref="inputRef" />
        <button @click="updateUser">更新user</button>
        <input v-model="user.uname" />
        <button @click="editUserInfo">修改computed</button>
        <input type="text" v-model="userInfo2">
        <input type="text" v-model="userInfo3">
        <!-- watchEffect -->
        <input type="text" v-model="userInfo4">
    </div>
</template>

<script lang='ts'>
import Child from './child.vue'
export default {
    name: '',
    components: {
        Child,
    },
    setup() {
        const msg = ref('hello,vue3')
        const show = () => {
            console.log('子组件emit的show事件');
        }
        // ref用于定义一个响应式的数据，返回的是一个Ref对象，对象中有一个value属性
        //如果需要对数据进行操作，需要使用该Ref对象的value属性
        const count = ref(0)
        const addCount = () => count.value++
        // 利用ref获取dom节点
        const inputRef = ref(null as any) //解决ts类型“never”上不存在属性“XXX”解决办法
        // 给input框自动聚焦
        onMounted(() => {
            inputRef.value && inputRef.value.focus()
        })
        // reactive
        /**
         * 定义多个数据的响应式，接收一个普通对象然后返回该普通对象的响应式代理器对象(Proxy)，
         * 响应式转换是“深层的”：会影响对象内部所有嵌套的属性,所有的数据都是响应式的。
         */
        const user = reactive({
            uname: '张安',
            age: 18,
            address: '四川省成都市',
            child: {
                uname: '张三',
                age: 1
            }
        })
        const updateUser = () => {
            user.uname = '李四'
        }
        // computed 函数
        // 如果只传入一个回调函数 表示的是get操作
        const userInfo = computed(() => {
            return user.uname + '已经' + user.age + '岁了'
        })
        // 传入一个对象,可以包含set和get函数,进行读取和修改的操作
        const userInfo2 = computed({
            get() {
                return user.uname + '已经' + user.age + '岁了'
            },
            set(val) {
                user.uname = val
            }
        })
        // 修改computed计算属性
        const editUserInfo = () => {
            userInfo2.value = '王五'
        }
        // watch函数
        /*
        * 参数1 要监听的数据 参数2 回调函数 参数3 配置
        */
        const userInfo3 = ref('')
        watch(
            user,
            ({ uname, child }) => {
                userInfo3.value = uname + '的儿子是' + child.uname
            },
            { immediate: true, deep: true }
        )
        /*
        * watch监听多个数据,使用数组
        * 监听非响应式数据的时候需要使用回调函数的形式
        */
        watch([() => user.uname, () => user.address], () => { console.log('watch监听多个执行了') })

        // watchEffect函数:
        /*
        * 不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
        * ，默认初始时就会执行第一次, 从而可以收集需要监视的数据。
        */
        const userInfo4 = ref('')
        watchEffect(() => {
            userInfo4.value = user.uname + '的儿子' + user.child.uname + user.child.age + '岁了'
        })
        return {
            msg,
            show,
            count,
            addCount,
            inputRef,
            user,
            updateUser,
            userInfo,
            userInfo2,
            userInfo3,
            userInfo4,
            editUserInfo,
        }
    },
}

</script>
<style scoped lang='scss'>

</style>