<template>
  <PageComponentVue>
    <div class="p-6 bg-white rounded-lg shadow-lg">
      <div class="grid gap-4 md:grid-cols-2">
        <!-- Title -->
        <div class="col-span-2">
          <label for="title" class="block font-medium text-gray-700"
            >Title <span class="text-red-500">*</span></label
          >
          <input
            class="w-full p-2 border border-gray-300 rounded-lg"
            type="text"
            name="title"
            placeholder="Please Enter Title"
          />
        </div>

        <!-- Status -->
        <div>
          <label class="block font-medium text-gray-700"
            >Status <span class="text-red-500">*</span></label
          >
          <select class="w-full p-2 border border-gray-300 rounded-lg">
            <option value="0">Not Started</option>
            <option value="71">Blocked</option>
            <option value="72">Completed</option>
            <option value="73">In Progress</option>
            <option value="76">On Hold</option>
          </select>
          <div class="flex gap-2 mt-2">
            <button class="p-1 bg-blue-500 text-white rounded">
              <i class="bx bx-plus"></i>
            </button>
            <button class="p-1 bg-blue-500 text-white rounded">
              <i class="bx bx-list-ul"></i>
            </button>
          </div>
        </div>

        <!-- Priority -->
        <div>
          <label class="block font-medium text-gray-700">Priority</label>
          <select class="w-full p-2 border border-gray-300 rounded-lg">
            <option value="0">Default</option>
            <option value="14">Critical</option>
            <option value="15">1st</option>
          </select>
          <div class="flex gap-2 mt-2">
            <button class="p-1 bg-blue-500 text-white rounded">
              <i class="bx bx-plus"></i>
            </button>
            <button class="p-1 bg-blue-500 text-white rounded">
              <i class="bx bx-list-ul"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2 mt-4">
        <!-- Start Date -->
        <div>
          <label class="block font-medium text-gray-700"
            >Starts At <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <!-- Due Date -->
        <div>
          <label class="block font-medium text-gray-700"
            >Ends At <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <!-- Project -->
      <div class="mt-4">
        <label class="block font-medium text-gray-700">Project</label>
        <input
          class="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
          type="text"
          readonly
        />
      </div>

      <!-- Description -->
      <div class="mt-4">
        <label class="block font-medium text-gray-700"
          >Description <span class="text-red-500">*</span></label
        >
        <textarea
          class="w-full p-2 border border-gray-300 rounded-lg"
          rows="5"
          placeholder="Please Enter Description"
        ></textarea>
      </div>
    </div>
  </PageComponentVue>
</template>

<script setup>
import PageComponentVue from "@/components/DefaultLayout/PageComponent.vue";
</script>
