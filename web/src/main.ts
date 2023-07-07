/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createApp, type App as Application } from 'vue';
import { createPinia } from 'pinia';
import { Quasar, Notify } from 'quasar';
import App from './App.vue';
import router from './helpers/getAppRouter';
import './assets/styles/general.scss';
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'

const app: Application = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, {
    plugins: {
        Notify,
    },
});
app.mount('#app');
