import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const endpoint = "http://localhost:3000/employee";
const endpointDel = "http://localhost:3000/employee/del";

export const store = new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    setData(state, data) {
      state.data = data;
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
    async deleteData({dispatch}, id) {
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
    }
  }
});
