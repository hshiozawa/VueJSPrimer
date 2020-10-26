<template>
  <div>
    <h2>タスク一覧</h2>
    <ul>
      <li v-for="task in tasks" v-bind:key="task.id">
        <label>
          <input type="checkbox" v-bind:checked="task.done" v-on:change="toggleTaskStatus(task)">
          : {{ task.name }}
          -
          <span v-for="labelId in task.labelIds" v-bind:key="labelId">
            {{ getLabelText(labelId) }}
          </span>
        </label>
      </li>
    </ul>

    <form v-on:submit.prevent="addTask">
      <input type="text" v-model="newTaskName" placeholder="新しいタスク">
    </form>

    <h2>ラベル一覧</h2>
    <ul>
      <li v-for="label in labels" v-bind:key="label.id">
        <input type="checkbox" v-bind:value="label.id"
               v-model="newTaskLabelIds">
        {{ label.text }}
      </li>
    </ul>

    <form v-on:submit.prevent="addLabel">
      <input type="text" v-model="newLabelName" placeholder="新しいラベル">
    </form>

    <h2>ラベルでフィルタ</h2>
    <ul>
      <li v-for="label in labels" v-bind:key="label.id">
        <label>
          <input type="radio" v-bind:checked="label.id === filter"
                 v-on:change="changeFilter(label.id)">
          {{ label.text }}
        </label>
      </li>
      <li>
        <label>
          <input type="radio" v-bind:checked="filter === null"
                 v-on:change="changeFilter(null)">
          指定なし
        </label>
      </li>
    </ul>

    <h2>保存と復元</h2>
    <button type="button" v-on:click="save()">保存</button>
    <button type="button" v-on:click="restore()">復元</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTaskName: '',
      newLabelName: '',
      newTaskLabelIds: [],
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.filteredTasks;
    },
    labels() {
      return this.$store.state.labels;
    },
    filter() {
      return this.$store.state.filter;
    }
  },
  methods: {
    toggleTaskStatus(task) {
      this.$store.commit('toggleTaskStatus', {
        id: task.id
      });
    },
    addTask() {
      this.$store.commit('addTask', {
        name: this.newTaskName,
        labelIds: this.newTaskLabelIds
      });
      this.newTaskName = '';
      this.newTaskLabelIds = [];
    },
    addLabel() {
      this.$store.commit('addLabel', {
        text: this.newLabelName,
      });
      this.newLabelName = '';
    },
    getLabelText(labelId) {
      const label = this.$store.state.labels.find(
          (label) => label.id === labelId
      );
      return label.text ? label.text : 'NOT_FIND';
    },
    changeFilter(filter) {
      this.$store.commit('changeFilter', {
        filter
      });
    },
    save() {
      this.$store.dispatch('save');
    },
    restore() {
      this.$store.dispatch('restore');
    }
  }
}
</script>