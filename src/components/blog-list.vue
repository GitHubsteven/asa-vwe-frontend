<template>
    <div>
        <table>
            <thead>
            <tr>
                <th>title</th>
                <th>context</th>
                <th>author</th>
                <th>createTime</th>
                <th>operate</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="blog in blogs" v-bind:key="blog.id">
                <td>{{blog.title}}</td>
                <td>{{blog.context}}</td>
                <td>{{blog.author}}</td>
                <td>{{blog.createTime}}</td>
                <td>
                    <button @click="detail(blog)">Detail</button>
                    <button @click="del(blog)">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    //引入接口辅助类
    import {ApiService} from '../js/apiService.js'
    //定义一个对象
    const apiService = new ApiService();

    // import {ApiService as apiService} from "../js/apiSerivce";

    export default {
        name: "blog-list",
        data() {
            return {
                blogs: [],
                numberOfBlogs: 0
            }
        },
        //定义方法
        methods: {
            getBlogs() {
                //调用接口获取数据，并且更新vue页面数据
                apiService.getBlogs().then((resp) => {
                    console.log(resp);
                    this.blogs = resp;
                    this.numberOfBlogs = resp.length;
                });
            },
            detail(blog) {
                this.$router.push({
                    path: '/blog-view',
                    name: 'BlogView',
                    params: {
                        blogId: blog._id
                    }
                })
            },
            del(blog) {
                apiService.delBlog(blog._id).then(resp => {
                    alert(resp);
                })
            }
        },
        //在vue被渲染的时候调用方法
        mounted() {
            this.getBlogs();
        }
    }
</script>

<style scoped>

</style>