import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Toast from "./plugins/toast";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faArrowRight,
  faUser,
  faGaugeHigh,
  faArrowRightArrowLeft,
  faPlus,
  faMinus,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import "bootstrap";
import "@/assets/main.scss";

library.add(
  faBars,
  faArrowRight,
  faUser,
  faGaugeHigh,
  faArrowRightArrowLeft,
  faPlus,
  faMinus,
  faPen,
  faTrash
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("date-picker", Datepicker);

app.mount("#app");
