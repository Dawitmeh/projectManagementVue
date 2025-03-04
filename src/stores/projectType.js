import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";

export const useProjectTypeStore = defineStore("project-type", {
  state: () => ({
    projectTypes: [],
    currentProjectType: [],
    isLoading: ref(false),
    notification: {
      show: false,
      type: null,
      message: null,
    },
  }),
  actions: {
    notify({ message, type }) {
      this.notification.show = true;
      this.notification.type = type;
      this.notification.message = message;
      setTimeout(() => {
        this.notification.show = false;
      }, 3000);
    },
    createProjectType(type) {
      this.isLoading = true;
      return axiosClient
        .post("/project-types", type)
        .then((res) => {
          this.projectTypes = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 🔥 Fixed the typo here
    getProjectTypes() {
      this.isLoading = true;
      return axiosClient.get("/project-types").then((res) => {
        this.projectTypes = res.data.data;
        this.isLoading = false;
      });
    },
    // 🔥 Fixed the typo here
    getProjectType(id) {
      this.isLoading = true;
      return axiosClient.get(`/project-types/${id}`).then((res) => {
        this.currentProjectType = res.data;
        this.isLoading = false;
      });
    },
    updateProjectType(type) {
      this.isLoading = true;
      return axiosClient.put(`/project-types/${type.id}`, type).then((res) => {
        this.currentProjectType = res.data.data;
        this.isLoading = false;
      });
    },
    deleteProjectType(id) {
      this.isLoading = true;
      return axiosClient.delete(`/project-types/${id}`).then(() => {
        this.isLoading = false;
      });
    },
  },
});
