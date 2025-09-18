// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia()); // 필수!
app.mount("#app");