import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      firstName: "Ashley",
      lastName: "Wong",
    },
    inventory: {
      ordersThisMonth: 2736,
      averageMonthlyShipments: 364,
      inventoryTotal: 400,
    },
  },
  mutations: {},
  actions: {},
  getters: {
    username({ user: { firstName, lastName } }) {
      return `${firstName} ${lastName}`;
    },
  },
  modules: {},
});
