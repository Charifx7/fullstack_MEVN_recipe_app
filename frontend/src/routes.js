import { createRouter , createWebHistory} from 'vue-router'
import RecipeList from './components/RecipeList.vue';
import AddRecipe from './components/AddRecipe.vue';
import EditRecipe from './components/EditRecipe.vue';
import Home from './views/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import MyRecipes from './views/MyRecipes.vue';
import AdminViews from './views/AdminViews.vue';
import { useAuthStore } from './stores/auth';

const routes = [
    {
        name: 'RecipeList',
        path:'/list',
        component: RecipeList
    },
    {
        name: 'AddRecipe',
        path:'/create-recipe',
        component: AddRecipe
    },
    {
        name: 'EditRecipe',
        path: '/recipe/:id?',
        component: EditRecipe
    },
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Login',
        path: '/login',
        component: Login
    },
    {
        name: 'Register',
        path: '/register',
        component: Register
    },
    {
        name: 'MyRecipes',
        path: '/my-recipes',
        component: MyRecipes,
        meta:{
            requiresAuth: true,
            allowedRoles: ['user','admin']
        }
    },
    {
        name: 'AdminViews',
        path: '/admin',
        component: AdminViews,
        meta: { 
            requiresAuth: true,
            allowedRoles: ['admin']
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    const userRole = auth.user?.role;

    if (to.meta.requiresAuth) {
        if (!auth.isLoggedIn) {
            next({ 
                path: '/login',
                query: { redirect: to.fullPath }
            });
            return;
        }

        if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(userRole)) {
            next({ path: '/' });
            return;
        }
    }

    next();
});

export default router;
