<template>
  <div id="app">
    <child></child>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import Child from './child';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment(state, amount) {
      state.count += amount;
    }
  }
});

export default {
  data() {
    return {
      sample: 1
    }
  },
  components: {
    Child
  },
  store: store
}
</script>