import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized} from 'vue-router'

import {useDrinksStore} from "@/store";

// Layouts
import DefaultLayout from '@/layouts/default-layout.vue'
import EmptyLayout from "@/layouts/empty-layout.vue";
// Pages
import Home from '@/views/home-page.vue'
import DrinkDetail from "@/views/drink-detail.vue";
import page404 from '@/views/page-404.vue';

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            { path: '', component: Home },
            {
                path: ':cocktail_code',
                component: Home,
            },
            {
                path: ':cocktail_code/:id',
                component: DrinkDetail
            }
        ]
    },
    {
        path: '/:pathMatch(.*)',
        component: EmptyLayout,
        children: [
            {
                path: '',
                component: page404
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const drinksStore= useDrinksStore();

    if (to.path === '/') {
        next({ path: drinksStore.cocktailsCategory[0] as string});
    } else {
        next();
    }
});
export default router
