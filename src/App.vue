<!-- App.vue -->
<template>
  <RouterView />
  <CandidatMiseAjour></CandidatMiseAjour>
  <hr>
  <CandidatAjout></CandidatAjout>
  <hr>
  <Candidats></Candidats>
  <hr>
  <CandidatDetails></CandidatDetails>
  <hr>
  
  <!-- 
  <Accueil></Accueil>
  <div>
  </div>

  <OffresStages></OffresStages>
  <DetailOffresStages></DetailOffresStages>
  <MiseAjourOffresStage></MiseAjourOffresStage>
  -->
</template>

<script>
import Accueil from './views/Accueil.vue';
import OffresStages from './views/OffresStages.vue';
import DetailOffresStages from './views/DetailOffresStages.vue';
import MiseAjourOffresStage from './views/MiseAjourOffresStage.vue';
import Candidats from './views/Candidats.vue';
import CandidatDetails from './views/CandidatDetails.vue';
import CandidatAjout from './views/CandidatAjout.vue';
import CandidatMiseAjour from './views/CandidatMiseAjour.vue';
import { RouterView } from 'vue-router';

export default {
  components: {
    Accueil,
    OffresStages,
    DetailOffresStages,
    MiseAjourOffresStage,
    Candidats,
    CandidatDetails,
    CandidatAjout,
    CandidatMiseAjour
  }
}
</script>
