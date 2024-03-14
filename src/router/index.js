import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '../views/Accueil.vue';
import Erreur from '../views/Erreur.vue';
import DemandesStages from '../views/DemandesStages.vue';
import ConsulterDemandeStage from '../views/ConsulterDemandeStage.vue';
import AjoutDemandeStage from "../views/AjoutDemandeStage.vue";
import MiseAJourDemandeStage from "../views/MiseAJourDemandeStage.vue";

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
			path: "/ajout-demande-stage",
			name: "ajout-demande-stage",
			component: AjoutDemandeStage,
		},
		{
			path: "/mise-a-jour-demande-stage",
			name: "mise-a-jour-demande-stage",
			component: MiseAJourDemandeStage,
		},
    {
      path: '/:pathMatch(.*)*',
      name: 'erreur',
      component: Erreur,
    }
  ],
});

export default router;