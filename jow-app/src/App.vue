<script setup>
import Home from './components/Home.vue';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar></NavBar>
  <nav>
    <router-link to="/accueil"></router-link>
    <router-link to="/liste_de_course"></router-link>
    <router-view></router-view>
  </nav>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
