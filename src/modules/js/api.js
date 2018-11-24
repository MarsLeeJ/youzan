let url = {
    hotLists: '/index/hotLists',
    bannerLists: '/index/banner',
    topList: '/category/topList',
    subList: '/category/subList',
    rank: '/category/rank',
    searchlist: '/search/list',
    goodsDetails: '/goods/details',
    goodsDeal: '/goods/deal',
    cartAdd: '/cart/add',
    cartUpdate: '/cart/update',
    cartList: '/cart/list',
    cartReduce: '/cart/reduce',
    cartRemove: '/cart/remove',
    cartMremove: '/cart/mrremove',
    addressList: '/address/list',
    addressAdd: '/address/add',
    addressRemove: '/address/remove',
    setDefault: '/address/setDefault',
    addressUpdate: '/address/update'
}

let host = ' https://www.easy-mock.com/mock/5bf915c326597e44f7db426f/youzan'

for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key];
    }
}

export default url