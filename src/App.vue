<!-- App.vue -->
<template>
  <div class="wrapper-sidebar-main-content">
    <transition name="sidebar-slide">
    <nav v-show="isMenuOpen">
      <Sidebar></Sidebar>
    </nav>
    </transition>
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
</template>

<script setup>
  import {
    RouterView
  } from 'vue-router';
  import Header from './components/Header.vue';
  import Sidebar from './components/Sidebar.vue';
  import Footer from './components/Footer.vue';
  import {
    ref
  } from 'vue';


  /* Menu toggable */

  const isMenuOpen = ref(false);

  const handleMenuToggle = (isOpen) => {
    isMenuOpen.value = isOpen;
  };
</script>

<style scoped>

</style>