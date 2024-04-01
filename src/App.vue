<!-- App.vue -->
<template>
  <div>
    <section v-if="isHomePage">
      <Accueil></Accueil>
    </section>
    <div v-else class="wrapper-sidebar-main-content">
      <nav>
        <Sidebar v-if="showSidebar"></Sidebar>
      </nav>
      <div class="wrapper-main-content">
        <header class="layout-header">
          <Header :toggleSidebar="toggleSidebar"></Header>
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
  

  // Fonction pour fermer la sidebar en réponse à l'événement du Header
  const showSidebar = ref(false);
  const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
  };
 

  // Fonction pour vérifier si la page actuelle est la page d'accueil
  const isHomePage = computed(() => route.name === 'accueil');
</script>

<style scoped>
/* Styles */
</style>
