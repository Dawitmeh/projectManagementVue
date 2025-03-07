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
          Create Activity
        </button>
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
              <th scope="col" class="px-6 py-3">Title</th>
              <th scope="col" class="px-6 py-3">Project</th>
              <th scope="col" class="px-6 py-3">Task</th>
              <th scope="col" class="px-6 py-3">Unit</th>
              <th scope="col" class="px-6 py-3">Quantity</th>
              <th scope="col" class="px-6 py-3">Start Date</th>
              <th scope="col" class="px-6 py-3">End Date</th>
              <th scope="col" class="px-6 py-3">Duration</th>
              <th scope="col" class="px-6 py-3">Priority</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Approval</th>
              <th scope="col" class="px-6 py-3">Remark</th>
              <th scope="col" class="px-6 py-3">Progress</th>
              <th scope="col" class="px-6 py-3">Created Date</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(activity, index) in activities"
              :key="index"
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ activity.name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ activity.task?.project?.name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ activity?.task?.name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ activity?.unit?.name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ activity?.quantity }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ activity?.start_date }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ activity?.end_date }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ activity?.duration }} (Days)
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ activity?.priority?.name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ activity?.status?.name }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ activity?.progress }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ activity?.remark }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ activity?.progress }}
              </th>
              <td class="px-6 py-4">
                {{ activity.created_at }}
              </td>
              <td class="flex items-center px-6 py-4 space-x-3">
                <router-link
                  v-if="activity.id"
                  :to="{ name: 'ActivityView', params: { id: activity.id } }"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >View</router-link
                >
                <button
                  v-if="activity.id"
                  @click="openEditModal(activity.id)"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  v-if="activity.id"
                  @click="openEditModal(activity.id)"
                  class="font-medium text-emerald-600 dark:text-emerald-500 hover:underline"
                >
                  Request
                </button>
                <button
                  @click="openConfirmModal(activity?.id)"
                  class="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </button>
                <!-- <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a> -->
              </td>
            </tr>
          </tbody>
        </table>
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
      <!-- <nav class="flex flex-col mt-3 bg-white border-gray-200 rounded-md shadow-sm items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0 w-full" aria-label="Page navigation example">
                <ul class="inline-flex flex-wrap -space-x-px text-sm">
                  <li>
                    <a 
                      href="#"
                      class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-emerald-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      @click.prevent="previousPage"
                    >
                      Previous
                    </a>
                  </li>
                  <li
                    v-for="pageNumber in totalPages"
                    :key="pageNumber"
                    @click="changePage(pageNumber)"
                    :class="{ 'font-bold': pageNumber === currentPage}"
                  >
                    <a
                      href="#"
                      :class="{
                        'flex items-center justify-center px-3 h-8 leading-tight text-emerald-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': pageNumber !== currentPage,
                        'flex items-center justify-center px-3 h-8 text-emerald-500 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-emerald-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': pageNumber === currentPage
                      }"
                    >
                      {{ pageNumber }}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#"
                      class="flex items-center justify-center px-3 h-8 leading-tight text-emerald-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      @click.prevent="nextPage"
                    >
                      Next
                    </a>
                  </li>
                </ul>
            </nav> -->
    </div>

    <!-- Modal -->
    <fwb-modal v-if="isShowModal" @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg text-white">
          {{ isEditing ? "Edit Activity" : "Add Activity" }}
        </div>
      </template>
      <template #body>
        <form @submit="createActivity">
          <div v-if="isLoading" class="text-center">
            <div role="status">
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
          <div>
            <div
              v-if="errMsg"
              id="alert-border-2"
              class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
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
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Title</label
              >
              <input
                type="text"
                v-model="activity.name"
                id="title"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter activity title"
              />
            </div>
            <div>
              <label
                for="task"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Task</label
              >
              <select
                id="task"
                v-model="activity.task_id"
                @input="taskStore.getTask($event.target.value)"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a task</option>
                <option
                  v-for="(task, index) in tasks"
                  :key="index"
                  :value="task?.id"
                >
                  {{ task?.name }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="task_start_date"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Task Start Date:
                <span
                  class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                >
                  {{ task?.start_date }}
                </span>
              </label>
            </div>
            <div>
              <label
                for="task_end_date"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Task End Date:
                <span
                  class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                >
                  {{ task?.end_date }}
                </span>
              </label>
            </div>
            <div>
              <label
                for="start_date"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Start date</label
              >
              <input
                type="date"
                v-model="activity.start_date"
                id="start_date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Select start date"
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
                v-model="activity.end_date"
                id="end_date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Select end date"
              />
            </div>
            <div>
              <label
                for="status"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Status</label
              >
              <select
                id="status"
                v-model="activity.status_id"
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
                v-model="activity.pirority_id"
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
                for="unit"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Unit</label
              >
              <select
                id="unit"
                v-model="activity.unit_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a unit</option>
                <option
                  v-for="(unit, index) in units"
                  :key="index"
                  :value="unit?.id"
                >
                  {{ unit?.name }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="quantity"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Quantity</label
              >
              <input
                type="text"
                v-model="activity.quantity"
                id="quantity"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter quantity"
              />
            </div>
            <div>
              <label
                for="progress"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Progress</label
              >
              <input
                type="text"
                v-model="activity.progress"
                id="progress"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter progress"
              />
            </div>
            <div>
              <label
                for="remark"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Remark</label
              >
              <input
                type="text"
                v-model="activity.remark"
                id="remark"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter remark"
              />
            </div>
            <div>
              <label
                for="approval"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Approval</label
              >
              <select
                id="approval"
                v-model="activity.approval"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label
                for="issue"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Issue</label
              >
              <textarea
                id="issue"
                rows="4"
                v-model="activity.issue"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Describe the issue"
              ></textarea>
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
                v-model="activity.description"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Describe the activity"
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
    </fwb-modal>
  </PageComponentVue>
</template>

<script setup>
import PageComponentVue from "@/components/DefaultLayout/PageComponent.vue";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useActivityStore } from "../../stores/activity";
import { FwbButton, FwbModal } from "flowbite-vue";
import { useTaskStore } from "@/stores/tasks";
import { usePirorityStore } from "@/stores/pirority";
import { useStatusStore } from "@/stores/status";
import { useUnitStore } from "@/stores/unit";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";

const store = useActivityStore();
const taskStore = useTaskStore();
const pirorityStore = usePirorityStore();
const statusStore = useStatusStore();
const unitStore = useUnitStore();

const isLoading = computed(() => store.isLoading);
const notification = computed(() => store.notification);
const activities = computed(() => store.activities);
const tasks = computed(() => taskStore.tasks);
const pirorities = computed(() => pirorityStore.pirorities);
const statuses = computed(() => statusStore.statuses);
const units = computed(() => unitStore.units);
const task = computed(() => taskStore.currentTask);

const activity = ref({
  name: "",
  task_id: "",
  pirority_id: "",
  unit_id: "",
  status_id: "",
  start_date: "",
  end_date: "",
  duration: "",
  progress: "",
  remark: "",
  issue: "",
  quantity: "",
  approval: "",
});

const search = ref({ query: "" });

watch(
  () => store.currentActivity,
  (newVal, oldVal) => {
    if (newVal !== undefined) {
      activity.value = {
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

function openEditModal(selectedActivity) {
  if (selectedActivity) {
    store.getActivity(selectedActivity);
  }
  isEditing.value = true;
  isShowModal.value = true;
}

const errMsg = ref(false);

function createActivity(e) {
  e.preventDefault();
  const action = isEditing.value ? "updated" : "created";
  const apiCall = isEditing.value ? store.updateActivity : store.createActivity;
  apiCall({ ...activity.value })
    .then(() => {
      store.notify({
        type: "success",
        message: "The activity was successfully " + action,
      });
      closeModal();
      store.getActivities();
    })
    .catch((err) => {
      errMsg.value = err.response.data;
      setTimeout(() => {
        closeModal();
        errMsg.value = false;
      }, 3000);
      store.getActivities();
    });
}

const showConfirmModal = ref(false);
const confirmInput = ref("");
const activityToDelete = ref(null);

const openConfirmModal = (activityId) => {
  activityToDelete.value = activityId;
  showConfirmModal.value = true;
};

const confirmDelete = () => {
  if (activityToDelete.value) {
    store.deleteActivity(activityToDelete.value);
  }
  showConfirmModal.value = false;
  confirmInput.value = "";
};

onBeforeMount(() => {
  store.getActivities();
  taskStore.getTasks();
  pirorityStore.getPirorities();
  statusStore.getStatuses();
  unitStore.getUnits();
});
</script>
