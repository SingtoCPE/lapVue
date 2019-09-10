import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const endpoint = "http://localhost:3000/employee";
const endpointDel = "http://localhost:3000/employee/del";
const endpointAdd = "http://localhost:3000/employee/add";

export const store = new Vuex.Store({
  state: {
    data: [],
    complete:false
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setComplete(state,{ isReset }) {
      state.complete = isReset;
    }
  },
  actions: {
    async fetchData({ commit }) {
      const { data } = await axios({
        method: "get",
        url: endpoint
      });
      console.log({ data });
      commit("setData", data.map(data => data));
    },
    async deleteData({ dispatch }, id) {
      console.log("idAction:", id);
      const { data } = await axios({
        method: "post",
        url: endpointDel,
        data: {
          id
        }
      });
      dispatch("fetchData");
      console.log({ res: data });
    },
    async addData({commit,dispatch},{first_name, age, position, salary, phone}) {
      const { data } = await axios({
        method: "post",
        url: endpointAdd,
        data: {
          first_name,
          age,
          position,
          salary,
          phone
        }
      });
      if({data}){
        commit('setComplete',{isReset:true})
      }
      dispatch("fetchData");
      
    }
  }
});

