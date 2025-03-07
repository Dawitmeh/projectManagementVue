<template>
  <PageComponentVue>
    <div
      class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200 dark:bg-gray-800"
    >
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          <font-awesome-icon
            :icon="['fas', 'clipboard-check']"
            class="text-blue-500 mr-2"
          />
          Task Details
        </h2>
        <button
          @click="$router.push('/tasks')"
          class="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
          Back
        </button>
      </div>

      <div
        v-if="store.isLoading"
        class="flex justify-center items-center py-10"
      >
        <font-awesome-icon
          :icon="['fas', 'spinner']"
          class="text-blue-500 text-3xl animate-spin"
        />
      </div>

      <div v-else-if="task" class="grid gap-6 text-gray-700 dark:text-gray-300">
        <div class="flex items-center space-x-4 border-b pb-3">
          <font-awesome-icon
            :icon="['fas', 'project-diagram']"
            class="text-purple-400"
          />
          <span class="font-medium">Project:</span>
          <span class="text-gray-600 dark:text-gray-400">{{
            task.project_id
          }}</span>
        </div>

        <div class="flex items-center space-x-4 border-b pb-3">
          <font-awesome-icon
            :icon="['fas', 'list-check']"
            class="text-yellow-400"
          />
          <span class="font-medium">Status:</span>
          <span class="text-gray-600 dark:text-gray-400">{{
            task.status_id
          }}</span>
        </div>

        <div class="flex items-center space-x-4 border-b pb-3">
          <font-awesome-icon :icon="['fas', 'flag']" class="text-red-400" />
          <span class="font-medium">Priority:</span>
          <span class="text-gray-600 dark:text-gray-400">{{
            task.priority_id
          }}</span>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center space-x-4 border-b pb-3">
            <font-awesome-icon
              :icon="['fas', 'calendar-day']"
              class="text-blue-400"
            />
            <span class="font-medium">Start Date:</span>
            <span class="text-gray-600 dark:text-gray-400">{{
              task.start_date
            }}</span>
          </div>
          <div class="flex items-center space-x-4 border-b pb-3">
            <font-awesome-icon
              :icon="['fas', 'calendar-check']"
              class="text-teal-400"
            />
            <span class="font-medium">End Date:</span>
            <span class="text-gray-600 dark:text-gray-400">{{
              task.end_date
            }}</span>
          </div>
        </div>

        <div class="flex items-center space-x-4 border-b pb-3">
          <font-awesome-icon :icon="['fas', 'user']" class="text-green-400" />
          <span class="font-medium">Created By:</span>
          <span class="text-gray-600 dark:text-gray-400">{{
            task.created_by
          }}</span>
        </div>

        <div class="flex items-center space-x-4 border-b pb-3">
          <font-awesome-icon
            :icon="['fas', 'chart-line']"
            class="text-orange-400"
          />
          <span class="font-medium">Progress:</span>
          <span class="text-gray-600 dark:text-gray-400"
            >{{ task.progress }}%</span
          >
        </div>

        <div
          v-if="task.description"
          class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
        >
          <h3 class="text-lg font-semibold">
            <font-awesome-icon
              :icon="['fas', 'align-left']"
              class="text-gray-500 mr-2"
            />
            Description
          </h3>
          <p class="mt-2 text-gray-600 dark:text-gray-300">
            {{ task.description }}
          </p>
        </div>
      </div>
    </div>
  </PageComponentVue>
</template>

<script setup>
import { onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/tasks";
import PageComponentVue from "@/components/DefaultLayout/PageComponent.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faClipboardCheck,
  faProjectDiagram,
  faListCheck,
  faFlag,
  faCalendarDay,
  faCalendarCheck,
  faUser,
  faChartLine,
  faAlignLeft,
  faArrowLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faClipboardCheck,
  faProjectDiagram,
  faListCheck,
  faFlag,
  faCalendarDay,
  faCalendarCheck,
  faUser,
  faChartLine,
  faAlignLeft,
  faArrowLeft,
  faSpinner
);

const store = useTaskStore();
const route = useRoute();
const task = computed(() => store.currentTask);

onBeforeMount(() => {
  if (route.params.id) {
    store.getTask(route.params.id);
  }
});
</script>
