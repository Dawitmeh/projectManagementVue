import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";

export const usePermissionStore = defineStore('permissions', {
    state: () => ({
        permissions: [],
        currentPermission: [],
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
        createPermissions(permissions) {
            this.isLoading = true
            return axiosClient.post('/permissions', permissions)
                .then((res) => {
                    this.permissions = res.data.data
                    this.isLoading = false
                })
        },
        getPermissions() {
            this.isLoading = true
            return axiosClient.get('/permissions')
                .then((res) => {
                    this.permissions = res.data.data
                    this.isLoading = false
                })
        },
        getPermission(id) {
            this.isLoading = true
            return axiosClient.get(`/permissions/${id}`)
                .then((res) => {
                    this.currentPermission = res.data
                    this.isLoading = false
                })
        },
        updatePermission(permission) {
            this.isLoading = true
            return axiosClient.put(`/permissions/${permission.id}`, permission)
                .then((res) => {
                    this.currentPermission = res.data
                    this.isLoading = false
                })
        },
        deletePermission(id) {
            this.isLoading = true
            return axiosClient.delete(`/permissions/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})