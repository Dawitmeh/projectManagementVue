<template>
  <PageComponentVue>
    <div class="max-w-4xl mx-auto p-6 bg-background text-text">
      <!-- Page Title -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-semibold text-primary">📌 Project Details</h1>
        <router-link
          to="/projects"
          class="text-secondary hover:text-accent font-medium transition duration-300"
        >
          ← Back to Projects
        </router-link>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center space-y-3"
      >
        <svg class="animate-spin h-10 w-10 text-info" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0116 0H4z"
          ></path>
        </svg>
        <p class="text-muted text-lg">Loading project details...</p>
      </div>

      <!-- Error Message -->
      <div
        v-else-if="errMsg"
        class="bg-error text-white p-4 rounded-lg text-center"
      >
        ⚠️ Failed to load project details: {{ errMsg }}
      </div>

      <!-- Project Details -->
      <div
        v-else-if="currentProject"
        class="bg-card shadow-md rounded-xl p-6 space-y-6"
      >
        <h2 class="text-2xl font-bold text-primary">
          {{ currentProject.name }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <!-- Site & Assigned To -->
          <div class="bg-highlight p-4 rounded-lg">
            <p class="text-muted">
              📍 <strong>Site:</strong> {{ currentProject?.site?.name }}
            </p>
            <p class="text-muted">
              👤 <strong>Assigned To:</strong>
              {{ currentProject?.assigned_to?.first_name }}
            </p>
          </div>

          <!-- Client & Dates -->
          <div class="bg-highlight p-4 rounded-lg">
            <p class="text-muted">
              🏢 <strong>Client:</strong>
              {{ currentProject?.client?.first_name }}
            </p>
            <p class="text-muted">
              📅 <strong>Start Date:</strong>
              {{ formatDate(currentProject?.start_date) }}
            </p>
            <p class="text-muted">
              📅 <strong>End Date:</strong>
              {{ formatDate(currentProject?.end_date) }}
            </p>
          </div>

          <!-- Budget & Duration -->
          <div class="bg-highlight p-4 rounded-lg">
            <p class="text-muted">
              💰 <strong>Budget:</strong> {{ currentProject?.budget }} ETB
            </p>
            <p class="text-muted">
              ⏳ <strong>Duration:</strong> {{ currentProject?.duration }} days
            </p>
          </div>

          <!-- Priority & Status -->
          <div class="flex flex-col gap-2 bg-highlight p-4 rounded-lg">
            <p class="text-muted flex items-center gap-2">
              🚀 <strong>Priority:</strong>
              <span
                class="px-3 py-1 rounded-md text-white text-sm font-medium"
                :class="priorityClass(currentProject?.priority?.name)"
              >
                {{ currentProject?.priority?.name }}
              </span>
            </p>

            <p class="text-muted flex items-center gap-2">
              📊 <strong>Status:</strong>
              <span
                class="px-3 py-1 rounded-md text-white text-sm font-medium"
                :class="statusClass(currentProject?.status?.name)"
              >
                {{ currentProject?.status?.name }}
              </span>
            </p>
          </div>
        </div>

        <p class="text-muted text-sm mt-4 text-center">
          🕒 Created on: {{ formatDate(currentProject?.created_at) }}
        </p>
      </div>
    </div>
  </PageComponentVue>
</template>

<script setup>
import { watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useProjectStore } from "@/stores/projects";
import PageComponentVue from "@/components/DefaultLayout/PageComponent.vue";

const route = useRoute();
const store = useProjectStore();

onMounted(async () => {
  await store.getProject(route.params.id);
});

watch(
  () => route.params.id,
  async (newId) => {
    if (newId) await store.getProject(newId);
  }
);

const currentProject = computed(() => store.currentProject);
const isLoading = computed(() => store.isLoading);
const errMsg = computed(() => store.errMsg);

// Format Date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
};

// Priority Color Classes
const priorityClass = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "bg-error";
    case "medium":
      return "bg-warning";
    case "low":
      return "bg-success";
    default:
      return "bg-muted";
  }
};

// Status Color Classes
const statusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "ongoing":
      return "bg-info";
    case "completed":
      return "bg-success";
    case "pending":
      return "bg-warning";
    case "cancelled":
      return "bg-error";
    default:
      return "bg-muted";
  }
};
</script>

<style scoped>
.shadow-md {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
