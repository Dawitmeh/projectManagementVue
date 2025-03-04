import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";

export const useProjectStore = defineStore("projects", {
  state: () => ({
    projects: [],
    currentProject: null,
    isLoading: ref(false),
    errMsg: ref(null), // Properly initialized as null
    notification: {
      show: false,
      type: null,
      message: null,
    },
  }),
  actions: {
    notify({ message, type }) {
      this.notification = { show: true, type, message };
      setTimeout(() => (this.notification.show = false), 3000);
    },

    async createProjects(project) {
      this.isLoading = true;
      this.errMsg = null;
      try {
        const res = await axiosClient.post("/projects", project);
        this.projects.push(res.data.data);
        this.notify({
          type: "success",
          message: "Project created successfully",
        });
      } catch (err) {
        this.errMsg = err.response?.data?.message || "An error occurred.";
      } finally {
        this.isLoading = false;
      }
    },

    async getProjects() {
      this.isLoading = true;
      try {
        const res = await axiosClient.get("/projects");
        this.projects = res.data.data;
      } catch (err) {
        this.errMsg =
          err.response?.data?.message || "Failed to fetch projects.";
      } finally {
        this.isLoading = false;
      }
    },

    async getProject(id) {
      this.isLoading = true;
      try {
        const res = await axiosClient.get(`/projects/${id}`);
        this.currentProject = res.data.data;
      } catch (err) {
        this.errMsg = err.response?.data?.message || "Project not found.";
      } finally {
        this.isLoading = false;
      }
    },

    async updateProject(id, projectData) {
      this.isLoading = true;
      this.errMsg = null;
      try {
        const res = await axiosClient.put(`/projects/${id}`, projectData);
        this.currentProject = res.data.data;
        this.notify({
          type: "success",
          message: "Project updated successfully",
        });
      } catch (err) {
        this.errMsg =
          err.response?.data?.message || "Failed to update project.";
      } finally {
        this.isLoading = false;
      }
    },

    async deleteProject(id) {
      this.isLoading = true;
      try {
        await axiosClient.delete(`/projects/${id}`);
        this.projects = this.projects.filter((proj) => proj.id !== id);
        this.notify({
          type: "success",
          message: "Project deleted successfully",
        });
      } catch (err) {
        this.errMsg =
          err.response?.data?.message || "Failed to delete project.";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
