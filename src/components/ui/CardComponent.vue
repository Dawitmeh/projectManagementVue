<template>
  <div class="lg:w-1/4 md:w-full sm:w-1/2 px-2 mb-4">
    <div
      class="bg-white dark:bg-tableBg shadow-md rounded-xl p-6 border border-border dark:border-gray-700"
    >
      <div class="flex justify-between items-start mb-3">
        <font-awesome-icon
          :icon="['fas', 'briefcase']"
          class="icon"
          v-bind:style="{ color: iconColor }"
        />
      </div>
      <span class="font-semibold block text-gray-500 dark:text-card mb-1">{{
        title
      }}</span>
      <h3 class="text-2xl font-bold text-gray-600 dark:text-highlight mb-2">
        {{ value }}
      </h3>
      <a
        :href="link"
        class="text-sm font-medium flex items-center"
        v-bind:style="{ color: iconColor }"
      >
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
        <span class="pl-1">View More</span>
      </a>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    title: { type: String, required: true },
    value: { type: String, required: true },
    link: { type: String, required: true },
    iconColor: { type: String, required: true },
  },
};
</script>

<style scoped>
.icon {
  font-size: 2rem;
}
</style>
