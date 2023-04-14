import HelloWorld from './HelloWorld.vue'
export default {
  install(app: any) {
    app.component('HelloWorld', HelloWorld)
  }
}
