<!-- App.vue -->
<template>
  <div>
    <RouterView />
  </div>

  <OffresStages></OffresStages>
  <DetailOffresStages></DetailOffresStages>
  <MiseAjourOffresStage></MiseAjourOffresStage>
</template>

<script>
import Accueil from './views/Accueil.vue';
import OffresStages from './views/OffresStages.vue';
import DetailOffresStages from './views/DetailOffresStages.vue';
import MiseAjourOffresStage from './views/MiseAjourOffresStage.vue';
import { RouterView } from 'vue-router';

export default {
  components: {
    Accueil,
    OffresStages,
    DetailOffresStages,
    MiseAjourOffresStage,


  }
}
</script>
