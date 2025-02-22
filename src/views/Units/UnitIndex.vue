<template>
    <PageComponentVue>
        <div class="mt-3 mb-3">
            <div
              v-if="notification.show == true"
              class="p-3 text-white animate-fade-in-down rounded-md"
              :class="[notification.type === 'success' ?  'bg-emerald-500' : 'bg-red-500']"
              >
                {{ notification.message }}
            </div>
        </div>
        <div class="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
            <div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
              <div class="w-full md:w-1/2">
                <form @submit="handleSearch" class="flex items-center">
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input type="text" v-model="search.query" id="simple-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="">
                  </div>
                </form>
              </div>
              <button @click="showModal" class="
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
                Create Unit
              </button>
            </div>
            <div v-if="isLoading != false">
              <div role="status" class="text-center mt-6 mb-6">
                <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
               </div>
            </div>
            <div v-else>
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                             <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Created Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(unit, index) in units" :key="index" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ unit.name }}
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ unit.description }}
                            </th>
                            <td class="px-6 py-4">
                                {{ unit.created_at }}
                            </td>
                            <td class="flex items-center px-6 py-4 space-x-3">
                                <button v-if="unit.id"  @click="openEditModal(unit.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                <button @click="onRemove(unit?.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                                <!-- <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
            {{ isEditing ? 'Edit Unit' : 'Add Unit' }}
            </div>
            </template>
            <template #body>
            <form @submit="createUnit">
                    <div v-if="isLoading" class="text-center">
                        <div role="status">
                            <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                    <div v-if="errMsg != false" id="alert-border-2" class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
                        <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <div class="ml-3 text-sm font-medium">
                        {{ errMsg }}
                        </div>
                    </div>
                    </div>
                        <div class="grid gap-4 mb-4 sm:grid-cols-1">
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" v-model="unit.name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="site name">
                                <!-- <div v-if="validationErr.name" class="text-red-500 text-xs mt-1">
                                {{ validationErr.name[0] }}
                                </div> -->
                            </div>
                            <div>
                                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="message" rows="4" v-model="unit.description" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                            </div>
                            <div>
                                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                    <select id="countries" v-model="unit.status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    </select>
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <button @click="closeModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
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
import { computed, onBeforeMount, ref, watch } from "vue";
import { useUnitStore } from "../../stores/unit"
import { FwbButton, FwbModal } from 'flowbite-vue'

const store = useUnitStore()

const isLoading = computed(() => store.isLoading)
const notification = computed(() => store.notification)
const units = computed(() => store.units)


const unit = ref({
    name: '',
    description: '',
    status: ''
})

watch(() => store.currentUnit,
        (newVal, oldVal) => {
            if (newVal !== undefined) {
                unit.value = {
                    ...JSON.parse(JSON.stringify(newVal))
                }
            }
        }
)

const isShowModal = ref(false)
const isEditing = ref(false)

function closeModal() {
    isShowModal.value = false
    isEditing.value = false
    unit.value = {
        name: '',
        description: '',
        status: ''
    }
}

function showModal() {
    isShowModal.value = true
    isEditing.value = false
    unit.value = {
        name: '',
        description: '',
        status: ''
    }
}

function openEditModal(selectedUnit) {
    if (selectedUnit) {
        store.getUnit(selectedUnit)
    }
    isShowModal.value = true
    isEditing.value = true
}

const search = ref({ query: '' })

const errMsg = ref(false)


function createUnit(e) {
    e.preventDefault()
    const action = isEditing.value ? 'updated' : 'created'
    const apiCall = isEditing.value ? store.updateUnit : store.createUnit
    apiCall({...unit.value}) 
        .then(() => {
            store.notify({
                type: 'success',
                message: 'The unit was successfully ' + action
            })
            closeModal()
            store.getUnits()
        })
        .catch((err) => {
            errMsg.value = err.response.data
            setTimeout(() => {
                closeModal()
                errMsg.value = false
            }, 3000)
            store.getUnits()
        })
}


onBeforeMount(() => {
    store.getUnits()
})
</script>
