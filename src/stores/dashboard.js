import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";


export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
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
    }
})