<template>
    <div>
        <p>
            <router-link to="/blog-list">list blog</router-link>
            <router-link to="/blog-view">view blog</router-link>
            <router-link to="/blog-add">add blog</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>

<script>
  // import router from '../router/index.js'

  export default {
    name: "Navigator",
    props: {
      name: {
        type: String,
        required: true
      }
    },
    // router
  }
</script>
