<template>
  <PageComponentVue>
    <!-- Notification Section -->
    <div class="mt-3 mb-3">
      <div
        v-if="notification.show == true"
        class="p-3 text-white animate-fade-in-down rounded-md"
        :class="[notification.type === 'success' ? 'bg-success' : 'bg-error']"
      >
        {{ notification.message }}
      </div>
    </div>

    <!-- Grid Layout for Cards -->
    <div
      class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"
    >
      <div class="relative w-full mb-6 group">
        <router-link
          :to="{ name: 'ProjectType' }"
          class="block max-w-sm p-6 bg-primary border border-border rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          <p class="mt-3 font-bold text-white">Project Types</p>
        </router-link>
      </div>
    </div>

    <!-- Search and Create Project Section -->
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
                  class="w-5 h-5 text-muted dark:text-gray-400"
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
                class="block w-full p-2 pl-10 text-sm text-text border border-border rounded-lg bg-background focus:ring-secondary focus:border-secondary"
                placeholder="Search"
                required=""
              />
            </div>
          </form>
        </div>
        <button
          @click="showModal"
          class="mt-5 py-2 px-3 text-white bg-secondary rounded-md hover:bg-accent transition-all duration-300 transform hover:scale-105"
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
          Create project
        </button>
      </div>

      <!-- Loading Spinner -->
      <div v-if="isLoading != false">
        <div role="status" class="text-center mt-6 mb-6">
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-secondary"
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
    </div>

    <!-- Table Section -->
    <div v-if="!isLoading" class="overflow-x-auto">
      <table
        class="w-full text-sm text-left border border-border rounded-lg shadow-md bg-card animate-fadeIn"
      >
        <thead class="text-xs text-white bg-tableHeader uppercase">
          <tr>
            <th scope="col" class="px-6 py-4">Title</th>
            <th scope="col" class="px-6 py-4">Site</th>
            <th scope="col" class="px-6 py-4">Assigned to</th>
            <th scope="col" class="px-6 py-4">Client</th>
            <th scope="col" class="px-6 py-4">Start Date</th>
            <th scope="col" class="px-6 py-4">End Date</th>
            <th scope="col" class="px-6 py-4">Duration</th>
            <th scope="col" class="px-6 py-4">Budget</th>
            <th scope="col" class="px-6 py-4">Priority</th>
            <th scope="col" class="px-6 py-4">Status</th>
            <th scope="col" class="px-6 py-4">Created Date</th>
            <th scope="col" class="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(project, index) in projects"
            :key="index"
            class="border-b border-border hover:bg-highlight transition duration-200"
          >
            <td class="px-6 py-4 font-medium text-text whitespace-nowrap">
              {{ project.name }}
            </td>
            <td class="px-6 py-4 text-muted">
              {{ project?.site?.name || "N/A" }}
            </td>
            <td class="px-6 py-4">
              {{ project?.assigned_to?.first_name || "Unassigned" }}
            </td>
            <td class="px-6 py-4">
              {{ project?.client?.first_name || "N/A" }}
            </td>
            <td class="px-6 py-4">{{ project?.start_date }}</td>
            <td class="px-6 py-4">{{ project?.end_date }}</td>
            <td class="px-6 py-4">{{ project?.duration }}</td>
            <td class="px-6 py-4 text-success font-semibold">
              {{ project?.budget }} ETB
            </td>
            <td class="px-6 py-4 text-warning">
              {{ project?.priority?.name || "Medium" }}
            </td>
            <td class="px-6 py-4 text-info">{{ project?.status?.name }}</td>
            <td class="px-6 py-4 text-muted">{{ project?.created_at }}</td>
            <td class="px-6 py-4 flex items-center space-x-4">
              <button
                v-if="project.id"
                @click="openEditModal(project.id)"
                class="px-3 py-2 rounded-md text-white bg-secondary hover:bg-accent transition"
              >
                Add Task
              </button>
              <router-link
                v-if="project.id"
                :to="{ name: 'ProjectView', params: { id: project.id } }"
                class="text-info hover:underline"
                >View</router-link
              >
              <button
                v-if="project.id"
                @click="openEditModal(project.id)"
                class="text-accent hover:underline"
              >
                Edit
              </button>
              <button
                @click="openConfirmModal(project.id)"
                class="text-error hover:underline"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Confirmation Modal -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-lg font-semibold text-gray-800">Confirm Deletion</h2>
        <p class="text-gray-600 mt-2">
          Are you sure you want to delete this project?
        </p>
        <input
          v-model="confirmInput"
          type="text"
          placeholder='Type "DELETE" to confirm'
          class="mt-4 p-2 border rounded w-full"
        />
        <div class="flex justify-end space-x-3 mt-4">
          <button
            @click="showConfirmModal = false"
            class="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            :disabled="confirmInput !== 'DELETE'"
            class="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Section -->
    <fwb-modal v-if="isShowModal" @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg text-white">
          {{ isEditing ? "Edit Project" : "Add Project" }}
        </div>
      </template>
      <template #body>
        <form @submit.prevent="createProject">
          <div v-if="isLoading" class="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-secondary"
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
          <div>
            <div
              v-if="errMsg"
              id="alert-border-2"
              class="flex items-center p-4 mb-4 text-error border-t-4 border-error bg-red-50"
              role="alert"
            >
              <svg
                class="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                />
              </svg>
              <div class="ml-3 text-sm font-medium">
                {{ errMsg }}
              </div>
            </div>
          </div>
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-background"
                >Title</label
              >
              <input
                type="text"
                v-model="project.name"
                id="name"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
                placeholder="title"
              />
            </div>
            <div>
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-background"
                >Project type</label
              >
              <select
                id="countries"
                v-model="project.project_type_id"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
              >
                <option selected>Choose a type</option>
                <option
                  v-for="(type, index) in projectTypes"
                  :key="index"
                  :value="type?.id"
                >
                  {{ type?.name }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-background"
                >Start date</label
              >
              <input
                type="date"
                v-model="project.start_date"
                id="name"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
                placeholder="start date"
              />
            </div>
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-background"
                >End date</label
              >
              <input
                type="date"
                v-model="project.end_date"
                id="name"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
                placeholder="end date"
              />
            </div>
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-background"
                >Budget</label
              >
              <input
                type="text"
                v-model="project.budget"
                id="name"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
                placeholder="budget"
              />
            </div>
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-background"
                >Progress</label
              >
              <input
                type="text"
                v-model="project.progress"
                id="name"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
                placeholder="progress"
              />
            </div>
            <div>
              <label
                for="client"
                class="block mb-2 text-sm font-medium text-background"
                >Client</label
              >
              <select
                id="client"
                v-model="project.client_id"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
              >
                <option selected>Choose a client</option>
                <option
                  v-for="(client, index) in clients"
                  :key="index"
                  :value="client?.id"
                >
                  {{ client?.first_name }} {{ client?.last_name }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="role"
                class="block mb-2 text-sm font-medium text-background"
                >Assign To</label
              >
              <select
                id="role"
                @input="roleStore.getRole($event.target.value)"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
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
                class="block mb-2 text-sm font-medium text-background"
                >{{ role?.name }} Users</label
              >
              <select
                id="user"
                v-model="project.assigned_id"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
              >
                <option selected>Choose a user</option>
                <option
                  v-for="(user, index) in users"
                  :key="index"
                  :value="user?.id"
                >
                  {{ user?.first_name }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="site"
                class="block mb-2 text-sm font-medium text-background"
                >Site</label
              >
              <select
                id="site"
                v-model="project.site_id"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
              >
                <option selected>Choose a site</option>
                <option
                  v-for="(site, index) in sites"
                  :key="index"
                  :value="site?.id"
                >
                  {{ site?.name }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-background"
                >Status</label
              >
              <select
                id="countries"
                v-model="project.status_id"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
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
                class="block mb-2 text-sm font-medium text-background"
                >Priority</label
              >
              <select
                id="priority"
                v-model="project.pirority_id"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
              >
                <option selected>Choose a priority</option>
                <option
                  v-for="(priority, index) in priorities"
                  :key="index"
                  :value="priority?.id"
                >
                  {{ priority?.name }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="favourite"
                class="block mb-2 text-sm font-medium text-background"
                >Is Favourite</label
              >
              <select
                id="favourite"
                v-model="project.is_favorite"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
              >
                <option value="1">True</option>
                <option value="0">False</option>
              </select>
            </div>
            <div>
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-background"
                >Description</label
              >
              <textarea
                id="description"
                rows="4"
                v-model="project.description"
                class="block p-2.5 w-full text-sm text-text bg-background rounded-lg border border-border focus:ring-secondary focus:border-secondary"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
          </div>
          <div class="flex justify-between">
            <button
              @click="closeModal"
              type="button"
              class="text-text bg-background hover:bg-card focus:ring-4 focus:outline-none focus:ring-secondary rounded-lg border border-border text-sm font-medium px-5 py-2.5 hover:text-text focus:z-10"
            >
              Cancel
            </button>
            <fwb-button color="default" pill> Submit </fwb-button>
          </div>
        </form>
      </template>
    </fwb-modal>
  </PageComponentVue>
</template>

<script setup>
import PageComponentVue from "@/components/DefaultLayout/PageComponent.vue";
import { useProjectStore } from "@/stores/projects";
import { computed, ref, watch, onBeforeMount } from "vue";
import { FwbButton, FwbModal } from "flowbite-vue";
import { useClientStore } from "@/stores/client";
import { useUserStore } from "@/stores/users";
import { useSiteStore } from "@/stores/sites";
import { usePirorityStore } from "@/stores/pirority";
import { useStatusStore } from "@/stores/status";
import { useRoleStore } from "@/stores/roles";
import { useProjectTypeStore } from "@/stores/projectType";

const store = useProjectStore();
const clientStore = useClientStore();
const userStore = useUserStore();
const siteStore = useSiteStore();
const priorityStore = usePirorityStore();
const statusStore = useStatusStore();
const roleStore = useRoleStore();
const typeStore = useProjectTypeStore();

const isLoading = computed(() => store.isLoading);
const notification = computed(() => store.notification);
const errMsg = computed(() => store.errMsg);
const projects = computed(() => store.projects);
const projectTypes = computed(() => typeStore.projectTypes);
const clients = computed(() => clientStore.clients);
const users = computed(() => userStore.staffs);
const roles = computed(() => roleStore.roles);
const role = computed(() => roleStore.currentRole);
const roleUsers = computed(() => roleStore.roleUsers);
const sites = computed(() => siteStore.sites);
const priorities = computed(() => priorityStore.pirorities);
const statuses = computed(() => statusStore.statuses);

const search = ref({ query: "" });

const project = ref({
  name: "",
  client_id: "",
  assigned_id: "",
  site_id: "",
  project_type_id: "",
  pirority_id: "",
  status_id: "",
  description: "",
  start_date: "",
  end_date: "",
  budget: "",
  progress: "",
  is_favorite: false,
});

watch(
  () => store.currentProject,
  (newVal) => {
    if (newVal) {
      project.value = {
        ...JSON.parse(JSON.stringify(newVal)),
        start_date: formatDate(newVal.start_date),
        end_date: formatDate(newVal.end_date),
      };
    }
  },
  { immediate: true }
);

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
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
  project.value = {
    name: "",
    client_id: "",
    assigned_id: "",
    site_id: "",
    project_type_id: "",
    pirority_id: "",
    status_id: "",
    description: "",
    start_date: "",
    end_date: "",
    budget: "",
    progress: "",
    is_favorite: false,
  };
}

async function openEditModal(selectedProject) {
  if (!selectedProject || !selectedProject.id) return;

  await store.getProject(selectedProject.id);

  project.value = {
    ...JSON.parse(JSON.stringify(store.currentProject)),
    start_date: formatDate(store.currentProject.start_date),
    end_date: formatDate(store.currentProject.end_date),
  };

  isShowModal.value = true;
  isEditing.value = true;
}

async function createProject(e) {
  e.preventDefault();
  if (!project.value.name) return;

  try {
    if (isEditing.value) {
      await store.updateProject(project.value.id, project.value);
      store.notify({
        type: "success",
        message: "The project was successfully updated",
      });
    } else {
      await store.createProjects(project.value);
      store.notify({
        type: "success",
        message: "The project was successfully created",
      });
    }
    await store.getProjects();
    closeModal();
  } catch (error) {
    console.error("Error creating/updating project:", error);

    // Extract detailed error messages
    store.errMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred.";

    // Keep modal open if an error occurs
    setTimeout(() => closeModal(), 3000);
  }
}

const showConfirmModal = ref(false);
const confirmInput = ref("");
const projectToDelete = ref(null);

const openConfirmModal = (projectId) => {
  projectToDelete.value = projectId;
  showConfirmModal.value = true;
};

const confirmDelete = () => {
  if (projectToDelete.value) {
    store.deleteProject(projectToDelete.value);
  }
  showConfirmModal.value = false;
  confirmInput.value = "";
};

onBeforeMount(() => {
  store.getProjects();
  clientStore.getClients();
  userStore.getUsers();
  roleStore.getRoles();
  siteStore.getSites();
  typeStore.getProjectTypes();
  priorityStore.getPirorities();
  statusStore.getStatuses();
});
</script>
