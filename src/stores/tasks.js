import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";


export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
        currentTask: [],
        isLoading: ref(true),
        errMsg: [],
        notification: {
            show: false,
            type: null,
            message: null
        }
    }),
    getters: {
        //
    },
    actions: {
        notify({message, type}) {
            this.notification.show = true
            this.notification.type = type
            this.notification.message = message
            setTimeout(() => {
                this.notification.show = false
            }, 3000);
        },
        createTask(task) {
            this.isLoading = true
            return axiosClient.post('/tasks', task)
                .then((res) => {
                    this.tasks = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getTasks() {
            this.isLoading = true
            return axiosClient.get('/tasks')
                .then((res) => {
                    this.tasks = res.data.data
                    this.isLoading = false
                })
        },
        getTask(id) {
            this.isLoading = true
            return axiosClient.get(`/tasks/${id}`)
                .then((res) => {
                    this.currentTask = res.data.data
                    this.isLoading = false
                })
        },
        updateTask(task) {
            this.isLoading = true
            return axiosClient.put(`/tasks/${task.id}`, task)
                .then((res) => {
                    this.currentTask = res.data.data
                    this.isLoading = false
                })
        },
        deleteTask(id) {
            this.isLoading = true
            return axiosClient.delete(`/tasks/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})