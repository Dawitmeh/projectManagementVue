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
                Create Labours
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
                                First Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Last name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email 
                            </th>
                             <th scope="col" class="px-6 py-3">
                                Phone number 
                            </th>
                             <th scope="col" class="px-6 py-3">
                                Country 
                            </th>
                             <th scope="col" class="px-6 py-3">
                                City 
                            </th>
                             <th scope="col" class="px-6 py-3">
                                State 
                            </th>
                             <th scope="col" class="px-6 py-3">
                                Address 
                            </th>
                             <th scope="col" class="px-6 py-3">
                                ZIP 
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
                        <tr v-for="(resource, index) in resources" :key="index" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ resource.first_name }}
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ resource.last_name }}
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ resource.email }}
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ resource.phone }}
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ resource.country }}
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ resource.city }}
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ resource.state }}
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ resource.address }}
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ resource.zip }}
                            </th>
                            <td class="px-6 py-4">
                                {{ resource.created_at }}
                            </td>
                            <td class="flex items-center px-6 py-4 space-x-3">
                                <button v-if="resource.id"  @click="openEditModal(resource.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                <button @click="onRemove(resource?.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
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
            {{ isEditing ? 'Edit Labour' : 'Add Labour' }}
            </div>
            </template>
            <template #body>
            <form @submit="createHumanResource">
                    <!-- <div v-if="isLoading" class="text-center">
                        <div role="status">
                            <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                    </div> -->
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
                            <div class="grid gap-6 mb-6 md:grid-cols-2 ">
                                <div>
                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                    <input type="text" v-model="resource.first_name" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Full name">
                                    <div v-if="validationErr.first_name" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.first_name[0] }}
                                    </div>
                                </div>
                                <div>
                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                    <input type="text" v-model="resource.last_name" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Full name">
                                    <div v-if="validationErr.last_name" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.last_name[0] }}
                                    </div>
                                </div>
                                <div>
                                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                    <input type="email" v-model="resource.email" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="john.doe@company.com">
                                    <div v-if="validationErr.email" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.email[0] }}
                                    </div>
                                </div> 
                                <div>
                                    <label for="phone_number" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                    <div class="flex">
                                    <span class="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-l-lg px-1 py-2.5 flex items-center dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">{{ prefix }}</span>
                                    <input type="number" v-model="resource.phone" @input="validateInput" id="phone_number" :minlength="9" :maxlength="9" pattern="[0-9]*" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-emerald-500 focus:border-emerald-500 flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Phone Number">
                                    </div>
                                    <div v-if="validationErr.phone" class="text-red-500 text-xs mt-1">
                                    {{ validationErr.phone[0] }}
                                </div>
                                </div> 
                                <div>
                                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                                    <input type="text" v-model="resource.country" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="john.doe@company.com">
                                    <div v-if="validationErr.country" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.country[0] }}
                                    </div>
                                </div> 
                                <div>
                                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country code</label>
                                    <input type="text" v-model="resource.country_code" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="john.doe@company.com">
                                    <div v-if="validationErr.country_code" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.country_code[0] }}
                                    </div>
                                </div> 
                                <div>
                                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <input type="text" v-model="resource.address" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="john.doe@company.com">
                                    <div v-if="validationErr.address" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.address[0] }}
                                    </div>
                                </div> 
                                <div>
                                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                    <input type="text" v-model="resource.city" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="john.doe@company.com">
                                    <div v-if="validationErr.city" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.city[0] }}
                                    </div>
                                </div>
                                <div>
                                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                                    <input type="text" v-model="resource.state" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="john.doe@company.com">
                                    <div v-if="validationErr.state" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.state[0] }}
                                    </div>
                                </div>  
                                <div>
                                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ZIP</label>
                                    <input type="text" v-model="resource.zip" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="john.doe@company.com">
                                    <div v-if="validationErr.zip" class="text-red-500 text-xs mt-1">
                                        {{ validationErr.zip[0] }}
                                    </div>
                                </div> 
                                <div class="mb-6 mt-3">
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                
                                <div class="flex">
                                    <input type="password" id="password" v-model="resource.password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="•••••••••">
                                    <div @click="togglePasswordVisibility" class="float-right mt-3 ml-3">
                                    <svg v-if="eye.open != true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-800">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <svg v-else class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z"/>
                                        <path d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z"/>
                                        <path d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z"/>
                                    </svg>
                                </div>
                                
                                </div>
                                <div v-if="validationErr.password" class="text-red-500 text-xs mt-1">
                                    {{ validationErr.password[0] }}
                                </div>
                            </div> 
                            <div class="mb-6 mt-3">
                                <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <div class="flex">
                                    <input type="password" id="confirm_password" v-model="resource.password_confirmation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="•••••••••">
                                    <div @click="togglePasswordVisibility2" class="float-right ml-3 mt-3">
                                    <svg v-if="eye.open2 != true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-800">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <svg v-else class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z"/>
                                        <path d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z"/>
                                        <path d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z"/>
                                    </svg>
                                </div> 
                                </div>
                                <div v-if="validationErr.password_confirmation" class="text-red-500 text-xs mt-1">
                                {{ validationErr.password_confirmation[0] }}
                            </div> 
                            </div>
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-white">
                                    Profile picture
                                </label>
                                <button
                                type="button"
                                class="relative mt-2 overflow-hidden bg-emerald-500 py-2 px-3 border border-emerald-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:bg-emerald-50 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                <input type="file" 
                                multiple
                                ref="fileInput"
                                @change="onImageChoose"
                                class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer text-emerald-500"
                                >
                                    Upload profile
                                </button>
                                <div v-if="selectedFiles.length" class="text-sm text-gray-500 mt-2">
                                Selected files:
                                <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                    <li v-for="file in selectedFiles" :key="file.name">
                                    {{ file.name }}
                                    <button @click="removeFile(index)" class="ml-2 text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        
                                    </button>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="validationErr.files_url" class="text-red-500 text-xs mt-1">
                                {{ validationErr.files_url[0] }}
                            </div>
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
import { useResourceStore } from "@/stores/resource";
import { computed, onBeforeMount, ref, watch } from "vue";
import { FwbButton, FwbModal } from 'flowbite-vue'

const store = useResourceStore()

const isLoading = computed(() => store.isLoading)
const notification = computed(() => store.notification)
const resources = computed(() => store.humanresources)


const resource = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    userType: '',
    password: '',
    country: '',
    country_code: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    profile_picture: '',
    profile_picture_url: '',
})

watch(() => store.currentHr,
        (newVal, oldVal) => {
            if (newVal !== undefined) {
                resource.value = {
                    ...JSON.parse(JSON.stringify(newVal))
                }
            }
        }
)

const fileInput = ref([])
const selectedFiles = ref([])

function onImageChoose(event) {
  const files = event.target.files;
  const newFiles = Array.from(files);
  selectedFiles.value = [...selectedFiles.value, ...newFiles];
  const formData = new FormData();
  const fileArray = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = (event) => {
      fileArray.push(reader.result);
      resource.value.profile_picture = fileArray;
      resource.value.profile_picture_url = [reader.result];
      // console.log(`File name: ${file.name}`);
      // console.log(`File content: ${event.target.results}`);
    };
    reader.readAsDataURL(files[i]);
  }
}

function removeFile(index) {
  selectedFiles.value.splice(index, 1);
}

const validationErr = ref({})

function validateForm() {
  if (!resource.value.first_name) {
    validationErr.value.first_name = ['first name is required']
  }
  if (!resource.value.last_name) {
    validationErr.value.last_name = ['last name is required']
  }
  if (!resource.value.phone) {
    validationErr.value.phone = ['Phone is required']
  }
  if (!resource.value.email) {
    validationErr.value.email = ['Email address is required']
  }
  if (!resource.value.password) {
    validationErr.value.password = ['Password field is required']
  }
  if (!resource.value.password_confirmation) {
    validationErr.value.password_confirmation = ['Password confirmation field is required']
  }
  if (!resource.value.country) {
    validationErr.value.country = ['Country is required']
  }
  if (!resource.value.country_code) {
    validationErr.value.country_code = ['country code is required']
  }
  if (!resource.value.address) {
    validationErr.value.address = ['address is required']
  }
  if (!resource.value.city) {
    validationErr.value.city = ['city is required']
  }
  if (!resource.value.zip) {
    validationErr.value.zip = ['zip is required']
  }
  if (!resource.value.state) {
    validationErr.value.state = ['state is required']
  }

  return Object.keys(validationErr.value).length === 0
}

let eye = ref({
  open: false,
  open2: false
})

const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eye.value.open = !eye.value.open
    } else {
        passwordInput.type = 'password';
        eye.value.open = !eye.value.open
    }
};

const togglePasswordVisibility2 = () => {
    const passwordInput = document.getElementById('confirm_password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eye.value.open2 = !eye.value.open2
    } else {
        passwordInput.type = 'password';
        eye.value.open2 = !eye.value.open2
    }
};

const prefix = ref('+251')

// const isLoading = ref(false)

const isShowModal = ref(false)
const isEditing = ref(false)

function showModal() {
    isShowModal.value = true
    isEditing.value = false
}

function closeModal() {
    isShowModal.value = false
    isEditing.value = false
    resource.value = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        userType: '',
        password: '',
        country: '',
        country_code: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        profile_picture: '',
        profile_picture_url: '',
    }
}

function openEditModal(resource) {
    if (resource) {
        store.getHumanResource(resource)
    }
    isShowModal.value = true
    isEditing.value = true
}

const search = ref({ query: '' })

const errMsg = ref([])

const maxLength = 9;
const minLength = 9;

function validateInput(event) {
  if (event.target.value.length > maxLength) {
    event.target.value = event.target.value.slice(0, maxLength);
  }
  if (event.target.value.length < minLength) {
    event.target.value = event.target.value.slice(0, minLength);
  }
}

function createHumanResource(e) {
    e.preventDefault()
    if (validateForm()) {
        const action = isEditing.value ? 'updated' : 'created'
        const apiCall = isEditing.value ? store.updateHumanResource : store.createHumanResource
        apiCall({ ...resource.value })
            .then(() => {
                store.notify({
                    type: 'success',
                    message: 'The Labour was successfully ' + action
                })
                closeModal()
                store.getHumanResources()
            })
            .catch((err) => {
                errMsg.value = err.response.data
                setTimeout(() => {
                    closeModal()
                    errMsg.value = false
                }, 3000)
                store.getHumanResources()
            })
    } else {
        setTimeout(() => {
            validationErr.value = {}
        }, 3000)
    }
}

onBeforeMount(() => {
    store.getHumanResources()
})

</script>
