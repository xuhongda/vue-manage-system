import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state:{
        userId:null,
        sideBar:null,
        routes:null,
        isAddRoutes: false
    },
    mutations:{
        setUserId(state,id){
            state.userId = id;
        },
        setSideBar(state,sideBar){
            state.sideBar =sideBar;
        },
        setRoutes(state,routes){
            state.routes =routes;
        },
        setIsAddRoutes(state,flag){
            state.isAddRoutes = flag;
        }
    },
    actions:{},
    getters:{},
    modules:{}
});

export default store;