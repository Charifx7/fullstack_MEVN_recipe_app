<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-white">My Recipes</h1>
        </div>
        
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>

        <!-- Empty State -->
        <div v-else-if="recipes.length === 0" 
            class="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p class="text-gray-600 dark:text-gray-300 text-lg mb-4">ไม่พบสูตรอาหาร</p>
           
        </div>

        <!-- Recipe Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="recipe in recipes" :key="recipe._id" 
                class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ">
                <div class="relative">
                    <img :src="recipe.image" :alt="recipe.name" 
                        class="w-full h-48 object-cover transition-transform duration-300 ">
                </div>
                <div class="p-5">
                    <h2 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{{ recipe.name }}</h2>
                    <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{{ recipe.instructions }}</p>
                    <div class="flex justify-between items-center gap-3">
                        <router-link 
                            :to="'/recipe/' + recipe._id" 
                            class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 text-center"
                        >
                            แก้ไข
                        </router-link>
                        <button 
                            @click="confirmDelete(recipe)"
                            class="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                        >
                            ลบ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
import Swal from 'sweetalert2';

const auth = useAuthStore();
const toast = useToast();
const recipes = ref([]);
const loading = ref(true);

const fetchUserRecipes = async () => {
    try {
        loading.value = true;
        const token = auth.token;
        console.log('Fetching with token:', token);

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/recipe/my`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        console.log('Response data:', response.data);
        recipes.value = response.data;
    } catch (error) {
        console.error('ไม่สามารถโหลดข้อมูลสูตรอาหาร:', error);
        toast.error('ไม่สามารถโหลดข้อมูลสูตรอาหาร');
    } finally {
        loading.value = false;
    }
};

const confirmDelete = async (recipe) => {
    const result = await Swal.fire({
        title: 'ยืนยันการลบ',
        text: `ต้องการลบ ${recipe.name} ใช่หรือไม่?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#42bd41',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
        await deleteRecipe(recipe._id);
    }
};

const deleteRecipe = async (recipeId) => {
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/recipe/${recipeId}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        toast.success('ลบอาหารสำเร็จ');
        // Refresh recipes list
        await fetchUserRecipes();
    } catch (error) {
        console.error('ไม่สามารถลบอาหารได้:', error);
        toast.error('ไม่สามารถลบอาหารได้');
    }
};


onMounted(() => {
    fetchUserRecipes();
});
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

