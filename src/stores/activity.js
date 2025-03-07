import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";

export const useActivityStore = defineStore("activity", {
  state: () => ({
    activities: [],
    currentActivity: [],
    isLoading: ref(false),
    notification: {
      show: false,
      type: null,
      message: null,
    },
  }),
  getters: {
    //
  },
  actions: {
    notify({ message, type }) {
      this.notification.show = true;
      this.notification.type = type;
      this.notification.message = message;
      setTimeout(() => {
        this.notification.show = false;
      }, 3000);
    },
    async createActivity(activity) {
      this.isLoading = true;
      const res = await axiosClient.post("/activities", activity);
      this.activities = res.data.data;
      this.isLoading = false;
    },
    async getActivities() {
      this.isLoading = true;
      const res = await axiosClient.get("/activities");
      this.activities = res.data.data;
      this.isLoading = false;
    },
    async getActivity(id) {
      this.isLoading = true;
      const res = await axiosClient.get(`/activities/${id}`);
      this.currentActivity = res.data.data;
      this.isLoading = false;
    },
    async updateActivity(activity) {
      this.isLoading = true;
      const res = await axiosClient.put(`/activities/${activity.id}`, activity);
      this.currentActivity = res.data.data;
      this.isLoading = false;
    },
    async deleteActivity(id) {
      this.isLoading = true;
      const res = await axiosClient.delete(`/activities/${id}`);
      this.isLoading = false;
    },
  },
});
