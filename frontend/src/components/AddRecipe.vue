<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">เพิ่มเมนูอาหารใหม่</h1>
      <button @click="router.push('/')"
        class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <form @submit.prevent="saveRecipe" class="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
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
          placeholder="กรอกส่วนผสม"></textarea>
      </div>

      <!-- URL  -->
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
          placeholder="กรอกวิธีการทำ"></textarea>
      </div>

      <!-- Save button -->
      <button type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
        บันทึกเมนู
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const toast = useToast();
const auth = useAuthStore();

const recipe = ref({
  name: '',
  ingredient: '',
  image: '',
  instructions: ''
})

const saveRecipe = async () => {
  if (!recipe.value.name || !recipe.value.image || !recipe.value.ingredient || !recipe.value.instructions) {
    toast.error("กรุณากรอกข้อมูลให้ครบทุกช่อง");
    return;
  }

  try {
    const url = `${import.meta.env.VITE_API_URL}/api/recipe`;
    const response = await axios.post(url, recipe.value, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    if (response.status === 201) {
      toast.success("บันทึกเมนูสำเร็จ");
      router.push({ name: 'Home' });
    }
  } catch (error) {
    console.error(error);
    if (error.response?.status === 403) {
      toast.error("ไม่สามารถทำรายการได้");
    } else {
      toast.error("เกิดข้อผิดพลาดในการส่งข้อมูล");
    }
  }
}

</script>
