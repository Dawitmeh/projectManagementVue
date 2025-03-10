<template>
  <form @submit.prevent="handleSubmit">
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
          @input="getProject($event.target.value)"
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
      </div>
      <div>
        <label
          for="role"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Assign To</label
        >
        <select
          id="role"
          @input="getRole($event.target.value)"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose a user</option>
          <option v-for="(role, index) in roles" :key="index" :value="role?.id">
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
      <fwb-button color="default" pill> Submit </fwb-button>
    </div>
  </form>
</template>

<script setup>
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import ErrorAlert from "@/components/ui/ErrorAlert.vue";
import { FwbButton } from "flowbite-vue";

const props = defineProps({
  task: { type: Object, required: true },
  projects: { type: Array, required: true },
  roles: { type: Array, required: true },
  statuses: { type: Array, required: true },
  pirorities: { type: Array, required: true },
  roleUsers: { type: Array, required: true },
  isLoading: { type: Boolean, default: false },
  errMsg: { type: String, default: "" },
});

const emit = defineEmits(["submit", "close", "getProject", "getRole"]);

const handleSubmit = () => {
  emit("submit", props.task);
};

const closeModal = () => {
  emit("close");
};

const getProject = (projectId) => {
  emit("getProject", projectId);
};

const getRole = (roleId) => {
  emit("getRole", roleId);
};
</script>
