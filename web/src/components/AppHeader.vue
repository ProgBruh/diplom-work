<template>
    <q-header>
        <app-container>
            <q-toolbar class="q-px-none">
                <q-toolbar-title shrink >
                    <router-link style="color: white; text-decoration: none;" to="/">Codelp</router-link>
                </q-toolbar-title>
                <q-space />
                <template v-if="isAuth">
                    <user-menu />
                </template>
                <template v-else>
                    <q-btn 
                        label="Sign in"
                        icon="login"
                        class="q-mr-sm"
                        to="/auth/sign-in/"
                        outline
                    />
                    <q-btn 
                        label="Sign up"
                        icon="person_add"
                        to="/auth/sign-up/"
                        outline
                    />
                </template>
            </q-toolbar>
        </app-container>
    </q-header>
</template>

<script lang="ts">
import AppContainer from './AppContainer.vue';
import UserMenu from './UserMenu.vue';
import { useAuthStore } from '../store';

export default {
    name: 'AppHeader',

    components: {
        AppContainer,
        UserMenu,
    },

    data() {
        return {
            authStore: useAuthStore(),
        };
    },

    computed: {
        isAuth() {
            return this.authStore.isAuth;
        },
    },
};
</script>