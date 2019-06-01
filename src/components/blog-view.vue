<template>
    <div>
        <p>Blog View</p>
        <h3>{{this.blog.title}}</h3>
        <div v-html="this.blog.context"></div>
    </div>
</template>

<script>
    //引入接口辅助类
    import {ApiService} from '../js/apiService.js'
    //定义一个对象
    const apiService = new ApiService();

    import {Converter} from 'showdown';

    const converter = new Converter();

    export default {
        name: "blog-view",
        data() {
            return {
                blog: {
                    title: "blog-title",
                    context: "blog-context"
                }
            }
        },
        methods: {
            init() {
                let id = this.$route.params.blogId;
                apiService.viewBlog(id).then(resp => {
                    console.log(resp);
                    this.blog.title = resp.title;
                    this.blog.context = converter.makeHtml(resp.context);
                })
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
