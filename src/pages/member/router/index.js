import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
//component和视频讲的不一样，这里添加了.default
let routes = [{
    path: '/',
    component: require('../components/member.vue').default
}, {
    path: '/address',
    component: require('../components/address.vue').default,
    children: [{
        path: '',
        redirect: 'all'
    }, {
        path: 'all',
        name: 'all',
        component: require('../components/all.vue').default
    }, {
        path: 'form',
        name: 'form',
        component: require('../components/form.vue').default
    }]
}]

let router = new Router({
    routes
})
export default router