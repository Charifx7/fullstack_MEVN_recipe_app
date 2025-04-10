<template>
  <div class="app">
    <Header />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 20px;
}
</style>

