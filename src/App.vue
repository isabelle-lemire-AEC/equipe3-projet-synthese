<!-- App.vue -->
<template>

  <div class="container">
    <NavBar></NavBar>
    <div class="main flex">
      <Sidebar></Sidebar>
      <div class="content">
        <OffresStages></OffresStages>
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
import OffresStages from './views/OffresStages.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    NavBar,
    Sidebar,
    OffresStages,
    Footer
  }
}
</script>