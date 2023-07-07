import type { Axios } from 'axios';

declare module 'pinia' {
	export type PiniaCustomProperties = {
		$axios: Axios;
	};
}