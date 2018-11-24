import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'

new Vue({
    el: '#app',
    data: {
        topList: null,
        topIndex: 0,
        subData: null,
        rankData: null
    },
    created(){
        this.getTopList()
        this.getSubList(0)
    },
    methods: {
        getTopList(){
            axios.get(url.topList,{}).then(res => {
                this.topList = res.data.lists
            })
        },
        getSubList(index, id){
            this.topIndex = index
            if(index == 0){
                this.getRankList();
            }else{
                axios.get(url.subList,{
                    params: {
                        id
                      }
                }).then(res => {
                    this.subData = res.data.data
                })
            }
            
        },
        getRankList(){
            axios.get(url.rank).then(res => {
                this.rankData = res.data.data
            })
        },
        toSearch(list){
            location.href = `search.html?keyword=${list.name}&id=${list.id}`
        }
    },
    mixins: [mixin]
})