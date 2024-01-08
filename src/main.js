import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import moment from "moment";
import "moment/locale/id";
import App from "./App.vue";
import router from "./router";
import dotenv from "dotenv";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

dotenv.config;
// console.log(process.env.VUE_APP_ENDPOINT, "ini main");

const app = createApp(App);

moment.locale("id");

app.config.globalProperties.$moment = moment;
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.mount("#app");
