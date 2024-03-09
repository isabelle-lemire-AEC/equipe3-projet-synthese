<!-- App.vue -->
<template>
  <div>
    <Accueil></Accueil>
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

export default {
  components: {
    Accueil,
    OffresStages,
    DetailOffresStages,
    MiseAjourOffresStage,


  }
}
</script>
