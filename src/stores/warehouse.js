import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";


export const useWarehouseStore = defineStore('warehouse', {
    state: () => ({
        warehouses: [],
        currentWarehouse: [],
        isLoading: ref(true),
        notification: {
            show: false,
            type: null,
            message: null
        },
        managers: []
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
        createWarehouse(warehouse) {
            this.isLoading = true
            return axiosClient.post('/warehouse', warehouse)
                .then((res) => {
                    this.warehouses = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getWarehouses() {
            this.isLoading = true
            return axiosClient.get('/warehouse')
                .then((res) => {
                    this.warehouses = res.data.data
                    this.managers = res.data.managers
                    this.isLoading = false
                })
        },
        getWarehouse(id) {
            this.isLoading = true
            return axiosClient.get(`/warehouse/${id}`)
                .then((res) => {
                    this.currentWarehouse = res.data.data
                    this.isLoading = false
                })
        },
        updateWarehouse(warehouse) {
            this.isLoading = true
            return axiosClient.put(`/warehouse/${warehouse.id}`, warehouse)
                .then((res) => {
                    this.currentWarehouse = res.data.data
                    this.isLoading = false
                })
        },
        deleteWarehouse(id) {
            this.isLoading = true
            return axiosClient.delete(`/warehouse/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})