<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
      <p class="text-gray-600 mt-2">{{ message }}</p>
      <input
        v-if="showInput"
        v-model="confirmInput"
        type="text"
        :placeholder="inputPlaceholder"
        class="mt-4 p-2 border rounded w-full"
      />
      <div class="flex justify-end space-x-3 mt-4">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button
          @click="$emit('confirm')"
          :disabled="showInput && confirmInput !== confirmText"
          class="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
        >
          {{ confirmButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  isVisible: Boolean,
  title: String,
  message: String,
  showInput: Boolean,
  confirmText: String,
  inputPlaceholder: { type: String, default: 'Type "DELETE" to confirm' },
  confirmButtonText: { type: String, default: "Delete" },
});

defineEmits(["close", "confirm"]);

const confirmInput = ref("");
</script>
