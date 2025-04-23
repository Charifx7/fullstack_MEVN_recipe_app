<template>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" class="flex items-center">
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Recipe App</span>
            </a>

            <!-- Mobile menu button -->
            <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"></path>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            <!-- Desktop/Mobile Menu -->
            <div :class="[
                'w-full lg:flex lg:w-auto lg:order-1',
                isMenuOpen ? 'block' : 'hidden'
            ]">
                <ul
                    class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 font-medium items-center mt-4 lg:mt-0">
                    <!-- Logged in state -->
                    <template v-if="isLoggedIn">
                        <!-- Admin Button for admin -->
                        <li v-if="isAdmin">
                            <router-link to="/admin"
                                class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                                Manage
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                                to="/create-recipe">เพิ่มสูตรอาหาร</router-link>
                        </li>
                        <li class="relative">
                            <!-- Username button with dropdown -->
                            <button @click="isDropdownOpen = !isDropdownOpen"
                                class="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
                                <span>{{ username }}</span>
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <!-- Dropdown menu -->
                            <div v-if="isDropdownOpen"
                                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-2 z-50">
                                <button @click="handleProfile"
                                    class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                                    สูตรอาหารของฉัน
                                </button>
                                <button @click="handleLogout"
                                    class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                                    ออกจากระบบ
                                </button>
                            </div>

                        </li>
                    </template>

                    <!-- Logged out state -->
                    <template v-else>
                        <li>
                            <router-link
                                class="text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition"
                                to="/register">สมัครสมาชิก</router-link>
                        </li>
                        <li>
                            <router-link
                                class="text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition"
                                to="/login">เข้าสู่ระบบ</router-link>
                        </li>

                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const router = useRouter();
const toast = useToast();
const auth = useAuthStore();
const { isLoggedIn, username } = storeToRefs(auth);

const isMenuOpen = ref(false);
const isDropdownOpen = ref(false);

const isAdmin = computed(() => {
    const userRole = auth.user?.role;
    return userRole === 'admin';
});

const handleLogout = () => {
    auth.logout();
    isDropdownOpen.value = false;
    isMenuOpen.value = false;
    router.push('/');
};

const handleProfile = () => {
    router.push('/my-recipes');
};


const handleClickOutside = (event) => {
    const dropdown = document.querySelector('.relative');
    if (dropdown && !dropdown.contains(event.target)) {
        isDropdownOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>
