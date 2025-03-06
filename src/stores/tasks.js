import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    currentTask: [],
    isLoading: ref(true),
    errMsg: [],
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
    async createTask(task) {
      this.isLoading = true;
      try {
        const res = await axiosClient.post("/tasks", task);
        this.tasks = res.data.data;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getTasks() {
      this.isLoading = true;
      const res = await axiosClient.get("/tasks");
      this.tasks = res.data.data;
      this.isLoading = false;
    },
    async getTask(id) {
      this.isLoading = true;
      try {
        const res = await axiosClient.get(`/tasks/${id}`);
        console.log("Fetched Task:", res.data.data);
        this.currentTask = res.data.data || {};
      } catch (err) {
        console.error(
          "Error fetching task:",
          err.response?.data || err.message
        );
        this.errMsg = err.response?.data?.message || "Failed to fetch task.";
      } finally {
        this.isLoading = false;
      }
    },

    async updateTask(task) {
      this.isLoading = true;
      const res = await axiosClient.put(`/tasks/${task.id}`, task);
      this.currentTask = res.data.data;
      this.isLoading = false;
    },
    async deleteTask(id) {
      this.isLoading = true;
      const res = await axiosClient.delete(`/tasks/${id}`);
      this.isLoading = false;
    },
  },
});
