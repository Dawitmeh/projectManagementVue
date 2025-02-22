import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";


export const useClientStore = defineStore('clients', {
    state: () => ({
        clients: [],
        currentClient: [],
        isLoading: ref(true),
        notification: {
            show: false,
            type: null,
            message: null
        },
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
        createClient(client) {
            this.isLoading = true
            return axiosClient.post('/clients', client)
                .then((res) => {
                    this.clients = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getClients() {
            this.isLoading = true
            return axiosClient.get('/clients')
                .then((res) => {
                    this.clients = res.data.data
                    this.isLoading = false
                })

        },
        getClient(id) {
            this.isLoading = true
            return axiosClient.get('/clients')
                .then((res) => {
                    this.currentClient = res.data.data
                    this.isLoading = false
                })
        },
        updateClient(client) {
            this.isLoading = true
            return axiosClient.put(`/clients/${client.id}`, client)
                .then((res) => {
                    this.currentClient = res.data.data
                    this.isLoading = false
                })
        },
        deleteClient(id) {
            this.isLoading = true
            return axiosClient.delete(`/clients/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})