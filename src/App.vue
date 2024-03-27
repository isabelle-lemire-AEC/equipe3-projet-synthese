<!-- App.vue -->
<template>
  <div class="wrapper-sidebar-main-content">
    <nav v-if="!isHomePage">
      <Sidebar></Sidebar>
    </nav>
    <div class="wrapper-main-content">
      <header class="layout-header" v-if="!isHomePage">
        <Header @menu-toggled="handleMenuToggle"></Header>
      </header>
      <main>
        <section class="container">
          <router-view />
        </section>
      </main>
      <footer v-if="!isHomePage">
        <Footer></Footer>
      </footer>
    </div>
  </div>
</template>

<script setup>
  import { RouterView, useRoute } from 'vue-router';
  import Header from './components/Header.vue';
  import Sidebar from './components/Sidebar.vue';
  import Footer from './components/Footer.vue';
  import { ref, computed } from 'vue';

  const route = useRoute();
  const isMenuOpen = ref(false);

  const handleMenuToggle = (isOpen) => {
    isMenuOpen.value = isOpen;
  };

  // Fonction pour vérifier si la page actuelle est la page d'accueil
  const isHomePage = computed(() => route.name === 'accueil');
</script>

<style scoped>
/* Styles */
</style>
