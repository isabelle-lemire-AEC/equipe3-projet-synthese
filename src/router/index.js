import { createRouter, createWebHistory } from 'vue-router';

//import Accueil from '../views/Accueil.vue';
import TableauDeBord from '../views/TableauDeBord.vue';

import OffresStages from '../views/OffresStages.vue';
import OffreStageDetails from '../views/OffreStageDetails.vue';
import OffreStageMiseAjour from '../views/OffreStageMiseAjour.vue';
import OffreStageAjout from '../views/OffreStageAjout.vue';

import DemandesStages from '../views/DemandesStages.vue';
import DemandeStageDetails from '../views/DemandeStageDetails.vue';
import DemandeStageMiseAjour from '../views/DemandeStageMiseAjour.vue';
import DemandeStageAjout from '../views/DemandeStageAjout.vue';

import Candidats from '../views/Candidats.vue';
import CandidatDetails from '../views/CandidatDetails.vue';
import CandidatMiseAjour from '../views/CandidatMiseAjour.vue';
import CandidatAjout from '../views/CandidatAjout.vue';

import Entreprises from '../views/Entreprises.vue';
import EntrepriseDetails from '../views/EntrepriseDetails.vue';
import EntrepriseMiseAjour from '../views/EntrepriseMiseAjour.vue';
import EntrepriseAjout from '../views/EntrepriseAjout.vue';

import Erreur from '../views/Erreur.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //{ path: '/', name: 'accueil', component: Accueil },
    { path: '/', name: 'TableauDeBord', component: TableauDeBord },
    { path: '/tableau-de-bord', name: 'TableauDeBord', component: TableauDeBord },

    { path: '/offres-de-stages', name: 'OffresStages', component: OffresStages },
    { path: '/offres-de-stages/offre-de-stage-details', name: 'OffreStageDetails', component: OffreStageDetails },
    { path: '/offre-de-stage-mise-a-jour', name: 'OffreStageMiseAjour', component: OffreStageMiseAjour },
    { path: '/offre-de-stage-ajout', name: 'OffreStageAjout', component: OffreStageAjout },

    { path: '/demandes-de-stages', name: 'DemandesStages', component: DemandesStages },
    { path: '/demande-de-stage-details/:id', name: 'DemandeStageDetails', component: DemandeStageDetails, props: true },
    { path: '/demande-de-stage-mise-a-jour', name: 'DemandeStageMiseAjour', component: DemandeStageMiseAjour }, // à effacer? ça ne devrait pas exister - JO
    { path: '/demande-de-stage-mise-a-jour/:id', name: 'DemandeStageMiseAjour', component: DemandeStageMiseAjour, props: true },
    { path: '/demande-de-stage-ajout', name: 'DemandeStageAjout', component: DemandeStageAjout },

    { path: '/candidats', name: 'Candidats', component: Candidats },
    { path: '/candidat/:id', name: 'CandidatDetails', component: CandidatDetails, props: true },
    { path: '/candidat-mise-a-jour/:id', name: 'CandidatMiseAjour', component: CandidatMiseAjour, props: true },
    { path: '/candidat-ajout', name: 'CandidatAjout', component: CandidatAjout },

    { path: '/entreprises', name: 'Entreprises', component: Entreprises },
    { path: '/entreprise-details/:id', name: 'EntrepriseDetails', component: EntrepriseDetails, props: true },
    { path: '/entreprise-mise-a-jour/:id', name: 'EntrepriseMiseAjour', component: EntrepriseMiseAjour, props: true },
    { path: '/entreprise-ajout', name: 'EntrepriseAjout', component: EntrepriseAjout },

    { path: '/:pathMatch(.*)*', name: 'erreur', component: Erreur }
  ],
});

export default router;