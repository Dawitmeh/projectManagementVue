import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";


export const useSiteStore = defineStore('sites', {
    state: () => ({
        sites: [],
        currentSite: [],
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
        createSite(site) {
            this.isLoading = true
            return axiosClient.post('/sites', site)
                .then((res) => {
                    this.sites = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getSites() {
            this.isLoading = true
            return axiosClient.get('/sites')
                .then((res) => {
                    this.sites = res.data.data
                    this.isLoading = false
                })
        },
        getSite(id) {
            this.isLoading = true
            return axiosClient.get(`/sites/${id}`)
                .then((res) => {
                    this.currentSite = res.data
                    this.isLoading = false
                })
        },
        updateSite(site) {
            this.isLoading = true
            return axiosClient.put(`/sites/${site.id}`, site)
                .then((res) => {
                    this.currentSite = res.data
                    this.isLoading = false
                })
        },
        deleteSite(id) {
            this.isLoading = true
            return axiosClient.delete(`/sites/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }

    }
})