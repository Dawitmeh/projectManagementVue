<template>
  <PageComponentVue>
    <div
      class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200 dark:bg-gray-800"
    >
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          <font-awesome-icon
            :icon="['fas', 'clipboard-list']"
            class="text-blue-500 mr-2"
          />
          Activity Details
        </h2>
        <button
          @click="$router.push('/activities')"
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

      <div
        v-else-if="activity"
        class="grid gap-6 text-gray-700 dark:text-gray-300"
      >
        <div class="flex items-center space-x-4 border-b pb-3">
          <font-awesome-icon :icon="['fas', 'tasks']" class="text-blue-400" />
          <span class="font-medium">Task:</span>
          <span class="text-gray-600 dark:text-gray-400">{{
            activity.task_id
          }}</span>
        </div>

        <div class="flex items-center space-x-4 border-b pb-3">
          <font-awesome-icon :icon="['fas', 'flag']" class="text-red-400" />
          <span class="font-medium">Priority:</span>
          <span class="text-gray-600 dark:text-gray-400">{{
            activity.pirority_id
          }}</span>
        </div>

        <div class="flex items-center space-x-4 border-b pb-3">
          <font-awesome-icon
            :icon="['fas', 'building']"
            class="text-green-400"
          />
          <span class="font-medium">Unit:</span>
          <span class="text-gray-600 dark:text-gray-400">{{
            activity.unit_id
          }}</span>
        </div>

        <div class="flex items-center space-x-4 border-b pb-3">
          <font-awesome-icon
            :icon="['fas', 'list-check']"
            class="text-yellow-400"
          />
          <span class="font-medium">Status:</span>
          <span class="text-gray-600 dark:text-gray-400">{{
            activity.status_id
          }}</span>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center space-x-4 border-b pb-3">
            <font-awesome-icon
              :icon="['fas', 'calendar-day']"
              class="text-purple-400"
            />
            <span class="font-medium">Start Date:</span>
            <span class="text-gray-600 dark:text-gray-400">{{
              activity.start_date
            }}</span>
          </div>
          <div class="flex items-center space-x-4 border-b pb-3">
            <font-awesome-icon
              :icon="['fas', 'calendar-check']"
              class="text-teal-400"
            />
            <span class="font-medium">End Date:</span>
            <span class="text-gray-600 dark:text-gray-400">{{
              activity.end_date
            }}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center space-x-4 border-b pb-3">
            <font-awesome-icon
              :icon="['fas', 'hourglass-half']"
              class="text-indigo-400"
            />
            <span class="font-medium">Duration:</span>
            <span class="text-gray-600 dark:text-gray-400">{{
              activity.duration
            }}</span>
          </div>
          <div class="flex items-center space-x-4 border-b pb-3">
            <font-awesome-icon
              :icon="['fas', 'chart-line']"
              class="text-orange-400"
            />
            <span class="font-medium">Progress:</span>
            <span class="text-gray-600 dark:text-gray-400"
              >{{ activity.progress }}%</span
            >
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center space-x-4 border-b pb-3">
            <font-awesome-icon :icon="['fas', 'box']" class="text-pink-400" />
            <span class="font-medium">Quantity:</span>
            <span class="text-gray-600 dark:text-gray-400">{{
              activity.quantity
            }}</span>
          </div>
          <div class="flex items-center space-x-4 border-b pb-3">
            <font-awesome-icon
              :icon="['fas', 'thumbs-up']"
              class="text-blue-400"
            />
            <span class="font-medium">Approval:</span>
            <span class="text-gray-600 dark:text-gray-400">{{
              activity.approval
            }}</span>
          </div>
        </div>

        <div
          v-if="activity.remark"
          class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
        >
          <h3 class="text-lg font-semibold">
            <font-awesome-icon
              :icon="['fas', 'sticky-note']"
              class="text-gray-500 mr-2"
            />
            Remarks
          </h3>
          <p class="mt-2 text-gray-600 dark:text-gray-300">
            {{ activity.remark }}
          </p>
        </div>

        <div
          v-if="activity.issue"
          class="mt-4 p-4 bg-red-100 dark:bg-red-700 rounded-lg"
        >
          <h3 class="text-lg font-semibold text-red-500">
            <font-awesome-icon
              :icon="['fas', 'exclamation-triangle']"
              class="mr-2"
            />
            Issues
          </h3>
          <p class="mt-2 text-red-600 dark:text-red-300">
            {{ activity.issue }}
          </p>
        </div>
      </div>
    </div>
  </PageComponentVue>
</template>

<script setup>
import { onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useActivityStore } from "@/stores/activity";
import PageComponentVue from "@/components/DefaultLayout/PageComponent.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faClipboardList,
  faTasks,
  faFlag,
  faBuilding,
  faListCheck,
  faCalendarDay,
  faCalendarCheck,
  faHourglassHalf,
  faChartLine,
  faBox,
  faThumbsUp,
  faStickyNote,
  faExclamationTriangle,
  faArrowLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faClipboardList,
  faTasks,
  faFlag,
  faBuilding,
  faListCheck,
  faCalendarDay,
  faCalendarCheck,
  faHourglassHalf,
  faChartLine,
  faBox,
  faThumbsUp,
  faStickyNote,
  faExclamationTriangle,
  faArrowLeft,
  faSpinner
);

const store = useActivityStore();
const route = useRoute();
const activity = computed(() => store.currentActivity);

onBeforeMount(() => {
  if (route.params.id) {
    store.getActivity(route.params.id);
  }
});
</script>
