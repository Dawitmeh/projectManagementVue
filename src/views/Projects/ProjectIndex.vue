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
          class="block max-w-sm p-6 bg-primary border border-border rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 dark:bg-tableBg dark:border-tableHeader "
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
          <p class="mt-3 font-bold text-white dark:text-white">Project Types</p>
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
                class="block w-full p-2 pl-10 text-sm text-text border border-border rounded-lg bg-background focus:ring-secondary focus:border-secondary dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
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
            class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-secondary"
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

      <!-- Table Section -->
      <div v-else>
        <table class="w-full text-sm text-left text-text dark:text-gray-400">
          <thead
            class="text-xs text-text bg-background dark:bg-tableHeader dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Title</th>
              <th scope="col" class="px-6 py-3">Site</th>
              <th scope="col" class="px-6 py-3">Assigned to</th>
              <th scope="col" class="px-6 py-3">Client</th>
              <th scope="col" class="px-6 py-3">Start date</th>
              <th scope="col" class="px-6 py-3">End date</th>
              <th scope="col" class="px-6 py-3">Duration</th>
              <th scope="col" class="px-6 py-3">Budget</th>
              <th scope="col" class="px-6 py-3">Priority</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Created Date</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(project, index) in projects"
              :key="index"
              class="bg-white border-b dark:bg-tableBg dark:border-tableHeader"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-text whitespace-nowrap dark:text-white"
              >
                {{ project.name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-text whitespace-nowrap dark:text-white"
              >
                {{ project?.site?.name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-text whitespace-nowrap dark:text-white"
              >
                {{ project?.assigned_to?.first_name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-text whitespace-nowrap dark:text-white"
              >
                {{ project?.client?.first_name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-text whitespace-nowrap dark:text-white"
              >
                {{ project?.start_date }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-text whitespace-nowrap dark:text-white"
              >
                {{ project?.end_date }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-text whitespace-nowrap dark:text-white"
              >
                {{ project?.duration }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-text whitespace-nowrap dark:text-white"
              >
                {{ project?.budget }} ETB
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-text whitespace-nowrap dark:text-white"
              >
                {{ project?.pirority?.name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-text whitespace-nowrap dark:text-white"
              >
                {{ project?.status?.name }}
              </th>
              <td class="px-6 py-4">
                {{ project.created_at }}
              </td>
              <td class="flex items-center px-6 py-4 space-x-3">
                <button
                  v-if="project.id"
                  @click="openEditModal(project.id)"
                  class="font-medium text-secondary dark:text-secondary hover:underline"
                >
                  Add task
                </button>
                <router-link
                  v-if="project.id"
                  :to="{ name: 'ProjectView', params: { id: project.id } }"
                  class="font-medium text-info dark:text-info hover:underline"
                  >View</router-link
                >
                <button
                  v-if="project.id"
                  @click="openEditModal(project.id)"
                  class="font-medium text-info dark:text-info hover:underline"
                >
                  Edit
                </button>
                <button
                  @click="onRemove(project?.id)"
                  class="font-medium text-error dark:text-error hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
        <form @submit="createProject">
          <div v-if="isLoading" class="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-secondary"
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
              v-if="errMsg != false"
              id="alert-border-2"
              class="flex items-center p-4 mb-4 text-error border-t-4 border-error bg-red-50 dark:text-error dark:bg-gray-800 dark:border-error"
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
                class="block mb-2 text-sm font-medium text-text dark:text-white"
                >Title</label
              >
              <input
                type="text"
                v-model="project.name"
                id="name"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                placeholder="site name"
              />
            </div>
            <div>
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-text dark:text-white"
                >Project type</label
              >
              <select
                id="countries"
                v-model="project.project_type_id"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
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
                class="block mb-2 text-sm font-medium text-text dark:text-white"
                >Start date</label
              >
              <input
                type="date"
                v-model="project.start_date"
                id="name"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                placeholder="site name"
              />
            </div>
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-text dark:text-white"
                >End date</label
              >
              <input
                type="date"
                v-model="project.end_date"
                id="name"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                placeholder="site name"
              />
            </div>
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-text dark:text-white"
                >Budget</label
              >
              <input
                type="text"
                v-model="project.budget"
                id="name"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                placeholder="site name"
              />
            </div>
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-text dark:text-white"
                >Progress</label
              >
              <input
                type="text"
                v-model="project.progress"
                id="name"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                placeholder="site name"
              />
            </div>
            <div>
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-text dark:text-white"
                >Client</label
              >
              <select
                id="countries"
                v-model="project.client_id"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
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
                for="countries"
                class="block mb-2 text-sm font-medium text-text dark:text-white"
                >Assign To</label
              >
              <select
                id="countries"
                @input="roleStore.getRole($event.target.value)"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
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
                for="countries"
                class="block mb-2 text-sm font-medium text-text dark:text-white"
                >{{ role?.name }} Users</label
              >
              <select
                id="countries"
                v-model="project.assigned_id"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
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
                for="countries"
                class="block mb-2 text-sm font-medium text-text dark:text-white"
                >Site</label
              >
              <select
                id="countries"
                v-model="project.site_id"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
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
                class="block mb-2 text-sm font-medium text-text dark:text-white"
                >Status</label
              >
              <select
                id="countries"
                v-model="project.status_id"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
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
                for="countries"
                class="block mb-2 text-sm font-medium text-text dark:text-white"
                >Priority</label
              >
              <select
                id="countries"
                v-model="project.pirority_id"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
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
                for="countries"
                class="block mb-2 text-sm font-medium text-text dark:text-white"
                >Is Favorite</label
              >
              <select
                id="countries"
                v-model="project.is_favorite"
                class="bg-background border border-border text-text text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
              >
                <option value="1">True</option>
                <option value="0">False</option>
              </select>
            </div>
            <div>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-text dark:text-white"
                >Description</label
              >
              <textarea
                id="message"
                rows="4"
                v-model="project.description"
                class="block p-2.5 w-full text-sm text-text bg-background rounded-lg border border-border focus:ring-secondary focus:border-secondary dark:bg-tableBg dark:border-tableHeader dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
          </div>
          <div class="flex justify-between">
            <button
              @click="closeModal"
              type="button"
              class="text-text bg-background hover:bg-card focus:ring-4 focus:outline-none focus:ring-secondary rounded-lg border border-border text-sm font-medium px-5 py-2.5 hover:text-text focus:z-10 dark:bg-tableBg dark:text-gray-300 dark:border-tableHeader dark:hover:text-white dark:hover:bg-secondary dark:focus:ring-secondary"
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
import { computed, onBeforeMount, ref, watch } from "vue";
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
}

function openEditModal(selectedProject) {
  if (selectedProject) {
    store.getProject(selectedProject);
  }
  isShowModal.value = true;
  isEditing.value = true;
}

function createProject(e) {
  e.preventDefault();
  const action = isEditing.value ? "updated" : "created";
  const apiCall = isEditing.value ? store.updateProject : store.createProjects;

  apiCall(project.value)
    .then(() => {
      store.notify({
        type: "success",
        message: `The project was successfully ${action}`,
      });
      store.getProjects();
      closeModal();
    })
    .catch(() => {
      setTimeout(() => {
        closeModal();
      }, 3000);
    });
}

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
