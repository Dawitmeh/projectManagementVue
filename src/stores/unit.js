import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient  from "../../axios/axiosClient";



export const useUnitStore = defineStore('units', {
    state: () => ({
        units: [],
        currentUnit: [],
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
        createUnit(unit) {
            this.isLoading = true
            return axiosClient.post('/units', unit)
                .then((res) => {
                    this.units = res.data.data
                    this.isLoading = false
                })
        },
        getUnits() {
            this.isLoading = true
            return axiosClient.get('/units')
                .then((res) => {
                    this.units = res.data.data
                    this.isLoading = false
                })
        },
        getUnit(id) {
            this.isLoading = true
            return axiosClient.get(`/units/${id}`)
                .then((res) => {
                    this.currentUnit = res.data.data
                    this.isLoading = false
                })
        },
        updateUnit(unit) {
            this.isLoading = true
            return axiosClient.put(`/units/${unit.id}`, unit)
                .then((res) => {
                    this.currentUnit = res.data.data
                    this.isLoading = false
                })
        },
        deleteUnit(id) {
            this.isLoading = true
            return axiosClient.delete(`/units/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})