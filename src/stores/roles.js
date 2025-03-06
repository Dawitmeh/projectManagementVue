import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";

export const useRoleStore = defineStore("roles", {
  state: () => ({
    roles: [],
    currentRole: [],
    roleUsers: [],
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
    async createRole(role) {
      this.isLoading = true;
      try {
        const res = await axiosClient.post("/roles", role);
        this.roles = res.data.data;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getRoles() {
      this.isLoading = true;
      const res = await axiosClient.get("/roles");
      this.roles = res.data.data;
      this.isLoading = false;
    },
    async getRole(id) {
      this.isLoading = true;
      const res = await axiosClient.get(`/roles/${id}`);
      console.log(res);
      this.currentRole = res.data.data.role;
      this.roleUsers = res.data.data.users;
      this.isLoading = false;
    },
    async updateRoles(role) {
      this.isLoading = true;
      const res = await axiosClient.put(`/roles/${role.id}`, role);
      this.currentRole = res.data;
      this.isLoading = false;
    },
    async deleteRole(id) {
      this.isLoading = true;
      const res = await axiosClient.delete(`/roles/${id}`);
      this.isLoading = false;
    },
  },
});
