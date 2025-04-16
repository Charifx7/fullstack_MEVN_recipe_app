<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">แก้ไขเมนูอาหาร</h1>
      <button @click="router.push('/my-recipes')"
        class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <form v-else @submit.prevent="updateRecipe"
      class="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-500 animate-fade-in">
      <!-- Menu -->
      <div class="space-y-2">
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">ชื่อเมนู</label>
        <input type="text" v-model="recipe.name"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="กรอกชื่อเมนู" />
      </div>

      <!-- Ingredient -->
      <div class="space-y-2">
        <label for="ingredients" class="block text-sm font-medium text-gray-700 dark:text-gray-300">ส่วนผสม</label>
        <textarea v-model="recipe.ingredient"
          class="w-full h-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
          placeholder="กรอกส่วนผสม "></textarea>
      </div>

      <!-- URL -->
      <div class="space-y-2">
        <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">URL รูปภาพ</label>
        <input type="url" v-model="recipe.image"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="กรอก URL รูปภาพ" />
        <!-- Image Preview -->
        <div v-if="recipe.image" class="mt-4">
          <img :src="recipe.image" alt="ภาพตัวอย่างเมนู" class="w-full h-64 object-cover rounded-lg shadow-md" />
        </div>
      </div>

      <!-- Instructions -->
      <div class="space-y-2">
        <label for="instructions" class="block text-sm font-medium text-gray-700 dark:text-gray-300">วิธีการทำ</label>
        <textarea v-model="recipe.instructions"
          class="w-full h-60 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
          placeholder="กรอกวิธีการทำ "></textarea>
      </div>

      <!-- Update Buttons section -->
      <div class="flex gap-4">
        <button type="submit"
          class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
          แก้ไข
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/stores/auth'; 

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();
const isLoading = ref(true);

const recipe = ref({
  name: '',
  ingredient: '',
  image: '',
  instructions: ''
})

const getRecipeById = async () => {
  try {
    isLoading.value = true;
    const url = `${import.meta.env.VITE_API_URL}/api/recipe/${route.params.id}`;
    const response = await axios.get(url);
    recipe.value = response.data;
  } catch (error) {
    console.log(error);
    toast.error('ไม่สามารถโหลดข้อมูลได้');
  } finally {
    isLoading.value = false;
  }
}

const updateRecipe = async () => {
  if (!recipe.value.name || !recipe.value.image || !recipe.value.ingredient || !recipe.value.instructions) {
    toast.error("กรอกข้อมูลให้ครบช่อง");
    return;
  }
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/recipe/${route.params.id}`;
    const token = auth.token;
    
    //field ที่จะอัพเดท
    const updateData = {
      name: recipe.value.name,
      ingredient: recipe.value.ingredient,
      image: recipe.value.image,
      instructions: recipe.value.instructions
    }
    console.log("Editing recipe ID:", route.params.id);
    console.log("Sending token:", token);
    console.log("Data to update:", updateData);

    const response = await axios.put(url, updateData,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status == 200) {
      toast.success('แก้ไขข้อมูลสำเร็จ');
      router.push({ name: 'MyRecipes' });
    }
  } catch (error) {
    console.log(error);
    toast.error('ข้อผิดพลาดในการแก้ไขข้อมูล');
  }
}

// const confirmDelete = async () => {
//   const result = await Swal.fire({
//     title: 'การลบ',
//     text: 'ต้องการลบใช่หรือไม่?',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#dc2626',
//     cancelButtonColor: '#3085d6',
//     confirmButtonText: 'ลบ',
//     cancelButtonText: 'ยกเลิก'
//   });

//   if (result.isConfirmed) {
//     try {
//       const url = `${import.meta.env.VITE_API_URL}/api/recipe/${route.params.id}`;
//       const response = await axios.delete(url, {
//         headers: {
//           Authorization: `Bearer ${auth.token}`
//         }
//       });
      
//       if (response.status === 200) {
//         await Swal.fire({
//           title: 'ลบสำเร็จ!',
//           text: 'ถูกลบแล้ว',
//           icon: 'success'
//         });
//         router.push({ name: 'MyRecipes' });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         title: 'ระบบข้อผิดพลาด!',
//         text: 'ไม่สามารถลบระบบได้',
//         icon: 'error'
//       });
//     }
//   }
// };

onMounted(() => {
  getRecipeById();
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style>
