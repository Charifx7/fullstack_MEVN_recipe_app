import { createRouter , createWebHistory} from 'vue-router'
import RecipeList from './components/RecipeList.vue';
import AddRecipe from './components/AddRecipe.vue';
import EditRecipe from './components/EditRecipe.vue';
import Home from './views/Home.vue';

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
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;