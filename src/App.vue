<!-- App.vue -->
<template>
  <header class="layout-header">
    <NavBar></NavBar>
    <nav>
      <Sidebar></Sidebar>
    </nav>
  </header>
  <main>
    <section class="container">
      <router-view />
    </section>
  </main>
  <footer>
    <Footer></Footer>
  </footer>
</template>

<script>
  import {
    RouterView
  } from 'vue-router';

  import NavBar from './components/NavBar.vue';
  import Sidebar from './components/Sidebar.vue';

  import Footer from './components/Footer.vue';

  export default {
    components: {
      NavBar,
      Sidebar,
      Footer
    }
  }
</script>

<style scoped>
  .main {
    margin-bottom: 200px;
  }
</style>