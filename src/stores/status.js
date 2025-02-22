import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";


export const useStatusStore = defineStore('status', {
    state: () => ({
        statuses: [],
        currentStatus: [],
        isLoading: ref(true),
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
        createStatus(status) {
            this.isLoading = true
            return axiosClient.post('/status', status)
                .then((res) => {
                    this.statuses = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getStatuses() {
            this.isLoading = true
            return axiosClient.get('/status')
                .then((res) => {
                    this.statuses = res.data.data
                    this.isLoading= false
                })
        },
        getStatus(id) {
            this.isLoading = true
            return axiosClient.get(`/status/${id}`)
                .then((res) => {
                    this.currentStatus = res.data
                    this.isLoading = false
                })
        },
        updateStatus(status) {
            this.isLoading = true
            return axiosClient.put(`/status/${status.id}`, status)
                .then((res) => {
                    this.currentStatus = res.data.data
                    this.isLoading = false
                })
        },
        deleteStatus(id) {
            this.isLoading = true
            return axiosClient.delete(`/status/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})