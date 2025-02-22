import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";


export const usePirorityStore = defineStore('pirority', {
    state: () => ({
        pirorities: [],
        currentPirority: [],
        isLoading: ref(false),
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
        createPirority(pirority) {
            this.isLoading = true
            return axiosClient.post('/pirorities', pirority)
                .then((res) => {
                    this.pirorities = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getPirorities() {
            this.isLoading = true
            return axiosClient.get('/pirorities')
                .then((res) => {
                    this.pirorities = res.data.data
                    this.isLoading = false
                })
        },
        getPirority(id) {
            this.isLoading = true
            return axiosClient.get(`/pirorities/${id}`)
                .then((res) => {
                    this.currentPirority = res.data
                    this.isLoading = false
                })
        },
        updatePirority(pirority) {
            this.isLoading = true
            return axiosClient.put(`/pirorities/${pirority.id}`, pirority)
                .then((res) => {
                    this.currentPirority = res.data.data
                    this.isLoading = false
                })
        },
        deletePirority(id) {
            this.isLoading = true
            return axiosClient.delete(`/pirorities/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})