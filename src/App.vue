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
import DetailOffresStages from './views/DetailOffresStages.vue';
import MiseAjourOffresStage from './views/MiseAjourOffresStage.vue';
import AjoutOffresStages from './views/AjoutOffresStages.vue';
import Candidats from './views/Candidats.vue';
import CandidatDetails from './views/CandidatDetails.vue';
import CandidatAjout from './views/CandidatAjout.vue';
import CandidatMiseAjour from './views/CandidatMiseAjour.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  components: {
    Accueil,
    OffresStages,
    DetailOffresStages,
    MiseAjourOffresStage,
    AjoutOffresStages,
    Candidats,
    CandidatDetails,
    CandidatAjout,
    CandidatMiseAjour,
    Sidebar
  }
}
</script>
./views/OffresStagesDetail.vue./views/OffresStageMiseAjour.vue
