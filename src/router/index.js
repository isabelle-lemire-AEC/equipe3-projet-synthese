import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '../views/Accueil.vue';
import Erreur from '../views/Erreur.vue';
import DemandesStages from '../views/DemandesStages.vue';
import ConsulterDemandeStage from '../views/ConsulterDemandeStage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil,
    },
    {
      path: '/demandesstages',
      name: 'demandesstages',
      component: DemandesStages,
    },
    {
      path: '/consulterdemandestage',
      name: 'consulterdemandestage',
      component: ConsulterDemandeStage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'erreur',
      component: Erreur,
    }
  ],
});

export default router;
