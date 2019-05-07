<template>
    <div>
        <table>
            <tbody>
            <tr>
                <td>title</td>
                {{blog.title}}
            </tr>
            <tr>
                <td>context</td>
                {{blog.context}}
            </tr>
            </tbody>
        </table>
        <div class="awful-selfie">
        </div>
    </div>
</template>

<script>

    //引入接口辅助类
    import {ApiService} from '../js/apiSerivce.js'
    //定义一个对象
    const apiService = new ApiService();

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
            viewBlog() {
                apiService.viewBlog().then(resp => {
                    this.blog = resp;
                })
            }
        },
        mounted() {
            this.viewBlog();
        }
    }
</script>
