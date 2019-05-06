<template>
    <div>
        <p>
            <router-link to="/blog-list">blog list</router-link>
            <router-link to="/blog-view">blog view</router-link>
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
