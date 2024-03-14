import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '../views/Accueil.vue';
import Erreur from '../views/Erreur.vue';
import AjoutDemandeStage from "../views/AjoutDemandeStage.vue";
import MiseAJourDemandeStage from "../views/MiseAJourDemandeStage.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "accueil",
			component: Accueil,
		},
		{
			path: "/:pathMatch(.*)*",
			name: "erreur",
			component: Erreur,
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
	],
});

export default router;
