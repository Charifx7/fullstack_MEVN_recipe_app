<template>
  <div class="container mx-auto px-6 py-12">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-semibold">อาหารทั้งหมด</h2>
      
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Recipe List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="recipe in recipes" :key="recipe._id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <img :src="recipe.image" :alt="recipe.name" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2 dark:text-white">{{ recipe.name }}</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{{ recipe.instructions }}</p>
          <div class="flex justify-end space-x-2">
            <button @click="openEditModal(recipe)"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition duration-200">
              แก้ไข
            </button>
            <button @click="deleteRecipe(recipe)"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200">
              ลบ
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <transition name="modal" 
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95" 
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-200" 
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95">
        <div v-if="isEditModalOpen"
            class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 overflow-hidden modal-open"
            @click="closeEditModal">
            <div class="bg-white/95 dark:bg-gray-800/95 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto overflow-x-hidden shadow-xl mt-16"
                @click.stop>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-2xl font-bold text-gray-900 dark:text-white break-words max-w-[calc(100%-3rem)]">
                            แก้ไขอาหาร
                        </h3>
                        <button @click="closeEditModal" class="text-gray-400 hover:text-gray-500">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <form @submit.prevent="updateRecipe" class="space-y-6">
                        <!-- ชื่ออาหาร -->
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">ชื่ออาหาร</label>
                            <input type="text" v-model="selectedRecipe.name"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="กรอกชื่ออาหาร" required>
                        </div>

                        <!-- URL ภาพ -->
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">URL ภาพ</label>
                            <input type="url" v-model="selectedRecipe.image"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="กรอก URL ภาพ" required>
                            <div v-if="selectedRecipe.image" class="mt-4">
                                <img :src="selectedRecipe.image" alt="ภาพอาหารอย่างชัดเจน" 
                                    class="w-full h-64 object-cover rounded-lg shadow-md">
                            </div>
                        </div>

                        <!-- ส่วนผสม -->
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">ส่วนผสม</label>
                            <textarea v-model="selectedRecipe.ingredient"
                                class="w-full h-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                                placeholder="กรอกส่วนผสม" required></textarea>
                        </div>

                        <!-- ทำ -->
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">วิธี</label>
                            <textarea v-model="selectedRecipe.instructions"
                                class="w-full h-60 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                                placeholder="กรอกทำ" required></textarea>
                        </div>

                        <div class="flex gap-4">
                            <button type="button" @click="closeEditModal"
                                class="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200">
                                ยกเลิก
                            </button>
                            <button type="submit"
                                class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
                                แก้ไข
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const router = useRouter();
const toast = useToast();
const recipes = ref([]);
const loading = ref(true);
const selectedRecipe = ref(null);
const isEditModalOpen = ref(false);

const fetchAllRecipes = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/recipe`);
    recipes.value = response.data;
  } catch (error) {
    console.error(error);
    toast.error('ไม่สามารถโหลดข้อมูลได้');
  } finally {
    loading.value = false;
  }
};

const openEditModal = (recipe) => {
  selectedRecipe.value = { ...recipe };
  isEditModalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeEditModal = () => {
  selectedRecipe.value = null;
  isEditModalOpen.value = false;
  document.body.style.overflow = 'auto';
};

const updateRecipe = async () => {
  if (!selectedRecipe.value.name || !selectedRecipe.value.image || 
      !selectedRecipe.value.ingredient || !selectedRecipe.value.instructions) {
    toast.error("กรอกข้อมูลให้ครบช่อง");
    return;
  }

  try {
    const token = auth.token;
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/recipe/${selectedRecipe.value._id}`,
      selectedRecipe.value,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    if (response.status === 200) {
      toast.success('แก้ไขข้อมูลสำเร็จ');
      await fetchAllRecipes();
      closeEditModal();
    }
  } catch (error) {
    console.error(error);
    toast.error('ข้อผิดพลาดในการแก้ไขข้อมูล');
  }
};

const deleteRecipe = async (recipe) => {
  const result = await Swal.fire({
    title: 'ยืนยันการลบ',
    text: `ต้องการลบ ${recipe.name} ใช่หรือไม่?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#42bd41',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'ลบ',
    cancelButtonText: 'ยกเลิก'
  });

  if (result.isConfirmed) {
    try {
      const token = auth.token;
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/recipe/${recipe._id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response.status === 200) {
        Swal.fire('ลบสำเร็จ!', 'ถูกลบแล้ว', 'success');
        fetchAllRecipes();
      }
    } catch (error) {
      console.error(error);
      Swal.fire('ข้อผิดพลาด!', 'ไม่สามารถลบได้', 'error');
    }
  }
};

onMounted(() => {
  fetchAllRecipes();
});
</script>

<style scoped>
.modal-open {
  overflow: hidden;
}
</style>
