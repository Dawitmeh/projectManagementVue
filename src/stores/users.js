import { defineStore } from "pinia"
import { ref } from "vue"
import axiosClient from "../../axios/axiosClient" 


export const useUserStore = defineStore('users', {
    state: () => ({
        user: {
            data: JSON.parse(sessionStorage.getItem('USER_DATA')) || {},
            token: sessionStorage.getItem('TOKEN') || null, // Restore token
        },
        errMsg: [],
        notification: {
            show: false,
            type: null,
            message: null
        },
        isLoading: ref(true),
        staffs: [],
        currentStaff: []
    }),
    getters: {
        isAuthenticated: (state) => !!state.user.token,
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
        register(admin) {
            return axiosClient.post('/register', admin)
                .then(({data}) => {
                    this.user.data = data.user
                    this.user.token = data.token
                    sessionStorage.setItem('TOKEN', data.token)
                    sessionStorage.setItem('USER_DATA', JSON.stringify(data.user))
                })
        },
        login(admin) {
            return axiosClient.post('/login', admin)
                .then(({ data }) => {
                    this.user.data = data.user
                    this.user.token = data.token
                    sessionStorage.setItem('TOKEN', data.token)
                    sessionStorage.setItem('USER_DATA', JSON.stringify(data.user))
                })
                .catch((err) => {
                    this.errMsg = err.response.data ? err.response.data : "Access denied. Admin role required.";
                    setTimeout(() => {
                        this.errMsg = false;
                    }, 3000);
                })
        },
        logout() {
            // Clear user data and token
            this.user.data = {};
            this.user.token = null;
            
            //Remove stored session data
            sessionStorage.removeItem('TOKEN');
            sessionStorage.removeItem('USER_DATA');
        },
        createUsers(staffs) {
            this.isLoading = true
            return axiosClient.post('/users', staffs)
                .then((res) => {
                    this.staffs = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getUsers() {
            this.isLoading = true
            return axiosClient.get('/users')
                .then((res) => {
                    this.staffs = res.data.data
                    this.isLoading = false
                })
        },
        getUser(id) {
            this.isLoading = true
            return axiosClient.get(`/users/${id}`)
                .then((res) => {
                    this.currentStaff = res.data
                    this.isLoading = false
                })
        },
        updateUser(staff) {
            this.isLoading = true
            return axiosClient.put(`/users/${staff.id}`, staff)
                .then((res) => {
                    this.currentStaff = res.data.data
                    this.isLoading = false
                })
        },
        deleteUser(id) {
            this.isLoading = true
            return axiosClient.delete(`/users/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})