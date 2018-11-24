import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'

let {keyword, id} = qs.parse(location.search.substr(1))

new Vue({
    el: '.container',
    data: {
        keyword,
        searchlists: null,
        pageNum: 1,
        pageSize: 8,
        isShow: false
    },
    created(){
        this.getSearchList();
    },
    methods: {
        getSearchList(){
            axios.get(url.searchlist, {
                params:{
                    keyword,
                    id,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }
            }).then(res => {
                this.searchlists = res.data.lists;
            })
        },
        move(){
            if(document.documentElement.scrollTop> 100){
                this.isShow = true
            }else{
                this.isShow = false
            }
        },
        toTop(){
            Velocity(document.body, 'scroll', {duration: 1000})
        }
    },
    mixins: [mixin]
})