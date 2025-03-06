<template>
  <PageComponentVue>
    <div
      class="max-w-4xl mx-auto p-6 bg-white dark:bg-tableBg shadow-lg rounded-lg"
    >
      <h1 class="text-2xl font-bold text-text dark:text-highlight">
        Task Details
      </h1>

      <div v-if="isLoading" class="text-center mt-5 text-gray-500">
        Loading task details...
      </div>

      <div v-else-if="currentTask" class="mt-5">
        <div class="mb-4">
          <h2 class="text-lg font-semibold text-primary dark:text-highlight">
            {{ currentTask.name }}
          </h2>
          <p class="text-muted dark:text-gray-300">
            {{ currentTask?.description || "No description available." }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div class="p-3 bg-card dark:bg-gray-800 rounded-md">
            <p class="font-semibold text-secondary dark:text-accent">
              Project:
            </p>
            <p class="text-text dark:text-gray-300">
              {{ currentTask?.project?.name || "N/A" }}
            </p>
          </div>

          <div class="p-3 bg-card dark:bg-gray-800 rounded-md">
            <p class="font-semibold text-secondary dark:text-accent">
              Assigned To:
            </p>
            <p class="text-text dark:text-gray-300">
              {{ currentTask?.assigned_to?.first_name || "N/A" }}
            </p>
          </div>

          <div class="p-3 bg-card dark:bg-gray-800 rounded-md">
            <p class="font-semibold text-secondary dark:text-accent">
              Start Date:
            </p>
            <p class="text-text dark:text-gray-300">
              {{ currentTask?.start_date || "N/A" }}
            </p>
          </div>

          <div class="p-3 bg-card dark:bg-gray-800 rounded-md">
            <p class="font-semibold text-secondary dark:text-accent">
              End Date:
            </p>
            <p class="text-text dark:text-gray-300">
              {{ currentTask?.end_date || "N/A" }}
            </p>
          </div>

          <div class="p-3 bg-card dark:bg-gray-800 rounded-md">
            <p class="font-semibold text-secondary dark:text-accent">
              Duration:
            </p>
            <p class="text-text dark:text-gray-300">
              {{ currentTask?.duration }} Days
            </p>
          </div>

          <div class="p-3 bg-card dark:bg-gray-800 rounded-md">
            <p class="font-semibold text-secondary dark:text-accent">
              Created:
            </p>
            <p class="text-text dark:text-gray-300">
              {{ currentTask?.created_at || "N/A" }}
            </p>
          </div>

          <div class="p-3 bg-card dark:bg-gray-800 rounded-md">
            <p class="font-semibold text-secondary dark:text-accent">
              Priority:
            </p>
            <span
              class="px-2 py-1 text-text dark:text-gray-300 text-xs font-semibold rounded-md"
              :class="{
                'bg-error': currentTask?.priority?.name === 'High',
                'bg-warning': currentTask?.priority?.name === 'Medium',
                'bg-success': currentTask?.priority?.name === 'Low',
              }"
            >
              {{ currentTask?.priority?.name || "N/A" }}
            </span>
          </div>

          <div class="p-3 bg-card dark:bg-gray-800 rounded-md">
            <p class="font-semibold text-secondary dark:text-accent">Status:</p>
            <span
              class="px-2 py-1 text-text dark:text-gray-300 text-xs font-semibold rounded-md"
              :class="{
                'bg-success': currentTask?.status?.name === 'Completed',
                'bg-info': currentTask?.status?.name === 'In Progress',
                'bg-error': currentTask?.status?.name === 'Pending',
              }"
            >
              {{ currentTask?.status?.name || "N/A" }}
            </span>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-4">
          <button
            @click="router.push('/tasks')"
            class="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-text dark:text-highlight rounded-md"
          >
            Back to Tasks
          </button>
        </div>
      </div>

      <div v-else class="text-red-500 mt-5">Task not found.</div>
    </div>
  </PageComponentVue>
</template>

<script setup>
import { onMounted, computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTaskStore } from "@/stores/tasks";
import { useUserStore } from "@/stores/users";
import PageComponentVue from "@/components/DefaultLayout/PageComponent.vue";

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();
const userStore = useUserStore();

const currentTask = computed(() => taskStore.currentTask);
const isLoading = computed(() => taskStore.isLoading);
const assignedUser = computed(() => userStore.currentStaff);

onMounted(async () => {
  if (route.params.id) {
    await taskStore.getTask(route.params.id);
  }
});

// Fetch assigned user when `currentTask` is available
watchEffect(() => {
  console.log("Current Task:", currentTask.value);
  if (currentTask.value?.assigned_id) {
    console.log("Assigned ID:", currentTask.value.assigned_id);
    userStore.getUser(currentTask.value.assigned_id);
  }
  console.log("Assigned User After Fetch:", assignedUser.value);
});
</script>
