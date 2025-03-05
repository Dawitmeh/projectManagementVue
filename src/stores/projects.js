import { defineStore } from "pinia";
import axiosClient from "../../axios/axiosClient";

export const useProjectStore = defineStore("projects", {
  state: () => ({
    projects: [],
    currentProject: null,
    isLoading: false,
    errMsg: null,
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
        console.error("Project creation failed:", err); // Log the full error object

        // Log full response details to inspect status, headers, and data
        if (err.response) {
          console.error("Error response:", err.response);
          console.error("Status code:", err.response.status);
          console.error("Response data:", err.response.data);
        } else {
          console.error("No response object from the server.");
        }

        // Extract detailed error messages
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "An unexpected error occurred.";

        this.errMsg = errorMessage;
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
