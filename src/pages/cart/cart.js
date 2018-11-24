import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'

new Vue({
    el: '.container',
    data: {
        cartList: null,
        total: 0,
        editingShop: null,
        editingShopIndex: -1,
        removePopup: false,
        removeData: null,
        removeMsg: ''
    },
    computed: {
        allSelected: {
            get(){
                if(this.cartList && this.cartList.length){
                    return this.cartList.every(shop => {
                        return shop.checked
                    })
                }
                return false
            },
            set(newVal){
                this.cartList.forEach(shop => {
                    shop.checked = newVal
                    shop.goodsList.forEach(good => {
                        good.checked = newVal
                    })
                })
            }
        },
        allRemoveSelected: {
            get(){
                if(this.editingShop){
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal){
                if(this.editingShop){
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach( good => {
                        good.removeChecked = newVal
                    })
                }
            }
        },
        selectList(){
            if(this.cartList&&this.cartList.length){
                let arr = []
                let total = 0
                this.cartList.forEach(shop => {
                    shop.goodsList.forEach(good => {
                        if(good.checked){
                            arr.push(good)
                            total += good.price * good.number
                        }
                    })
                })
                this.total = total
                return arr
            }
            return []
        },
        removeLists(){
            if(this.editingShop){
                let arr = []
                this.editingShop.goodsList.forEach(good => {
                    if(good.removeChecked){
                        arr.push(good)
                    }
                })
                return arr
            }
            return []
        }

    },
    created(){
        this.getCartList()
    },
    methods: {
        getCartList(){
            axios.get(url.cartList, {}).then(res => {
                let list = res.data.cartList
                list.forEach(shop => {
                    shop.checked = true
                    shop.removeChecked = false
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(goods => {
                        goods.checked = true
                        goods.removeChecked = false
                    })
                })
                this.cartList = list
            })
        },
        selectGood(shop, goods){
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            goods[attr] = !goods[attr]
            shop[attr] = shop.goodsList.every(good => {
                return good[attr]
            })
        },
        selectShop(shop){
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            shop[attr] = !shop[attr];
            shop.goodsList.forEach(good => {
                good[attr] = shop[attr]
            })
        },
        selectAll(){
            let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
            this[attr] = !this[attr]
        },
        edit(shop, shopIndex){
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing ? '完成' : '编辑'
            this.cartList.forEach((item, i) => {
                if(i !== shopIndex){
                    item.editing = false
                    item.editingMsg = shop.editing ? '' : '编辑'
                }
            })
            this.editingShop = shop.editing ? shop: null
            this.editingShopIndex = shop.editing ? shopIndex : -1
        },
        reduce(goods){
            if(goods.number === 1) return 
            axios.post(url.cartReduce, {
                params: {
                    id: goods.id,
                    number: 1
                }
            }).then(res => {
                goods.number--
            })
        },
        add(goods){
            axios.post(url.cartAdd, {
                params: {
                    id: goods.id,
                    number: 1
                }
            }).then(res => {
                goods.number++;
            })
        },
        remove(shop, shopIndex,goods,goodsIndex){
            this.removePopup = true
            this.removeData = {shop, shopIndex,goods,goodsIndex}
            this.removeMsg = '确定要删除该产品吗？'
        },
        removeList() {
            this.removePopup = true
            this.removeMsg = `确定将所选${this.removeLists.length}个商品删除？`
        },
        removeConfirm(){
            if(this.removeMsg === '确定要删除该产品吗？'){
                let {shop, shopIndex,goods,goodsIndex} = this.removeData
                axios.post(url.cartRemove, {
                    params: {
                        id: goods.id
                    }
                }).then(res => {
                    shop.goodsList.splice(goodsIndex, 1)
                    if(!shop.goodsList.length){
                        this.cartList.splice(shopIndex, 1)
                        this.removeShop()
                    }
                    this.removePopup = false
                })
            }else{
                let ids = []
                this.removeLists.forEach(good => {
                    ids.push(good.id)
                })
                axios.post(url.cartMremove, {
                    params: {
                        ids
                    }
                }).then(res => {
                    let arr =[]
                    this.editingShop.goodsList.forEach(good => {
                        let index = this.removeLists.findIndex(item => {
                            return item.id == good.id
                        })
                        if(index === -1) {
                            arr.push(good)
                        }
                    })
                    if(arr.length) {
                        this.editingShop.goodsList = arr
                    }else{
                        this.cartList.splice(this.editingShopIndex, 1)
                        this.removeShop()
                    }
                    this.removePopup = false
                })
            }
        },
        removeShop(){
            this.editingShop = null
            this.editingShopIndex = -1
            this.cartList.forEach(shop => {
                shop.editing = false
                shop.editingMsg = '编辑'
            })
        }
    },
    mixins: [mixin]
})
