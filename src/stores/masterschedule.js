import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    schedules: [],
    currentSchedule: [],
    isLoading: ref(true),
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
    async createSchedule(schedule) {
      this.isLoading = true;
      const res = await axiosClient.post("/schedules", schedule);
      this.schedules = res.data.data;
      this.isLoading = false;
    },
    async getSchedules() {
      this.isLoading = true;
      const res = await axiosClient.get("/schedules");
      this.schedules = res.data.data;
      this.isLoading = false;
    },
    async getSchedule(id) {
      this.isLoading = true;
      const res = await axiosClient.get(`/schedules/${id}`);
      this.currentSchedule = res.data.data;
      this.isLoading = false;
    },
    async updateSchedule(schedule) {
      this.isLoading = true;
      try {
        const res = await axiosClient.put(
          `/schedules/${schedule.id}`,
          schedule
        );
        this.currentSchedule = res.data.data;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    deleteSchedule(id) {
      this.isLoading = true;
      axiosClient.delete(`/schedules/${id}`).then((res) => {
        this.isLoading = false;
      });
    },
  },
});
