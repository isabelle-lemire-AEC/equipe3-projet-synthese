<!-- App.vue -->
<template>
  <div>
    <RouterView />
  </div>
  
  <!-- 
  <Accueil></Accueil>
  
  <OffresStages></OffresStages>
  <DetailOffresStages></DetailOffresStages>
  <MiseAjourOffresStage></MiseAjourOffresStage>
  <AjoutOffresStages></AjoutOffresStages>

  <Candidats></Candidats>
  <CandidatDetails></CandidatDetails>
  <CandidatMiseAjour></CandidatMiseAjour>
  <CandidatAjout></CandidatAjout>
  -->
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
    CandidatMiseAjour
  }
}
</script>
