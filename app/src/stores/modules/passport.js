
const state = {
  email: '',
  steps: 0
};

// getters are functions
const getters = {
  getEmail (state) {
    return state.email;
  },
  getActivedStep (state) {
    return state.steps;
  },
  getTime (state) {
    return state.time;
  }
};

const mutations = {
  updateEmail (state, value) {
    state.email = value;
  },
  updateSteps (state, value) {
    state.steps = value;
  }
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  // updateEmail: ({ commit }) => commit('updateEmail'),
  updateSteps: ({ commit }) => commit('updateSteps')
};

export default {
  state,
  getters,
  actions,
  mutations
};
