<template>
  <PageComponentVue>
    <div
      class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200 dark:bg-gray-800"
    >
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          <font-awesome-icon
            :icon="['fas', 'calendar-alt']"
            class="text-blue-500 mr-2"
          />
          Schedule Details
        </h2>
        <button
          @click="$router.push('/master-schedules')"
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
        v-else-if="schedule"
        class="grid gap-6 text-gray-700 dark:text-gray-300"
      >
        <div class="flex items-center space-x-4 border-b pb-3">
          <font-awesome-icon :icon="['fas', 'tasks']" class="text-blue-400" />
          <span class="font-medium">Title:</span>
          <span class="text-gray-600 dark:text-gray-400">{{
            schedule.name
          }}</span>
        </div>

        <div class="flex items-center space-x-4 border-b pb-3">
          <font-awesome-icon :icon="['fas', 'tag']" class="text-green-400" />
          <span class="font-medium">Type:</span>
          <span class="text-gray-600 dark:text-gray-400">{{
            schedule.type
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
              schedule.start_date
            }}</span>
          </div>
          <div class="flex items-center space-x-4 border-b pb-3">
            <font-awesome-icon
              :icon="['fas', 'calendar-check']"
              class="text-teal-400"
            />
            <span class="font-medium">End Date:</span>
            <span class="text-gray-600 dark:text-gray-400">{{
              schedule.end_date
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
            <span class="text-gray-600 dark:text-gray-400"
              >{{ schedule.duration }} Days</span
            >
          </div>
          <div class="flex items-center space-x-4 border-b pb-3">
            <font-awesome-icon
              :icon="['fas', 'chart-line']"
              class="text-orange-400"
            />
            <span class="font-medium">Progress:</span>
            <span class="text-gray-600 dark:text-gray-400"
              >{{ schedule.progress }}%</span
            >
          </div>
        </div>

        <div class="flex items-center space-x-4 border-b pb-3">
          <font-awesome-icon :icon="['fas', 'clock']" class="text-yellow-400" />
          <span class="font-medium">Created Date:</span>
          <span class="text-gray-600 dark:text-gray-400">{{
            schedule.created_at
          }}</span>
        </div>

        <div
          v-if="schedule.description"
          class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
        >
          <h3 class="text-lg font-semibold">
            <font-awesome-icon
              :icon="['fas', 'sticky-note']"
              class="text-gray-500 mr-2"
            />
            Description
          </h3>
          <p class="mt-2 text-gray-600 dark:text-gray-300">
            {{ schedule.description }}
          </p>
        </div>

        <div
          v-if="schedule.notes"
          class="mt-4 p-4 bg-blue-100 dark:bg-blue-700 rounded-lg"
        >
          <h3 class="text-lg font-semibold text-blue-500">
            <font-awesome-icon :icon="['fas', 'clipboard']" class="mr-2" />
            Notes
          </h3>
          <p class="mt-2 text-blue-600 dark:text-blue-300">
            {{ schedule.notes }}
          </p>
        </div>
      </div>
    </div>
  </PageComponentVue>
</template>

<script setup>
import { onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router";
import { useScheduleStore } from "@/stores/masterschedule";
import PageComponentVue from "@/components/DefaultLayout/PageComponent.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCalendarAlt,
  faTasks,
  faTag,
  faCalendarDay,
  faCalendarCheck,
  faHourglassHalf,
  faChartLine,
  faClock,
  faStickyNote,
  faClipboard,
  faArrowLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCalendarAlt,
  faTasks,
  faTag,
  faCalendarDay,
  faCalendarCheck,
  faHourglassHalf,
  faChartLine,
  faClock,
  faStickyNote,
  faClipboard,
  faArrowLeft,
  faSpinner
);

const store = useScheduleStore();
const route = useRoute();
const schedule = computed(() => store.currentSchedule);

onBeforeMount(() => {
  if (route.params.id) {
    store.getSchedule(route.params.id);
  }
});
</script>
