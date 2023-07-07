import { defineStore } from 'pinia';
import axios from '../helpers/getAppAxios';

interface ISignUpPayload {
    email: string;
    username: string;
    password: string;
}

interface ISignInPayload {
    identifier: string;
    password: string;
}

export interface IAuthResultData {
	[key: string]: any;
};

export interface IAuthResult {
	data: IAuthResultData;
};

export interface IUser {
	[key: string]: any;
};

export const useAuthStore = defineStore('auth', {
	state: () => ({
		jwt: '',
		user: {},
	}),
	actions: {
		async signUp(payload: ISignUpPayload) {
			try {
				await axios.post('/api/auth/local/register', payload);
			} catch (e) {
				throw e;
			}
		},
		async signIn(payload: ISignInPayload) {
			try {
				const { data: { jwt, user } } = await axios.post('/api/auth/local', payload) as IAuthResult;
				this.jwt = jwt;
				this.user = user;
				localStorage.setItem('jwt', (jwt));
				localStorage.setItem('user', JSON.stringify(user));
			} catch (e) {
				throw e;
			}
		},
		setJwt(payload: string) {
			this.jwt = payload;
		},
		setUser(payload: IUser) {
			this.user = payload;
		},
	},
	getters: {
		isAuth: state => Boolean(state.jwt?.length || ''),
	},
});
