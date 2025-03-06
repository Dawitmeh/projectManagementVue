<template>
  <div
    class="h-full bg-white dark:bg-bs-dark border border-gray-200 dark:border-border rounded-lg shadow-sm flex flex-col"
  >
    <!-- Card Header -->
    <div class="flex items-center justify-between p-4">
      <h5 class="text-lg font-semibold text-muted dark:text-highlight">
        {{ title }}
      </h5>
    </div>

    <!-- Card Body -->
    <div class="p-4 flex-1">
      <!-- Pie Chart Section -->
      <div class="relative flex-1 mb-6">
          <apexchart
            type="pie"
            :options="chartOptions"
            :series="chartSeries"
            height="170"
            width="84%"
          ></apexchart>
        </div>

      <!-- List Items -->
      <ul class="p-0 m-0">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="flex items-center justify-between mb-4 pb-1"
        >
          <div class="flex items-center">
            <div
              class="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-tableHeader rounded-full mr-3"
            >
              <font-awesome-icon
                :icon="item.icon"
                :style="{ color: item.iconColor }"
              />
            </div>
            <div>
              <a
                :href="item.link"
                class="text-sm font-medium text-muted dark:text-highlight hover:text-info"
              >
                {{ item.label }}
              </a>
            </div>
          </div>
          <div class="text-sm font-semibold text-muted dark:text-highlight">
            {{ item.value }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "CardComponent",
  components: {
    FontAwesomeIcon,
    apexchart: VueApexCharts,
  },
  props: {
    title: { type: String, required: true },
    items: { type: Array, required: true },
  },
  computed: {
    chartSeries() {
      return this.items.map((item) => Number(item.value));
    },
    chartOptions() {
      return {
        chart: {
          type: "pie",
        },
        labels: this.items.map((item) => item.label),
        colors: this.items.map((item) => item.iconColor),
        legend: {
          show: false,
        },
      };
    },
  },
};
</script>
