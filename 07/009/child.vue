<template>
  <div class="child">
    <p> {{ value }}</p>
    <p> {{ double }}</p>
    <button v-on:click="increment(1)">+1</button>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  /*
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  methods: {
    increment(amount) {
      return this.$store.commit('increment', {amount: amount});
    }
  }
   */
  computed: {
    double() {
      return this.value * 2;
    },
    ...mapState({
      value: 'count'
    })
  },
  methods: mapMutations([
    'increment'
  ])
}
</script>
