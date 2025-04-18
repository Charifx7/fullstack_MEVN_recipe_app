<template>
    <div class="container mx-auto px-4 py-8">
        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="recipe in recipes" :key="recipe.id"
                class="group flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                @click="showRecipeDetails(recipe)">
                <div class="relative overflow-hidden">
                    <img class="rounded-t-lg w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        :src="recipe.image" :alt="recipe.name" />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    </div>
                </div>
                <div class="flex flex-col flex-grow p-5">
                    <h5
                        class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 truncate">
                        {{ recipe.name }}</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 flex-grow line-clamp-3">{{
                        recipe.instructions }}</p>
                </div>
            </div>
        </div>


        <transition name="modal" enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95">
            <!-- Modal -->
            <div v-if="selectedRecipe"
                class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 overflow-hidden modal-open"
                @click="closeModal">
                <div class="bg-white/95 dark:bg-gray-800/95 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto overflow-x-hidden shadow-xl mt-16"
                    @click.stop>
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <h3
                                class="text-2xl font-bold text-gray-900 dark:text-white break-words max-w-[calc(100%-3rem)]">
                                {{ selectedRecipe.name }}</h3>
                            <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <img :src="selectedRecipe.image" :alt="selectedRecipe.name"
                            class="w-full object-cover rounded-lg mb-4" />
                        <div class="space-y-4">
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">ส่วนผสม</h4>
                                <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line break-words">{{
                                    selectedRecipe.ingredient }}</p>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">วิธีการทำ</h4>
                                <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line break-words">{{
                                    selectedRecipe.instructions }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();
const recipes = ref([]);
const loading = ref(true);
const selectedRecipe = ref(null);

const apiUrl = `${import.meta.env.VITE_API_URL}/api/recipe`;

const getRecipes = async () => {
    try {
        loading.value = true;
        const response = await axios.get(apiUrl);
        console.log(response.data);
        recipes.value = response.data;
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false;
    }
}

const showRecipeDetails = (recipe) => {
    selectedRecipe.value = recipe;
}

const closeModal = () => {
    selectedRecipe.value = null;
}

// const editRecipe = (recipe) => {
//     router.push(`/recipe/${recipe._id}`);
// }

watch(selectedRecipe, (newValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

onMounted(() => {
    console.log('Recipe List Component mouted');
    getRecipes();
})

</script>

<style scoped>
.modal-open {
    overflow: hidden;
}
</style>