<template>
    <div>
        <navigator name="webpack"></navigator>
    </div>
</template>

<script>
  import Navigator from './components/Navigator.vue'
  import router from './router/index.js'

  export default {
    name: "App",
    components: {
      Navigator
    },
    router
  }
</script>

<style scoped>

</style>