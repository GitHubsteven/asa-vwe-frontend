<template>
    <div>
        <label>test blog</label>
        <p>hello, this is test blog from rb.x</p>
        <div>
            <p class="description">where is my cat</p>
            <img src="../img/cat.jpg"/>
        </div>
    </div>
</template>

<script>
  export default {
    name: "blog-view"
  }
</script>

<style type="text/css" scoped>
    .description {
        color: red;
        font-family: "Agency FB",serif;
    }
</style>