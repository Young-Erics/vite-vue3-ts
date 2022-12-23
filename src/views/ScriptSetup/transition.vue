<template>
  <div>
    <div class="app">
      <div><button @click="isShow = !isShow">显示/隐藏</button></div>

      <transition
        name="why"
        mode="out-in"
        type="transition"
        :duration="{ enter: 800, leave: 1000 }"
      >
        <h2 class="title" v-if="isShow">Hello World</h2>
        <h2 class="title" v-else>你好哇，林银河</h2>
      </transition>
      <transition name="fade" appear>
        <h1 class="title" v-if="isShow">褪去</h1>
      </transition>
      <!-- 使用animate.css -->
      <transition name="an" appear>
        <h1 class="title">animate</h1>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
let isShow = ref(true)
</script>

<style lang="scss" scoped>
.app {
  width: 200px;
  margin: 0 auto;
}

.title {
  display: inline-block;
}
// 同时设置过渡和动画
.why-enter-from,
.why-leave-to {
  opacity: 0;
}

.why-enter-active,
.why-leave-active {
  transition: opacity 1s ease;
}
// 结合动画使用
.why-enter-active {
  animation: bounce 1s ease;
}

.why-leave-active {
  animation: bounce 1s ease reverse;
}
@keyframes bounce {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
// 淡去,过渡
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

// animate.css
.an-enter-active {
  animation: flip 2s ease;
}
.an-leave-active {
  animation: flip 2s ease reverse;
}
</style>
