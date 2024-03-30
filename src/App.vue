<!-- App.vue -->
<template>
  <div>
    <section v-if="isHomePage">
      <Accueil></Accueil>
    </section>
    <div v-else class="wrapper-sidebar-main-content">
      <nav>
        <Sidebar></Sidebar>
      </nav>
      <div class="wrapper-main-content">
        <header class="layout-header">
          <Header @menu-toggled="handleMenuToggle"></Header>
        </header>
        <main>
          <section class="container">
            <router-view />
          </section>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { RouterView, useRoute } from 'vue-router';
  import { ref, computed } from 'vue';
  
  import Header from './components/Header.vue';
  import Sidebar from './components/Sidebar.vue';
  import Footer from './components/Footer.vue';
  import Accueil from './views/Accueil.vue';

  const route = useRoute();
  const isMenuOpen = ref(false);

  const handleMenuToggle = (isOpen) => {
    isMenuOpen.value = isOpen;
    console.log("menu ouvert")
  };

  // Fonction pour vérifier si la page actuelle est la page d'accueil
  const isHomePage = computed(() => route.name === 'accueil');
</script>

<style scoped>
/* Styles */
</style>
