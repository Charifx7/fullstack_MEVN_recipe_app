<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br py-12 px-4 sm:px-6 lg:px-5">
        <div class="max-w-md w-full space-y-8 bg-white backdrop-blur-sm p-8 rounded-2xl shadow-xl">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    เข้าสู่ระบบเพื่อเริ่มต้นใช้งาน
                </p>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
                <div class="space-y-4">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">ชื้อผู้ใช้</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input v-model="username" id="username" name="username" type="text" required
                                class="pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                placeholder="กรอกชื้อผู้ใช้">
                        </div>
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input v-model="password" id="password" name="password" type="password" required
                                class="pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                placeholder="กรอกรหัสผ่าน">
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-150 hover:scale-[1.02]">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="h-5 w-5 text-blue-300 group-hover:text-blue-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        เข้าระบบ
                    </button>
                </div>
            </form>
            <div class="text-center space-x-1">
                <span class="text-gray-500">ยังไม่มีบัญชี</span>
                <router-link to="/register" 
                    class="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-150">
                    สมัครสมาชิก
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const toast = useToast();
const auth = useAuthStore();


const username = ref('');
const password = ref('');

const handleLogin = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            username: username.value,
            password: password.value
        });

        if (response.data.token) {
            auth.login(response.data.token, response.data.user); 
            toast.success('เข้าสู่ระบบสำเร็จ');
            router.push('/');
        }
    } catch (error) {
        toast.error(error.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ');
    }
};
</script>


