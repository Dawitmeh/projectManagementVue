<template>
  <PageComponentVue>
    <div class="mt-3 mb-3">
      <Notification
        :show="notification.show"
        :type="notification.type"
        :message="notification.message"
      />
    </div>
    <div class="flex mt-4">
      <CardComponent
        title="Completed"
        value="2"
        link="/tasks/completed"
        iconColor="#71dd37"
      />
      <CardComponent
        title="In Progress"
        value="2"
        link="/tasks/inProgress"
        iconColor="#696cff"
      />
      <CardComponent
        title="Not Started"
        value="2"
        link="/tasks/notStarted"
        iconColor="#ffab00"
      />
      <CardComponent
        title="Cancelled"
        value="2"
        link="/tasks/cancelled"
        iconColor="#ff3e1d"
      />
    </div>
    <div class="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
      <div
        class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4"
      >
        <div class="w-full md:w-1/2">
          <Search v-model:query="searchQuery" @search="handleSearch" />
        </div>
        <button
          @click="showModal"
          class="mt-5 py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 -mt-1 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Task
        </button>
      </div>
      <div v-if="isLoading">
        <LoadingSpinner />
      </div>
      <div v-else>
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Title</th>
              <th scope="col" class="px-6 py-3">Project</th>
              <th scope="col" class="px-6 py-3">Assigned to</th>
              <th scope="col" class="px-6 py-3">Start date</th>
              <th scope="col" class="px-6 py-3">End date</th>
              <th scope="col" class="px-6 py-3">Duration</th>
              <th scope="col" class="px-6 py-3">Priroty</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Created Date</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(task, index) in tasks"
              :key="index"
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ task.name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ task?.project?.name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ task?.assigned_to?.first_name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ task?.start_date }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ task?.end_date }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ task?.duration }} (Days)
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ task?.priority?.name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ task?.status?.name }}
              </th>
              <td class="px-6 py-4">
                {{ task.created_at }}
              </td>
              <td class="flex items-center px-6 py-4 space-x-3">
                <button
                  v-if="task.id"
                  @click="openEditModal(task.id)"
                  class="font-medium text-emerald-600 dark:text-emerald-500 hover:underline"
                >
                  Add activity
                </button>
                <router-link
                  v-if="task.id"
                  :to="{ name: 'TaskView', params: { id: task.id } }"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >View</router-link
                >
                <button
                  v-if="task.id"
                  @click="openEditModal(task.id)"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  @click="openConfirmModal(task?.id)"
                  class="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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

    <!-- Modal -->
    <fwb-modal v-if="isShowModal" @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg text-white">
          {{ isEditing ? "Edit Task" : "Add Task" }}
        </div>
      </template>
      <template #body>
        <form @submit="createTask">
          <div v-if="isLoading" class="text-center">
            <LoadingSpinner />
          </div>
          <div>
            <ErrorAlert :message="errMsg" />
          </div>
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Title</label
              >
              <input
                type="text"
                v-model="task.name"
                id="title"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="title"
              />
              <!-- <div v-if="validationErr.name" class="text-red-500 text-xs mt-1">
                {{ validationErr.name[0] }}
              </div> -->
            </div>
            <div>
              <label
                for="project"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Project</label
              >
              <select
                id="project"
                v-model="task.project_id"
                @input="projectStore.getProject($event.target.value)"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a type</option>
                <option
                  v-for="(type, index) in projects"
                  :key="index"
                  :value="type?.id"
                >
                  {{ type?.name }}
                </option>
              </select>
            </div>

            <div>
              <label
                for="start_date"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Start date</label
              >
              <input
                type="date"
                v-model="task.start_date"
                id="start_date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="start date"
              />
              <!-- <div v-if="validationErr.name" class="text-red-500 text-xs mt-1">
                {{ validationErr.name[0] }}
              </div> -->
            </div>
            <div>
              <label
                for="end_date"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >End date</label
              >
              <input
                type="date"
                v-model="task.end_date"
                id="end_Date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="end date"
              />
              <!-- <div v-if="validationErr.name" class="text-red-500 text-xs mt-1">
                                {{ validationErr.name[0] }}
                                </div> -->
            </div>
            <div>
              <label
                for="role"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Assign To</label
              >
              <select
                id="role"
                @input="roleStore.getRole($event.target.value)"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a user</option>
                <option
                  v-for="(role, index) in roles"
                  :key="index"
                  :value="role?.id"
                >
                  {{ role?.name }}
                </option>
              </select>
            </div>
            <div v-if="roleUsers.length > 0">
              <label
                for="user"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >{{ role?.name }} Users</label
              >
              <select
                id="user"
                v-model="task.created_by"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a user</option>
                <option
                  v-for="(user, index) in roleUsers"
                  :key="index"
                  :value="user?.id"
                >
                  {{ user?.first_name }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="status"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Status</label
              >
              <select
                id="status"
                v-model="task.status_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a status</option>
                <option
                  v-for="(status, index) in statuses"
                  :key="index"
                  :value="status?.id"
                >
                  {{ status?.name }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="priority"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Priority</label
              >
              <select
                id="priority"
                v-model="task.priority_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a priority</option>
                <option
                  v-for="(priority, index) in pirorities"
                  :key="index"
                  :value="priority?.id"
                >
                  {{ priority?.name }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="progress"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Progress (%)</label
              >
              <input
                type="text"
                v-model="task.progress"
                id="progress"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="progress"
              />
              <!-- <div v-if="validationErr.name" class="text-red-500 text-xs mt-1">
                {{ validationErr.name[0] }}
              </div> -->
            </div>
            <div>
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Description</label
              >
              <textarea
                id="description"
                rows="4"
                v-model="task.description"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
          </div>
          <div class="flex justify-between">
            <button
              @click="closeModal"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
            <fwb-button color="default" pill>
              <!-- <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> -->
              Submit
            </fwb-button>
          </div>
        </form>
      </template>
    </fwb-modal>
  </PageComponentVue>
</template>

<script setup>
import PageComponentVue from "@/components/DefaultLayout/PageComponent.vue";
import { usePirorityStore } from "@/stores/pirority";
import { useProjectStore } from "@/stores/projects";
import { useRoleStore } from "@/stores/roles";
import { useUserStore } from "@/stores/users";
import { useStatusStore } from "@/stores/status";
import { useTaskStore } from "@/stores/tasks";
import { computed, onBeforeMount, ref, watch } from "vue";
import { FwbButton, FwbModal } from "flowbite-vue";
import Search from "../../components/ui/Search.vue";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import ErrorAlert from "@/components/ui/ErrorAlert.vue";
import Notification from "@/components/ui/Notification.vue";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";
import CardComponent from "@/components/ui/CardComponent.vue";

const store = useTaskStore();
const roleStore = useRoleStore();
const userStore = useUserStore();
const projectStore = useProjectStore();
const prirotyStore = usePirorityStore();
const statusStore = useStatusStore();

const isLoading = computed(() => store.isLoading);
const notification = computed(() => store.notification);
const tasks = computed(() => store.tasks);
const statuses = computed(() => statusStore.statuses);
const roleUsers = computed(() => roleStore.roleUsers);
const roles = computed(() => roleStore.roles);
const role = computed(() => roleStore.currentRole);
const pirorities = computed(() => prirotyStore.pirorities);
const projects = computed(() => projectStore.projects);
const project = computed(() => projectStore.currentProject);
const users = computed(() => userStore.staffs);

const task = ref({
  name: "",
  project_id: "",
  status_id: "",
  priority_id: "",
  start_date: "",
  end_date: "",
  created_by: "",
  description: "",
  progress: "",
});

const searchQuery = ref("");

function handleSearch(query) {
  console.log("Search query:", query);
  // Perform search logic here
}

watch(
  () => store.currentTask,
  (newVal) => {
    if (newVal) {
      task.value = {
        ...JSON.parse(JSON.stringify(newVal)),
        start_date: formatDate(newVal.start_date),
        end_date: formatDate(newVal.end_date),
      };
    }
  },
  { immediate: true } // Run immediately when the component mounts
);

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Format: 'YYYY-MM-DD'
}

const isShowModal = ref(false);
const isEditing = ref(false);

function closeModal() {
  isShowModal.value = false;
  isEditing.value = false;
}

function showModal() {
  isShowModal.value = true;
  isEditing.value = false;
}

function openEditModal(selectedTask) {
  if (selectedTask) {
    store.getTask(selectedTask);
  }
  isShowModal.value = true;
  isEditing.value = true;
}

const errMsg = ref("");

function createTask(e) {
  e.preventDefault();
  const action = isEditing.value ? "updated" : "created";
  const apiCall = isEditing.value ? store.updateTask : store.createTask;
  apiCall({ ...task.value })
    .then(() => {
      store.notify({
        type: "success",
        message: "The Task was successfully " + action,
      });
      closeModal();
      store.getTasks();
    })
    .catch((err) => {
      console.log(err.response.data);
      errMsg.value = err.response.data || "An error occurred";
      setTimeout(() => {
        closeModal();
        errMsg.value = "";
      }, 3000);
    });
}

const showConfirmModal = ref(false);
const confirmInput = ref("");
const taskToDelete = ref(null);

const openConfirmModal = (taskId) => {
  taskToDelete.value = taskId;
  showConfirmModal.value = true;
};

const confirmDelete = () => {
  if (taskToDelete.value) {
    store.deleteTask(taskToDelete.value);
  }
  showConfirmModal.value = false;
  confirmInput.value = "";
};

onBeforeMount(() => {
  store.getTasks();
  roleStore.getRoles();
  statusStore.getStatuses();
  prirotyStore.getPirorities();
  projectStore.getProjects();
});
</script>
