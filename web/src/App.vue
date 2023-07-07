<template>
  <q-layout view="hHh lpR fFF">
	<app-header-vue />
	<app-container>
		<q-page-container>
			<q-page style="display: flex;">
				<div style="flex-grow: 1;">
					<router-view />
				</div>
			</q-page>
		</q-page-container>
	</app-container>
  </q-layout>
</template>

<script lang="ts">
import AppHeaderVue from './components/AppHeader.vue';
import AppContainer from './components/AppContainer.vue';
import { useAuthStore } from './store';

export default {
	name: 'App',

	components: {
		AppHeaderVue,
		AppContainer,
	},

	data() {
		return {
			authStore: useAuthStore(),
		};
	},

	mounted() {
		this.setStorageData();
	},

	methods: {
		setStorageData() {
			const jwt = localStorage.getItem('jwt');
			if (jwt) {
				this.authStore.setJwt(jwt);
			}
			const user = localStorage.getItem('user');
			if (user) {
				this.authStore.setUser(JSON.parse(user));
			}
		},
	},
};
</script>
