<template>
  <div
    v-if="show"
    class="p-3 text-white animate-fade-in-down rounded-md"
    :class="[type === 'success' ? 'bg-emerald-500' : 'bg-red-500']"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "success",
    },
    message: {
      type: String,
      default: "",
    },
  },
};
</script>
