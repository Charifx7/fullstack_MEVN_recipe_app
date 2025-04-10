<template>
  <div>
    <!-- Hero Section -->
    <div class="relative min-h-[60vh] bg-gradient-to-br from-blue-500 via-blue-400 to-orange-100 overflow-hidden">
      <!-- Wallpaper -->
      <div class="absolute inset-0 bg-cover bg-center opacity-60"
        style="background-image: url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80');">
      </div>

      <!-- Overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>

      <!-- Content -->
      <div class="relative container mx-auto px-6 h-[60vh] flex items-center justify-center">

        <div class="max-w-2xl animate-fade-in">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-up drop-shadow-lg">
            รวบรวมสูตรอาหาร
          </h1>
          <p class="text-lg text-white/80 mb-8 animate-slide-up drop-shadow">
            รวบรวมสูตรอาหารจากทั่วทุกมุมโลก พร้อมขั้นตอนการทำที่ละเอียด
          </p>
          <button @click="scrollToRecipes"
            class="animate-bounce-subtle bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            ดูสูตรอาหารทั้งหมด
          </button>
        </div>
      </div>
    </div>

    <!-- Recipes Section -->
    <div class="container mx-auto px-6 py-12" id="recipe-list">
      <h2 class="text-2xl font-semibold mb-8">สูตรอาหารทั้งหมด</h2>
      <RecipeList />
    </div>
  </div>
</template>

<script setup>
import RecipeList from '@/components/RecipeList.vue';


const scrollToRecipes = () => {
  const element = document.getElementById('recipe-list');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};



</script>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

.animate-slide-up-delayed {
  animation: slideUp 0.8s ease-out forwards;
  animation-delay: 0.2s;
}

.animate-bounce-subtle {
  transition: transform 0.2s;
}

.animate-bounce-subtle:hover {
  animation: bounce 0.5s ease infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}
</style>
