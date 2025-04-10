<template>
    <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

                <!-- โลโก้ -->
                <a href="/" class="flex items-center">
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Recipe App</span>
                </a>

                <!-- เมนูด้านซ้าย -->
                <div class="hidden lg:flex lg:w-auto lg:order-1">
                    <ul class="flex flex-row space-x-6 font-medium items-center">
                        <li>
                            <router-link
                                class="text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition"
                                to="/">
                                หน้าแรก
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                                to="/create-recipe">
                                เพิ่มสูตรอาหาร
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Hamburger menu -->
                <div class="flex items-center lg:hidden">
                    <button data-collapse-toggle="mobile-menu-2" type="button"
                        class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu-2" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <!-- icon -->
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

            </div>
        </nav>
    </header>
</template>