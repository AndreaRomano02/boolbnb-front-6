import { createApp } from "vue";
import "./scss/style.scss";
import App from "./App.vue";
import AppLoader from "./components/AppLoader.vue";
import AppHeader from "./components/AppHeader.vue";
import { router } from "./router";




const app = createApp(App);
app.component("AppLoader", AppLoader);
app.use(router);
app.mount("#app");
