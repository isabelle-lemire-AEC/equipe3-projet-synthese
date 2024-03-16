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

import Accueil from './views/Accueil.vue';
import OffresStages from './views/OffresStages.vue';
import Candidats from './views/Candidats.vue';
import CandidatDetails from './views/CandidatDetails.vue';
import CandidatAjout from './views/CandidatAjout.vue';
import CandidatMiseAjour from './views/CandidatMiseAjour.vue';
import Sidebar from './components/Sidebar.vue';
import OffreStageMiseAjour from './views/OffreStageMiseAjour.vue';


export default {
  components: {
    Accueil,
    OffresStages,
    Candidats,
    CandidatDetails,
    CandidatAjout,
    CandidatMiseAjour,
    OffreStageMiseAjour,
    Sidebar
  }
}
</script>
