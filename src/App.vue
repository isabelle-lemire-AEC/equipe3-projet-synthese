<!-- App.vue -->
<template>

  <div class="container">
    <NavBar></NavBar>
    <div class="main flex">
      <Sidebar></Sidebar>
      <div class="content">
        <router-view />
      </div>
    </div>
    <Footer></Footer>
  </div>
  
</template>

<script>

  import { RouterView } from 'vue-router';

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

<style>
  .main {
    margin-bottom: 200px;
  }
</style>