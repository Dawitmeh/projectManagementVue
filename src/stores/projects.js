import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";


export const useProjectStore = defineStore('projects', {
    state: () => ({
        projects: [],
        currentProject: [],
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
        createProjects(project) {
            this.isLoading = true
            return axiosClient.post('/projects', project)
                .then((res) => {
                    this.projects = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getProjects() {
            this.isLoading = true
            return axiosClient.get('/projects')
                .then((res) => {
                    this.projects = res.data.data
                    this.isLoading = false
                })
        },
        getProject(id) {
            this.isLoading = true
            return axiosClient.get(`/projects/${id}`)
                .then((res) => {
                    this.currentProject = res.data.data
                    this.isLoading = false
                })
        },
        updateProject(id) {
            this.isLoading = true
            return axiosClient.put(`/projects/${id}`)
                .then((res) => {
                    this.currentProject = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        deleteProject(id) {
            this.isLoading = true
            return axiosClient.delete(`/projects/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})