<template>
  <div class="sidebar">
    <el-menu
        class="sidebar-el-menu"
        :default-active="onRoutes"
        :collapse="collapse"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
        unique-opened
        router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                  v-if="subItem.subs"
                  :index="subItem.index"
                  :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                    v-for="(threeItem,i) in subItem.subs"
                    :key="i"
                    :index="threeItem.index"
                >{{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                  v-else
                  :index="subItem.index"
                  :key="subItem.index"
              >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus';
import {fetchData} from '@/api/sidebar';
import {fetchRoutes} from '@/api/routes';

export default {
  data() {
    return {
      collapse: false,
      query: {'userId': this.$store.state.userId},
      items: []
    };
  },

  methods: {

    getRoutes(){
      let newRoutes = [{
        path: '/404',
        component: '404.vue',
        meta: { title: '404' }
      }];
      fetchRoutes(this.query).then(res=>{
        for (let re of res.routes) {
          newRoutes.push(re);
        }
        this.$store.commit('setRoutes',newRoutes)
        this.$store.commit('setIsAddRoutes',true)
        sessionStorage.setItem("routes",JSON.stringify(newRoutes));
       // console.log("setRoutes",newRoutes)
      });
    },

    getSideBar() {
      if (this.$store.state.sideBar){
        console.log('1-sideBar',this.$store.state.sideBar);
        this.items=this.$store.state.sideBar;
      }else {
        fetchData(this.query).then(res => {
          console.log("2-res", res);
          this.items = res.items;
          this.$store.commit("setSideBar",this.items)
        });
      }
    },
    keepVuexItems(){
      // 在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem('store')) {
        this.$store.replaceState(
            Object.assign(
                {},
                this.$store.state,
                JSON.parse(sessionStorage.getItem('store'))
            )
        )
      }
      // 在页面刷新时将vuex里的信息保存到sessionStorage里
      // beforeunload事件在页面刷新时先触发
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store', JSON.stringify(this.$store.state))
      })
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  },

  created() {
    //console.log("sideBar create")
    this.keepVuexItems();
    console.log("query.userId",this.query.userId)
    this.query.userId= this.$store.state.userId;
    this.getRoutes();
    this.getSideBar();


    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });

  },

  watch:{
    query:function (){

    }
  }

};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}
</style>
