import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state:{
        userId:null,
        sideBar:null
    },
    mutations:{
        setUserId(state,id){
            state.userId = id;
        },
        setSideBar(state,sideBar){
            state.sideBar =sideBar;
        }
    },
    actions:{},
    getters:{},
    modules:{}
});

export default store;