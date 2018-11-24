<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for='list in lists'>
            <a class="js-no-follow" v-bind:href="list.clickUrl">
                <img class="goods-main-photo fadeIn" v-bind:src="list.img">
            </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<style>
.swiper-slide img {
    height: 100%;
    width: 100%;
}
</style>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.css'
    //swiper对DOM节点进行操作的，dom节点什么时候生成？
    export default {
        name: 'swipe',
        props: {
            lists: {
                type: Array,
                required: true
            }
        },
        mounted(){
            new Swiper('.swiper-container', {
                loop: true,
                pagination:{
                    el: '.swiper-pagination',
                    clickable: true,
                },
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                }
            })
        }
    }
</script>