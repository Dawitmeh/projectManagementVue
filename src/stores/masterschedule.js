import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";

export const useScheduleStore = defineStore('schedule', {
    state: () => ({
        schedules: [],
        currentSchedule: [],
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
        createSchedule(schedule) {
            this.isLoading = true
            return axiosClient.post('/schedules', schedule)
                .then((res) => {
                    this.schedules = res.data.data
                    this.isLoading = false
                })
        },
        getSchedules() {
            this.isLoading = true
            return axiosClient.get('/schedules')
                .then((res) => {
                    this.schedules = res.data.data
                    this.isLoading = false
                })
        },
        getSchedule(id) {
            this.isLoading = true
            return axiosClient.get(`/schedules/${id}`)
                .then((res) => {
                    this.currentSchedule = res.data.data
                    this.isLoading = false
                })
        },
        updateSchedule(schedule) {
            this.isLoading = true
            return axiosClient.put(`/schedules/${schedule.id}`, schedule)
                .then((res) => {
                    this.currentSchedule = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        deleteSchedule(id) {
            this.isLoading = true
            axiosClient.delete(`/schedules/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})