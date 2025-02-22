import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";


export const useActivityStore = defineStore('activity', {
    state: () => ({
        activities: [],
        currentActivity: [],
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
        createActivity(activity) {
            this.isLoading = true
            return axiosClient.post('/activities', activity)
                .then((res) => {
                    this.activities = res.data.data
                    this.isLoading = false
                })
        },
        getActivities() {
            this.isLoading = true
            return axiosClient.get('/activities')
                .then((res) => {
                    this.activities = res.data.data
                    this.isLoading = false
                })
        },
        getActivity(id) {
            this.isLoading = true
            return axiosClient.get(`/activities/${id}`)
                .then((res) => {
                    this.currentActivity = res.data.data
                    this.isLoading = false
                })
        },
        updateActivity(activity) {
            this.isLoading = true
            return axiosClient.put(`/activities/${activity.id}`, activity)
                .then((res) => {
                    this.currentActivity = res.data.data
                    this.isLoading = false
                })
        },
        deleteActivity(id) {
            this.isLoading = true
            return axiosClient.delete(`/activities/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})