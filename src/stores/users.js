import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";

export const useUserStore = defineStore("users", {
  state: () => ({
    user: {
      data: JSON.parse(sessionStorage.getItem("USER_DATA")) || {},
      token: sessionStorage.getItem("TOKEN") || null, 
    },
    errMsg: [],
    notification: {
      show: false,
      type: null,
      message: null,
    },
    isLoading: ref(true),
    staffs: [],
    currentStaff: [],
  }),
  getters: {
    isAuthenticated: (state) => !!state.user.token,
  },
  actions: {
    notify({ message, type }) {
      this.notification.show = false;
      setTimeout(() => {
        this.notification.show = true;
        this.notification.type = type;
        this.notification.message = message;
      }, 100);
    },
    async register(admin) {
      try {
        const { data } = await axiosClient.post("/register", admin);
        this.user.data = data.user;
        this.user.token = data.token;
        sessionStorage.setItem("TOKEN", data.token);
        sessionStorage.setItem("USER_DATA", JSON.stringify(data.user));
      } catch (err) {
        this.errMsg = err.response?.data ?? ["Something went wrong"];
        setTimeout(() => {
          this.errMsg = false;
        }, 3000);
      }
    },
    async login(admin) {
      try {
        const { data } = await axiosClient.post("/login", admin);
        this.user.data = data.user;
        this.user.token = data.token;
        sessionStorage.setItem("TOKEN", data.token);
        sessionStorage.setItem("USER_DATA", JSON.stringify(data.user));
      } catch (err) {
        this.errMsg = err.response.data
          ? err.response.data
          : "Access denied. Admin role required.";
        setTimeout(() => {
          this.errMsg = false;
        }, 3000);
      }
    },
    logout() {
      // Clear user data and token
      this.user.data = {};
      this.user.token = null;
      this.currentStaff = [];
      //Remove stored session data
      sessionStorage.removeItem("TOKEN");
      sessionStorage.removeItem("USER_DATA");
    },
    async createUsers(staffs) {
      this.isLoading = true;
      try {
        const res = await axiosClient.post("/users", staffs);
        this.staffs = res.data.data;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getUsers() {
      this.isLoading = true;
      try {
        const res = await axiosClient.get("/users");
        this.staffs = res.data.data;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
        this.isLoading = false;
      }
    },
    async getUser(id) {
      this.isLoading = true;
      try {
        const res = await axiosClient.get(`/users/${id}`);
        this.currentStaff = res.data;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
        this.isLoading = false;
      }
    },
    async updateUser(staff) {
      this.isLoading = true;
      try {
        const res = await axiosClient.put(`/users/${staff.id}`, staff);
        this.currentStaff = res.data.data;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
        this.isLoading = false;
      }
    },
    async deleteUser(id) {
      this.isLoading = true;
      try {
        const res = await axiosClient.delete(`/users/${id}`);
        this.isLoading = false;
      } catch (err) {
        console.log(err);
        this.isLoading = false;
      }
    },
  },
});
