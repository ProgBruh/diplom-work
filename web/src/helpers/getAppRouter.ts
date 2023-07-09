import { createRouter, createWebHistory } from 'vue-router';
import { Index, PostDetail, PersonalArea, SignIn, SignUp, NotFound } from '../views';
import { useAuthStore } from '../store';

const router = createRouter({
			history: createWebHistory(),
			routes: [
				{
					path: '/',
					name: 'Index',
					component: Index,
				},
				{
					path: '/post/:id/',
					name: 'PostDetail',
					component: PostDetail,
				},
				{
					path: '/me/',
					name: 'Me',
					component: PersonalArea,
				},
				{
					path: '/auth/sign-in/',
					name: 'SignIn',
					component: SignIn,
				},
				{
					path: '/auth/sign-up/',
					name: 'SignUp',
					component: SignUp,
				},
				{
					path: '/:pathMatch(.*)*',
					component: NotFound,
				},
			],
		});

router.beforeEach((to, _, next) => {
	const store = useAuthStore();
	if ((to.name === 'SignIn' || to.name === 'SignUp') && store.isAuth) return next('/');
	if ((to.fullPath === '/auth/') || (to.name === 'Me' && !store.isAuth)) return next('/auth/sign-in/');
	next();
});

export default router;