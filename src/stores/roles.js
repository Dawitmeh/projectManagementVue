import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";


export const useRoleStore = defineStore('roles', {
    state: () => ({
        roles: [],
        currentRole: [],
        roleUsers: [],
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
        createRole(role) {
            this.isLoading = true
            return axiosClient.post('/roles', role)
                .then((res) => {
                    this.roles = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getRoles() {
            this.isLoading = true
            return axiosClient.get('/roles')
                .then((res) => {
                    this.roles = res.data.data
                    this.isLoading = false
                })
        },
        getRole(id) {
            this.isLoading = true
            return axiosClient.get(`/roles/${id}`)
                .then((res) => {
                    console.log(res)
                    this.currentRole = res.data.data.role
                    this.roleUsers = res.data.data.users
                    this.isLoading = false
                })
        },
        updateRoles(role) {
            this.isLoading = true
            return axiosClient.put(`/roles/${role.id}`, role)
                .then((res) => {
                    this.currentRole = res.data
                    this.isLoading = false
                })
        },
        deleteRole(id) {
            this.isLoading = true
            return axiosClient.delete(`/roles/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})