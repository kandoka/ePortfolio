import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'
import AboutMeEditor from "../views/home/AboutMeEditor";
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/aboutmeeditor',
            component: AboutMeEditor
        }
    ]
})

//挂载路由导航守卫
router.beforeEach(((to, from, next) => {
    //to 将要访问的页面
    //from 从哪个页面跳转而来
    //next 是一个函数表示放行
    if(to.path === '/login') return next();
    //获取token
    // const token = window.sessionStorage.getItem('token');
    // if(!token) return next('/login');
    next();
}))

export default router
