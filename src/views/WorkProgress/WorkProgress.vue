<template>
  <PageComponentVue>
    <div class="container my-5 mx-auto px-4">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="mb-6">
        <ol class="breadcrumb flex space-x-2 text-sm">
          <li class="breadcrumb-item">
            <a
              href="https://raycon.oasismgmt2.com/home"
              class="text-blue-600 hover:text-blue-800"
              >Home</a
            >
          </li>
          <li class="breadcrumb-item active text-gray-600" aria-current="page">
            Work Progress
          </li>
        </ol>
      </nav>

      <!-- Main Content -->
      <div class="row mb-4 flex flex-wrap -mx-2">
        <!-- Left Column -->
        <div class="col-md-4 w-full md:w-1/3 px-2">
          <!-- Today's Progress Card -->
          <div class="card shadow-lg rounded-lg bg-white dark:bg-gray-800 p-6">
            <h5
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Today's Progress
            </h5>

            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="flex flex-col items-center">
                <h6 class="text-sm text-gray-600 dark:text-gray-400">
                  Completed
                </h6>
                <span class="badge bg-green-500 text-white px-3 py-1 rounded"
                  >9</span
                >
              </div>
              <div class="flex flex-col items-center">
                <h6 class="text-sm text-gray-600 dark:text-gray-400">
                  Not Started
                </h6>
                <span class="badge bg-red-500 text-white px-3 py-1 rounded"
                  >0</span
                >
              </div>
              <div class="flex flex-col items-center">
                <h6 class="text-sm text-gray-600 dark:text-gray-400">
                  Blocked
                </h6>
                <span class="badge bg-yellow-500 text-black px-3 py-1 rounded"
                  >0</span
                >
              </div>
              <div class="flex flex-col items-center">
                <h6 class="text-sm text-gray-600 dark:text-gray-400">
                  In Progress
                </h6>
                <span class="badge bg-yellow-500 text-white px-3 py-1 rounded"
                  >9</span
                >
              </div>
            </div>

            <!-- ✅ Total centered at the bottom -->
            <div class="flex flex-col items-center">
              <h6 class="text-sm text-gray-600 dark:text-gray-400">Total</h6>
              <span class="badge bg-blue-500 text-white px-4 py-1 rounded"
                >18</span
              >
            </div>
          </div>

          <!-- Top Employee Card -->
          <div class="card shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-4">
            <div class="card-body p-6 text-center">
              <h5
                class="card-title text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Top Employee of the Week
              </h5>
              <h6 class="text-dark dark:text-gray-200">Melamu Mamo</h6>
              <p class="text-muted dark:text-gray-400">Top Performer</p>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="col-md-8 w-full md:w-2/3 px-2">
          <!-- Employee Progress Card -->
          <div class="card shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <div class="card-body p-6">
              <h5
                class="card-title text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Employee Progress
              </h5>
              <div class="overflow-x-auto">
                <table class="min-w-full bg-white dark:bg-gray-800">
                  <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                      >
                        No
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                      >
                        Member
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                      >
                        Activity
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                      >
                        Status
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                      >
                        Priority
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                      >
                        Issue
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                      >
                        KPI
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                      >
                        Start Date
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                      >
                        End Date
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <!-- Example Row -->
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td
                        class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100"
                      >
                        1
                      </td>
                      <td
                        class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100"
                      >
                        N/A
                      </td>
                      <td
                        class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100"
                      >
                        admin
                      </td>
                      <td class="px-4 py-2 text-sm">
                        <span
                          class="badge bg-green-100 text-green-800 px-2 py-1 rounded"
                          >Completed</span
                        >
                      </td>
                      <td class="px-4 py-2 text-sm">
                        <span
                          class="badge bg-gray-100 text-gray-800 px-2 py-1 rounded"
                          >Unknown</span
                        >
                      </td>
                      <td
                        class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100"
                      ></td>
                      <td
                        class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100"
                      ></td>
                      <td
                        class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100"
                      >
                        1970-01-01
                      </td>
                      <td
                        class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100"
                      >
                        1970-01-01
                      </td>
                    </tr>
                    <!-- Add more rows as needed -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Work Progress Graph -->
      <div class="mt-4">
        <div class="shadow-lg rounded-lg bg-white dark:bg-gray-800 p-6">
          <h5
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Work Progress Graph
          </h5>
          <!-- Chart Container -->
          <div class="relative h-96"> <!-- Set a fixed height for the chart container -->
            <canvas ref="chartCanvas" class="w-full h-full"></canvas>
          </div>
        </div>
      </div>
    </div>
  </PageComponentVue>
</template>

<script setup>
import PageComponentVue from "@/components/DefaultLayout/PageComponent.vue";
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const chartCanvas = ref(null);

onMounted(() => {
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: "bar",
      data: {
        labels: ["Completed", "In Progress", "Blocked", "Not Started"],
        datasets: [
          {
            label: "Tasks",
            data: [9, 9, 0, 0], // Replace with actual data
            backgroundColor: [
              "#71dd37", // Green (Completed)
              "#ffab00", // Yellow (In Progress)
              "#ff3e1d", // Red (Blocked)
              "#8592a3", // Gray (Not Started)
            ],
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }
});
</script>