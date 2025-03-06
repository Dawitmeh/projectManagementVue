import { createApp } from "vue";
import { createPinia } from "pinia";
import "./index.css";

import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBriefcase,
  faBan,
  faCheckCircle,
  faSpinner,
  faPauseCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

// Add icons to the library
library.add(
  faBriefcase,
  faBan,
  faCheckCircle,
  faSpinner,
  faPauseCircle,
  faBars
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
import "../node_modules/flowbite-vue/dist/index.css";
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
