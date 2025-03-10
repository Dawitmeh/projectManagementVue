<template>
  <PageComponentVue>
    <div class="mt-3 mb-3">
      <div
        v-if="notification.show == true"
        class="p-3 text-white animate-fade-in-down rounded-md"
        :class="[
          notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500',
        ]"
      >
        {{ notification.message }}
      </div>
    </div>
    <div class="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
      <div
        class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4"
      >
        <div class="w-full md:w-1/2">
          <form @submit="handleSearch" class="flex items-center">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                v-model="search.query"
                id="simple-search"
                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
                required=""
              />
            </div>
          </form>
        </div>
        <!-- <button @click="showModal" class="
                  mt-5
                  py-2
                  px-3
                  text-white
                  bg-emerald-500
                  rounded-md
                  hover:bg-emerald-600"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Create project
              </button> -->
      </div>
      <div v-if="isLoading != false">
        <div role="status" class="text-center mt-6 mb-6">
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
      <div v-else>
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3"></th>
              <th scope="col" class="px-6 py-3">Title</th>
              <th scope="col" class="px-6 py-3">Type</th>
              <th scope="col" class="px-6 py-3">Start Date</th>
              <th scope="col" class="px-6 py-3">End Date</th>
              <th scope="col" class="px-6 py-3">Duration</th>
              <th scope="col" class="px-6 py-3">Progress</th>
              <th scope="col" class="px-6 py-3">Created Date</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loop through schedules -->
            <template
              v-for="(schedule, index) in schedules"
              :key="schedule?.id"
            >
              <tr
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <td
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <button
                    @click="toggleSchedule(schedule.id)"
                    type="button"
                    class="inline-flex items-center p-2 text-sm text-white rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  >
                    <svg
                      v-if="viewSchedule !== true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </td>
                <td
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ schedule.name }}
                </td>
                <td class="px-6 py-4">{{ schedule?.type }}</td>
                <td class="px-6 py-4">{{ schedule?.start_date }}</td>
                <td class="px-6 py-4">{{ schedule?.end_date }}</td>
                <td class="px-6 py-4">{{ schedule?.duration }} (Days)</td>
                <td class="px-6 py-4">{{ schedule?.progress }}</td>
                <td class="px-6 py-4">{{ schedule.created_at }}</td>
                <td class="flex items-center px-6 py-4 space-x-3">
                  <button
                    @click="openTaskModal(schedule.id)"
                    class="text-emerald-600 hover:underline"
                  >
                    Add task
                  </button>
                  <router-link
                    :to="{ name: 'ScheduleView', params: { id: schedule.id } }"
                    class="text-blue-600 hover:underline"
                    >View</router-link
                  >
                  <button
                    @click="openEditModal(schedule.id)"
                    class="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    @click="openConfirmModal(schedule?.id)"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>

              <!-- Task Table (Appears only when expandedScheduleId matches) -->
              <tr v-if="expandedScheduleId === schedule?.id">
                <td colspan="9">
                  <table
                    class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border mt-2"
                  >
                    <thead
                      class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    >
                      <tr>
                        <th scope="col" class="px-6 py-3"></th>
                        <th scope="col" class="px-6 py-3">Title</th>
                        <th scope="col" class="px-6 py-3">Assigned to</th>
                        <th scope="col" class="px-6 py-3">Start date</th>
                        <th scope="col" class="px-6 py-3">End date</th>
                        <th scope="col" class="px-6 py-3">Duration</th>
                        <th scope="col" class="px-6 py-3">Priority</th>
                        <th scope="col" class="px-6 py-3">Progress</th>
                        <th scope="col" class="px-6 py-3">Status</th>
                        <th scope="col" class="px-6 py-3">Created Date</th>
                        <th scope="col" class="px-6 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template
                        v-for="(task, taskIndex) in schedule?.project?.task"
                        :key="task?.id"
                      >
                        <tr
                          class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                        >
                          <td
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <button
                              @click="toggleTasks(schedule.id)"
                              type="button"
                              class="inline-flex items-center p-2 text-sm text-white rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                              <svg
                                v-if="viewTask !== true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                              <svg
                                v-else
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                            </button>
                          </td>
                          <td
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {{ task.name }}
                          </td>
                          <td class="px-6 py-4">
                            {{ task?.assigned_to?.first_name }}
                          </td>
                          <td class="px-6 py-4">{{ task?.start_date }}</td>
                          <td class="px-6 py-4">{{ task?.end_date }}</td>
                          <td class="px-6 py-4">{{ task?.duration }} (Days)</td>
                          <td class="px-6 py-4">{{ task?.priority?.name }}</td>
                          <td class="px-6 py-4">{{ task?.progress }}</td>
                          <td class="px-6 py-4">{{ task?.status?.name }}</td>
                          <td class="px-6 py-4">{{ task.created_at }}</td>
                          <td class="flex items-center px-6 py-4 space-x-3">
                            <button
                              @click="openEditModal(task.id)"
                              class="text-emerald-600 hover:underline"
                            >
                              Add activity
                            </button>
                            <router-link
                              :to="{
                                name: 'TaskView',
                                params: { id: task.id },
                              }"
                              class="text-blue-600 hover:underline"
                              >View</router-link
                            >
                            <button
                              @click="openEditModal(task.id)"
                              class="text-blue-600 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              @click="onRemove(task.id)"
                              class="text-red-600 hover:underline"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>

                        <!-- Activity Table (Appears only when expandedTaskId matches) -->
                        <tr v-if="expandedTaskId === task.id">
                          <td colspan="11">
                            <table
                              class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border mt-2"
                            >
                              <thead
                                class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                              >
                                <tr>
                                  <th scope="col" class="px-6 py-3"></th>
                                  <th scope="col" class="px-6 py-3">Title</th>
                                  <th scope="col" class="px-6 py-3">Unit</th>
                                  <th scope="col" class="px-6 py-3">
                                    Quantity
                                  </th>
                                  <th scope="col" class="px-6 py-3">
                                    Start Date
                                  </th>
                                  <th scope="col" class="px-6 py-3">
                                    End date
                                  </th>
                                  <th scope="col" class="px-6 py-3">
                                    Duration
                                  </th>
                                  <th scope="col" class="px-6 py-3">
                                    Priority
                                  </th>
                                  <th scope="col" class="px-6 py-3">
                                    Progress
                                  </th>
                                  <th scope="col" class="px-6 py-3">
                                    Approval
                                  </th>
                                  <th scope="col" class="px-6 py-3">Status</th>
                                  <th scope="col" class="px-6 py-3">
                                    Created Date
                                  </th>
                                  <th scope="col" class="px-6 py-3">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(
                                    activity, taskIndex
                                  ) in task?.activity"
                                  :key="activity?.id"
                                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                >
                                  <!-- {{activity}} -->
                                  <td
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    {{ task.name }}
                                  </td>
                                  <td class="px-6 py-4">
                                    {{ activity?.name }}
                                  </td>
                                  <td class="px-6 py-4">
                                    {{ activity?.unit?.name }}
                                  </td>
                                  <td class="px-6 py-4">
                                    {{ activity?.quantity }}
                                  </td>
                                  <td class="px-6 py-4">
                                    {{ activity?.start_date }}
                                  </td>
                                  <td class="px-6 py-4">
                                    {{ activity?.end_date }}
                                  </td>
                                  <td class="px-6 py-4">
                                    {{ activity?.duration }}
                                  </td>
                                  <td class="px-6 py-4">
                                    {{ activity?.priority?.name }}
                                  </td>
                                  <td class="px-6 py-4">
                                    {{ activity?.progress }}
                                  </td>
                                  <td class="px-6 py-4">
                                    {{ activity?.approval }}
                                  </td>
                                  <td class="px-6 py-4">
                                    {{ activity?.status?.name }}
                                  </td>
                                  <td class="px-6 py-4">
                                    {{ activity.created_at }}
                                  </td>
                                  <td
                                    class="flex items-center px-6 py-4 space-x-3"
                                  >
                                    <button
                                      class="text-emerald-600 hover:underline"
                                    >
                                      Request
                                    </button>
                                    <router-link
                                      :to="{
                                        name: 'ActivityView',
                                        params: { id: task.id },
                                      }"
                                      class="text-blue-600 hover:underline"
                                      >View</router-link
                                    >
                                    <button
                                      @click="openEditModal(task.id)"
                                      class="text-blue-600 hover:underline"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      @click="onRemove(task.id)"
                                      class="text-red-600 hover:underline"
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Task Form Modal -->
      <div
        v-if="showTaskModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div
          class="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 dark:bg-gray-800"
        >
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Add Task
            </h2>
            <button
              @click="closeTaskModal"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <TaskForm
            :task="task"
            :projects="projects"
            :roles="roles"
            :statuses="statuses"
            :pirorities="pirorities"
            :roleUsers="roleUsers"
            :isLoading="isLoading"
            :errMsg="errMsg"
            @submit="handleTaskSubmit"
            @close="closeTaskModal"
            @getProject="fetchProject"
            @getRole="fetchRole"
          />
        </div>
      </div>
      <ConfirmationModal
        :isVisible="showConfirmModal"
        title="Confirm Deletion"
        message="Are you sure you want to delete this project type?"
        :showInput="true"
        confirmText="DELETE"
        @close="showConfirmModal = false"
        @confirm="confirmDelete"
      />
    </div>
  </PageComponentVue>
</template>

<script setup>
import PageComponentVue from "@/components/DefaultLayout/PageComponent.vue";
import { useScheduleStore } from "@/stores/masterschedule";
import { computed, onBeforeMount, ref } from "vue";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";
import TaskForm from "@/components/ui/forms/TaskForm.vue";

const store = useScheduleStore();

const isLoading = computed(() => store.isLoading);
const notification = computed(() => store.notification);
const schedules = computed(() => store.schedules);
// const schedule = computed(() => store.currentSchedule)

const search = ref({ query: "" });

// Modal states
const showTaskModal = ref(false);

// Task form data
const task = ref({
  name: "",
  project_id: "",
  start_date: "",
  end_date: "",
  created_by: "",
  status_id: "",
  priority_id: "",
  progress: "",
  description: "",
});

// Open task modal and set project_id
const openTaskModal = (scheduleId) => {
  const schedule = schedules.value.find((s) => s.id === scheduleId);
  if (schedule) {
    task.value.project_id = schedule.project_id;
  }
  showTaskModal.value = true;
};

// Close task modal
const closeTaskModal = () => {
  showTaskModal.value = false;
};

// Handle task form submission
const handleTaskSubmit = (taskData) => {
  console.log("Task submitted:", taskData);
  // Add your task submission logic here
  closeTaskModal();
};

// Expanded schedules (for showing tasks dynamically)

const viewSchedule = ref(false);
const viewTask = ref(false);
const expandedScheduleId = ref(null);

const toggleSchedule = (scheduleId) => {
  expandedScheduleId.value =
    expandedScheduleId.value === scheduleId ? null : scheduleId;
  viewSchedule.value = !viewSchedule.value;
  // viewTask.value = false;
  expandedTaskId.value = null;
};

const expandedTaskId = ref(null);

const toggleTasks = (taskId) => {
  expandedTaskId.value = expandedTaskId.value === taskId ? null : taskId;
  viewTask.value = !viewTask.value;
  // viewSchedule.value = false
};

// Other function
const openEditModal = (id) => {
  console.log("edit schedule/task:", id);
};

const onRemove = (id) => {
  console.log("Remove Schedule/Task:", id);
};

const showConfirmModal = ref(false);
const confirmInput = ref("");
const scheduleToDelete = ref(null);

const openConfirmModal = (scheduleId) => {
  scheduleToDelete.value = scheduleId;
  showConfirmModal.value = true;
};

const confirmDelete = () => {
  if (scheduleToDelete.value) {
    store.deleteSchedule(scheduleToDelete.value);
  }
  showConfirmModal.value = false;
  confirmInput.value = "";
};

// const schedule = ref({
//     name: '',
//     project_i
// })

onBeforeMount(() => {
  store.getSchedules();
});
</script>
