<template>
  <PageComponentVue>
    <div class="p-4">
      <h1 class="text-4xl font-bold text-gray-900">Time Sheet</h1>

      <div class="flex items-center justify-between mt-4">
        <h2 class="text-2xl font-bold text-gray-800">
          {{ currentMonthName }} {{ currentYear }}
        </h2>
        <select
          v-model="selectedMonth"
          @change="updateCalendar"
          class="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
        >
          <option v-for="(month, index) in months" :key="index" :value="index">
            {{ month }} {{ currentYear }}
          </option>
        </select>
      </div>

      <div class="mt-6">
        <table class="calendar w-full">
          <thead>
            <tr>
              <th class="text-gray-700">Sun</th>
              <th class="text-gray-700">Mon</th>
              <th class="text-gray-700">Tue</th>
              <th class="text-gray-700">Wed</th>
              <th class="text-gray-700">Thu</th>
              <th class="text-gray-700">Fri</th>
              <th class="text-gray-700">Sat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, weekIndex) in calendarWeeks" :key="weekIndex">
              <td
                v-for="(day, dayIndex) in week"
                :key="dayIndex"
                class="p-2 border border-gray-200 dark:border-gray-700"
                :class="{
                  'bg-gray-100 dark:bg-gray-800': !day.isCurrentMonth,
                  'bg-white dark:bg-gray-900': day.isCurrentMonth,
                }"
              >
                <div class="calendar-day">
                  <div class="day-number text-gray-600 dark:text-gray-100">
                    {{ day.day }}
                  </div>

                  <!-- Task Badge -->
                  <div
                    v-for="task in getTasksForDay(day.date)"
                    :key="task.id"
                    class="task-badge"
                    :style="{ backgroundColor: getTaskColor(task.id) }"
                  >
                    {{ task.name }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </PageComponentVue>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "@/stores/tasks";
import PageComponentVue from "@/components/DefaultLayout/PageComponent.vue";

const taskStore = useTaskStore();
const calendarWeeks = ref([]);
const taskColors = ref({});
const selectedMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentMonthName = computed(() => months[selectedMonth.value]);

const getTaskColor = (taskId) => {
  if (!taskColors.value[taskId]) {
    taskColors.value[taskId] = `hsl(${Math.random() * 360}, 70%, 75%)`;
  }
  return taskColors.value[taskId];
};

const getTasksForDay = (date) => {
  return taskStore.tasks.filter((task) => {
    const taskDate = task.start_date.split(" ")[0];
    return taskDate === date;
  });
};

const generateCalendar = () => {
  const year = currentYear.value;
  const month = selectedMonth.value;
  const weeks = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDay = firstDayOfMonth.getDay();
  const endDay = lastDayOfMonth.getDate();

  let currentDay = 1;
  for (let week = 0; week < 6; week++) {
    const days = [];
    for (let day = 0; day < 7; day++) {
      if (week === 0 && day < startDay) {
        days.push({ day: "", date: "", isCurrentMonth: false });
      } else if (currentDay > endDay) {
        days.push({ day: "", date: "", isCurrentMonth: false });
      } else {
        const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          currentDay
        ).padStart(2, "0")}`;
        days.push({ day: currentDay, date, isCurrentMonth: true });
        currentDay++;
      }
    }
    weeks.push(days);
    if (currentDay > endDay) break;
  }
  calendarWeeks.value = weeks;
};

const updateCalendar = () => {
  generateCalendar();
};

onMounted(async () => {
  await taskStore.getTasks();
  generateCalendar();
});
</script>

<style scoped>
.calendar {
  border-collapse: collapse;
  width: 100%;
}

.calendar th,
.calendar td {
  padding: 8px;
  text-align: center;
}

.calendar-day {
  min-height: 100px;
}

.day-number {
  font-weight: bold;
}

.task-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 3px;
  text-align: center;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
