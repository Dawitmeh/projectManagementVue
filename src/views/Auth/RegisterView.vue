<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register New Account</h2>
      </div>
      <div class="mt-3 p-4 md:mx-auto md:w-full md:max-w-lg xl:max-md sm:mx-auto sm:w-full sm:max-w-md bg-white border border-gray-200 rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div v-if="isLoading" class="text-center">
          <div role="status">
              <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
          </div>
       </div>
       <div v-if="errMsg != false">
          <div id="alert-border-2" class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
            <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <div  class="ml-3 text-sm font-medium">
              <li v-for="err in errMsg" :key="err">
                {{ err }}
              </li>
            </div>
          </div>
       </div>
        <form @submit="register">
          <div class="grid gap-6 mb-6 md:grid-cols-2 max-w-lg">
              <div>
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                  <input type="text" v-model="user.first_name" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Full name">
                  <div v-if="validationErr.first_name" class="text-red-500 text-xs mt-1">
                    {{ validationErr.first_name[0] }}
                </div>
              </div>
              <div>
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                  <input type="text" v-model="user.last_name" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Full name">
                  <div v-if="validationErr.last_name" class="text-red-500 text-xs mt-1">
                    {{ validationErr.last_name[0] }}
                </div>
              </div>
              <div>
                  <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                  <input type="email" v-model="user.email" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="john.doe@company.com">
                  <div v-if="validationErr.email" class="text-red-500 text-xs mt-1">
                    {{ validationErr.email[0] }}
                </div>
              </div> 
              <div>
                <label for="phone_number" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                <div class="flex">
                  <span class="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-l-lg px-1 py-2.5 flex items-center dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">{{ prefix }}</span>
                  <input type="number" v-model="user.phone" @input="validateInput" id="phone_number" :minlength="9" :maxlength="9" pattern="[0-9]*" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-emerald-500 focus:border-emerald-500 flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Phone Number">
                </div>
                <div v-if="validationErr.phone" class="text-red-500 text-xs mt-1">
                  {{ validationErr.phone[0] }}
              </div>
              </div> 
               <div>
                  <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                  <input type="text" v-model="user.country" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="john.doe@company.com">
                  <div v-if="validationErr.country" class="text-red-500 text-xs mt-1">
                    {{ validationErr.country[0] }}
                </div>
              </div> 
               <div>
                  <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country code</label>
                  <input type="text" v-model="user.country_code" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="john.doe@company.com">
                  <div v-if="validationErr.country_code" class="text-red-500 text-xs mt-1">
                    {{ validationErr.country_code[0] }}
                </div>
              </div> 
               <div>
                  <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                  <input type="text" v-model="user.address" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="john.doe@company.com">
                  <div v-if="validationErr.address" class="text-red-500 text-xs mt-1">
                    {{ validationErr.address[0] }}
                </div>
              </div> 
               <div>
                  <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                  <input type="text" v-model="user.city" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="john.doe@company.com">
                  <div v-if="validationErr.city" class="text-red-500 text-xs mt-1">
                    {{ validationErr.city[0] }}
                </div>
              </div>
               <div>
                  <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                  <input type="text" v-model="user.state" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="john.doe@company.com">
                  <div v-if="validationErr.state" class="text-red-500 text-xs mt-1">
                    {{ validationErr.state[0] }}
                </div>
              </div>  
               <div>
                  <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ZIP</label>
                  <input type="text" v-model="user.zip" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="john.doe@company.com">
                  <div v-if="validationErr.zip" class="text-red-500 text-xs mt-1">
                    {{ validationErr.zip[0] }}
                </div>
              </div> 
              <!-- <div>
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User type</label>
                <select id="countries" v-model="user.userType" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a type</option>
                  <option value="admin">Admin user</option>
                  <option value="editor">Content Editor</option>
                </select>
              </div> -->
              <div class="mb-6 mt-3">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              
              <div class="flex">
                <input type="password" id="password" v-model="user.password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="•••••••••">
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
                <input type="password" id="confirm_password" v-model="user.password_confirmation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="•••••••••">
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
          </div>
          
          
          <div class="mt-6">
            <button type="submit" @click="showLoading" class="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
          </div>
      </form>
  
        <p class="mt-10 text-center text-sm text-gray-500">
          Already have an account ?
          {{ ' ' }}
          <router-link :to="{name: 'Login'}" class="font-semibold leading-6 text-emerald-500 hover:text-indigo-500">Sign in to your account</router-link>
        </p>
      </div>
    </div>
</template>


<script setup>
import { useUserStore } from "@/stores/users";
import { ref } from "vue";
import { useRouter } from "vue-router";


const store = useUserStore()
const router = useRouter()

let user = ref({
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
    zip: ''
})

const validationErr = ref({})

function validateForm() {
  if (!user.value.first_name) {
    validationErr.value.first_name = ['first name is required']
  }
  if (!user.value.last_name) {
    validationErr.value.last_name = ['last name is required']
  }
  if (!user.value.phone) {
    validationErr.value.phone = ['Phone is required']
  }
  if (!user.value.email) {
    validationErr.value.email = ['Email address is required']
  }
  if (!user.value.password) {
    validationErr.value.password = ['Password field is required']
  }
  if (!user.value.password_confirmation) {
    validationErr.value.password_confirmation = ['Password confirmation field is required']
  }
  if (!user.value.country) {
    validationErr.value.country = ['Country is required']
  }
  if (!user.value.country_code) {
    validationErr.value.country_code = ['country code is required']
  }
  if (!user.value.address) {
    validationErr.value.address = ['address is required']
  }
  if (!user.value.city) {
    validationErr.value.city = ['city is required']
  }
  if (!user.value.zip) {
    validationErr.value.zip = ['zip is required']
  }
  if (!user.value.state) {
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

const isLoading = ref(false)

function showLoading() {
    if (validateForm()) {
        isLoading.value = true
    } else {
        isLoading.value = false
        setTimeout(() => {
            isLoading.value= false
        }, 2000)
    }
}

function closeLoading() {
  isLoading.value = false
}

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

function register(e) {
    e.preventDefault()
    if (validateForm()) {
        store.register({...user.value})
            .then(() => {
                router.push({
                    name: 'Dashboard'
                })
            })
            .catch((err) => {
                errMsg.value = err.response.data
                setTimeout(() => {
                    errMsg.value = false
                }, 4000)
                isLoading.value = false
            })
    } else {
        isLoading.value = false
        setTimeout(() => {
            validationErr.value = {}
        }, 3000)
    }
}

</script>
