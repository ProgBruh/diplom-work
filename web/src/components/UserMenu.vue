<template>
    <q-btn 
        :label="username"
        :ripple="false"
        icon="person"
        flat
        unelevated
    >
        <q-menu fit>
            <q-list>
                <q-item 
                    to="/me/"
                    v-close-popup
                >
                    <q-item-section>Personal area</q-item-section>
                </q-item>
                <q-separator />
                <q-item 
                    clickable 
                    v-close-popup
                    @click="handleClick"
                >
                    <q-item-section>Logout</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-btn>
</template>

<script lang="ts">
import { useAuthStore } from '../store';

export default {
    name: 'UserMenu',

    data() {
      return {
        authStore: useAuthStore(),
      }; 
    },

    computed: {
        username() {
            return this.authStore.user?.username || 'user';
        },
    },

    methods: {
      async handleClick() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        await this.$router.go(0);
      }, 
    },
};
</script>
