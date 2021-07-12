import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "@/store";

Vue.use(VueRouter);

export let children = [

    {
        path: '/dashboard',
        component: () => import('@/views/home/Dashboard.vue'),
        meta: { "title": '系统首页' }
    },
    {
        path: '/404',
        component: () => import('@/views/404.vue'),
        meta: { title: '404' }
    }
   /* {
        path: '/dashboard',
        component: () => import('@/views/home/Dashboard.vue'),
        meta: { title: '系统首页' }
    },
    {
        path: '/icon',
        component: () => import('@/components/page/Icon.vue'),
        meta: { title: '自定义图标' }
    },
    {
        path: '/oms',
        component: () => import( '@/views/oms/Index'),
        meta: { title: '商场首页' }
    },

    {
        path: '/car',
        component: () => import( '@/views/oms/Car'),
        meta: { title: '汽车' }
    },
    {
        path: '/phone',
        component: () => import( '@/views/oms/Phone'),
        meta: { title: '手机' }
    },
    {
        path: '/table',
        component: () => import('@/components/page/BaseTable.vue'),
        meta: { title: '基础表格' }
    },
    {
        path: '/tabs',
        component: () => import('@/components/page/Tabs.vue'),
        meta: { title: '消息中心' }
    },
    {
        path: '/form',
        component: () => import('@/components/page/BaseForm.vue'),
        meta: { title: '基本表单' }
    },
    {
        // 富文本编辑器组件
        path: '/editor',
        component: () => import('@/components/page/VueEditor.vue'),
        meta: { title: '富文本编辑器' }
    },
    {
        // markdown组件
        path: '/markdown',
        component: () => import('@/components/page/Markdown.vue'),
        meta: { title: 'markdown编辑器' }
    },
    {
        // 图片上传组件
        path: '/upload',
        component: () => import('@/components/page/Upload.vue'),
        meta: { title: '文件上传' }
    },
    {
        // vue-schart组件
        path: '/charts',
        component: () => import('@/components/page/BaseCharts.vue'),
        meta: { title: 'schart图表' }
    },
    {
        // 拖拽列表组件
        path: '/drag',
        component: () => import('@/components/page/DragList.vue'),
        meta: { title: '拖拽列表' }
    },
    {
        // 拖拽Dialog组件
        path: '/dialog',
        component: () => import('@/components/page/DragDialog.vue'),
        meta: { title: '拖拽弹框' }
    },
    {
        // 国际化组件
        path: '/i18n',
        component: () => import('@/components/page/I18n.vue'),
        meta: { title: '国际化' }
    },
    {
        // 权限页面
        path: '/permission',
        component: () => import('@/components/page/Permission.vue'),
        meta: { title: '权限测试', permission: true }
    },
    {
        path: '/404',
        component: () => import('@/components/page/404.vue'),
        meta: { title: '404' }
    },
    {
        path: '/403',
        component: () => import('@/components/page/403.vue'),
        meta: { title: '403' }
    },
    {
        path: '/donate',
        component: () => import('@/components/page/Donate.vue'),
        meta: { title: '支持作者' }
    }*/
]

export let routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
        meta: { title: '自述文件' },
        children
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/Index'),
        meta: { title: '登录' }
    },

    {
        path: '*',
        redirect: '/404'
    }
]

const  router = new VueRouter({
    routes, // routes 名称固定
    /* mode:'history',*/
   /* linkActiveClass:'active'*/
})

function creatRoutes(){
    let item = sessionStorage.getItem("routes");
    if (item != null){
        console.log('--- routes ---',routes);
        let parse = JSON.parse(item);
        children=[];
        parse.forEach(item=>{
            children.push({
                path: item.path,
                component: () => import("@/views/"+item.component),
                meta: { "title": item.meta.title }
            })
        });
        routes[1].children=children
        router.addRoutes(routes)
    }
}
//页面刷新保持 routes
creatRoutes();

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    console.log('--- beforeEach',to.path);

    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    const token = sessionStorage.getItem('token');
    if (!token && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});


router.afterEach(()=>{
    console.log('afterEach')
    creatRoutes();
})

export default router;
