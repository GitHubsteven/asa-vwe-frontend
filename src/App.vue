<template>
    <div>
        <navigator name="webpack"></navigator>
        <p>
            webpack----pack .vue to main.js---->index.html import main.js------->display
        </p>
        <div>
            <hello-component name="vue"/>
        </div>
    </div>
</template>

<script>
    import HelloComponent from './components/HelloComponent.vue'
    import Navigator from './components/Navigator.vue'

    export default {
        name: "App",
        components: {
            HelloComponent,
            Navigator
        }
    }
</script>

<style scoped>

</style>