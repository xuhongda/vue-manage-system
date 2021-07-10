import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state:{
        userId:'123'
    },
    mutations:{
        setUserId(state,id){
            state.userId = id;
        }
    },
    actions:{},
    getters:{},
    modules:{}
});

export default store;