<!-- App.vue -->
<template>
  <OffresStages></OffresStages>
  <OffresStagesDetail></OffresStagesDetail>
  <OffresStageMiseAjour></OffresStageMiseAjour>
</template>

<script>

import { RouterView } from 'vue-router';

import Accueil from './views/Accueil.vue';
import OffresStages from './views/OffresStages.vue';
import OffresStagesDetail from './views/OffresStagesDetail.vue';
import OffresStageMiseAjour from './views/OffresStageMiseAjour.vue';

export default {
  components: {
    Accueil,
    OffresStages,
    OffresStagesDetail,
    OffresStageMiseAjour,


  }
}
</script>
./views/OffresStagesDetail.vue./views/OffresStageMiseAjour.vue