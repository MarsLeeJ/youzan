import 'css/common.css'
import './index.css'
import Vue from 'vue'

import url from 'js/api.js'
import axios from 'axios'

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import mixin from 'js/mixin.js'
import Swipe from 'components/Swipe.vue'

let app = new Vue({
    el: '#app',
    data: {
        lists: null,
        pageNum: 1,
        pageSize: 6,
        loading: false,
        allLoaded: false,
        bannerLists: null
    },
    created() {
        this.getLists();
        this.getBanner();
    },
    methods: {
        getLists() {
            if (this.allLoaded) return
            this.loading = true;
            axios.get(url.hotLists, {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }
            }).then(res => {
                let curLists = res.data.lists;
                if (curLists.length < this.pageSize) {
                    this.allLoaded = true;
                }
                if (this.lists) {
                    this.lists = this.lists.concat(curLists)
                } else {
                    this.lists = curLists
                }
                this.loading = false;
                this.pageNum++;
            })
        },
        getBanner(){
            axios.get(url.bannerLists).then(res => {
                this.bannerLists = res.data.lists;
            })
        }
    },
    components: {
        Swipe: Swipe
    },
    mixins: [mixin]
})
