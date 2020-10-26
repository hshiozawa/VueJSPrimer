import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    actions: {
        save({state}) {
            const data = {
                nextTaskId: state.nextTaskId,
                nextLabelId: state.nextLabelId,
                tasks: state.tasks,
                labels: state.labels
            };
            localStorage.setItem('task-app-data', JSON.stringify(data));
        },
        restore({commit}) {
            const data = localStorage.getItem('task-app-data');
            if (data) {
                commit('restore', JSON.parse(data));
            }
        }
    },
    state: {
        nextTaskId: 3,
        tasks: [
            {
                id: 1,
                name: '牛乳を買う',
                done: false,
                labelIds: [1, 2]
            },
            {
                id: 2,
                name: 'Vue.js の本を買う',
                done: true,
                labelIds: [1, 3]
            }
        ],
        nextLabelId: 4,
        labels: [
            {
                id: 1,
                text: '買い物'
            },
            {
                id: 2,
                text: '食料'
            },
            {
                id: 3,
                text: '本'
            }
        ],
        filter: null
    },

    mutations: {
        addLabel(state, {text}) {
            const newLabel = {
                id: state.nextLabelId++,
                text
            };
            state.labels.push(newLabel);
        },
        addTask(state, {name, labelIds}) {
            const newTask = {
                id: state.nextTaskId++,
                name,
                done: false,
                labelIds
            }
            state.tasks.push(newTask);
        },
        toggleTaskStatus(state, payload) {
            const task = state.tasks.find(task => task.id === payload.id);
            if (task !== undefined) {
                task.done = !task.done;
            }
        },
        changeFilter(state, {filter}) {
            state.filter = filter;
        },
        restore(state, {tasks, labels, nextTaskId, nextLabelId}) {
            window.console.log(tasks);
            state.tasks = tasks;
            state.labels = labels;
            state.nextTaskId = nextTaskId;
            state.nextLabelId = nextLabelId;
        }
    },

    getters: {
        filteredTasks(state) {
            if (state.filter === null) {
                return state.tasks;
            }

            const filteredTasks = state.tasks.filter(
                task => task.labelIds.some(labelId => labelId === state.filter));
            return filteredTasks;
        }
    }

});


export default store;
