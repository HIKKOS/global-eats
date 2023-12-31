import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LandingPage from '../views/LandingPage.vue'
import UsersPage from '../views/UsersPage.vue'
import CategoriesPage from '../views/CategoriesPage.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: HomePage
		},
		{
			path: '/users',
			component: UsersPage
		},
		{
			path: '/categories',
			component: CategoriesPage
		},
		{
			path: '/uwu',
			component: LandingPage
		}
	],
})

export default router