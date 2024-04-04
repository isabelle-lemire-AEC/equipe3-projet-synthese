<!-- TableauDeBord.vue -->
<template>
    <div class="tableau-bord">
        <div class="tableau-bord__info-rapide">
            <div class="tableau-bord__info-rapide-demandes">
                <div class="tableau-bord__icone-info-rapide">
                    <i class="fa-solid fa-file-lines"></i>
                </div>
                <div>
                    <p class="tableau-bord__info-rapide-categorie">Demandes de stage</p>
                    <p class="chiffre">{{ demandesCount }}</p>
                </div>

            </div>
            <div class="tableau-bord__info-rapide-offres">
                <div class="tableau-bord__icone-info-rapide">
                    <i class="fa-solid fa-paper-plane"></i>
                </div>
                <div>
                    <p class="tableau-bord__info-rapide-categorie">Offres de stage</p>
                    <p class="chiffre">{{ offresCount }}</p>
                </div>
            </div>
            <div class="tableau-bord__info-rapide-candidats-entreprises">
                <div class="tableau-bord__info-rapide-candidats">
                    <div class="tableau-bord__icone-info-rapide">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div>
                        <p class="bulle-candidat tableau-bord__info-rapide-categorie">Candidats</p>
                        <p class="chiffre">{{ candidatsCount }}</p>
                    </div>
                </div>
                <div class="tableau-bord__info-rapide-entreprises">
                    <div class="tableau-bord__icone-info-rapide">
                        <i class="fa-solid fa-computer-mouse bulle-entreprise"></i>
                    </div>
                    <div>
                        <p class="tableau-bord__info-rapide-categorie">Entreprises</p>
                        <p class="chiffre">{{ entreprisesCount }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Demande de stage -->
        <div class="tableau-bord__dernieres-demandes form-fiche__encadre">
            <div class="tableau-bord__entete-dernieres-demandes">
                <div>
                    <h2>Dernières <span>demandes</span> de stage</h2>
                    <p>En attente de validation</p>
                </div>
            </div>


            <table v-if="demandes && afficherDemandes">
                <thead class="liste__head">
                    <tr class="liste__rangee">
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--1">Poste</th>
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--2">Établissement</th>
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--3">Date</th>
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--4">Actions</th>
                    </tr>
                </thead>

                <tbody class="liste__body">
                    <ElementListeStage v-for="demande in demandes"
                        :key="demande._id"
                        :posteTitre="demande.title"
                        :posteNom="demande.candidate.firstName+' '+demande.candidate.lastName"
                        :info2="'Cégep de Trois-Rivières'"
                        :region="demande.province.value"
                        :date="demande.startDate"
                        :id="demande._id"
                        :isDemande="true"
                        :isTableauDeBord="true"
                        :isActive="demande.isActive">
                    </ElementListeStage>
                </tbody>
            </table>
        </div>

        <!-- Offre de stage -->
        <div class="tableau-bord__dernieres-demandes form-fiche__encadre">
            <div class="tableau-bord__entete-dernieres-offres">
                <div>
                    <h2>Dernières <span>offres</span> de stage</h2>
                    <p>En attente de validation</p>
                </div>
            </div>

            <table  v-if="offres && afficherOffres">
                <thead class="liste__head">
                    <tr class="liste__rangee">
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--1">Poste</th>
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--2">Ville</th>
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--3">Date</th>
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--4">Actions</th>
                    </tr>
                </thead>

                <tbody class="liste__body">
                    <ElementListeStage v-for="offre in offres"
                        :key="offre._id"
                        :posteTitre="offre.title"
                        :posteNom="offre.enterprise.name"
                        :info2="offre.enterprise.city"
                        :region="offre.province.value"
                        :date="offre.startDate"
                        :id="offre._id"
                        :isDemande="false"
                        :isTableauDeBord="true"
                        :isActive="offre.isActive">
                    </ElementListeStage>
                </tbody>
            </table>     
        </div>
    </div>
</template>
<script setup>
    import ElementListeStage from '../components/ElementListeStage.vue'
    import { ref, onMounted } from 'vue';
    import { useInternshipRequests } from '../composables/demandes_stages/demandeDeStage.js';
    import { useInternshipOffers } from '../composables/offres_stage/offreDeStage.js';
    import { useCandidat } from '../composables/candidats/candidat.js';
    import { useEntreprise } from '../composables/entreprises/entreprise.js';
    import { useActivitySectors } from '../composables/secteurs_activites/secteurs_activites.js'; 

    const {getAllNotActiveRequests,updateRequestStatus,getRequestsCount,activateRequest} = useInternshipRequests();
    const {getAllOffers,getInternshipOfferCount,activateOffer, getAllNotActiveOffers} = useInternshipOffers();
    const {getCandidatsCount} = useCandidat();
    const {getEntreprisesCount} = useEntreprise();
    const {getAllActivitySectors} = useActivitySectors();

    const demandes = ref([]);
    const offres = ref([]);
    const demandesCount = ref(null);
    const offresCount = ref(null);
    const candidatsCount = ref(null);
    const entreprisesCount = ref(null);
    const isTableauDeBord = ref(true);
    const afficherDemandes = ref(true);
    const afficherOffres = ref(true);
    const secteursActivites = ref([]);
    const secteurActivite = ref(null);

    const navigateToDemandeDetails = (demandeId) => {
        router.push({
            path: `/demande-de-stage-details/${demandeId}`,
            name: 'DemandeStageDetails',
            props: true
        });
    };

    const navigateToDemandeEdit = (demandeId) => {
        router.push({
            path: `/demande-de-stage-mise-a-jour/${demandeId}`,
            name: 'DemandeStageMiseAjour',
            props: true
        });
    };

    const validerToutesLesDemandes = async () => {
        demandes.value.forEach(async (demande) => {
            await activateRequest(demande._id);
        });
        afficherDemandes.value = !afficherDemandes.value;
    };

    const validerToutesLesOffres = async () => {
        offres.value.forEach(async (offre) => {
            await activateOffer(offre._id);
        });
        afficherOffres.value = !afficherOffres.value;
    };

    onMounted(async () => {
        secteursActivites.value = await getAllActivitySectors();
        secteurActivite.value = secteursActivites.value[Math.floor(Math.random() * secteursActivites.value.length)];
        demandes.value = await getAllNotActiveRequests();

        demandes.value.forEach(demande => {
            if(demande.candidate === undefined || demande.candidate === null) {
                demande.candidate = {
                    firstName: "(Candidat effacé)",
                    lastName: ""
                }
            }
        });

        offres.value = await getAllNotActiveOffers();

        offres.value.forEach(offre => {
            if(offre.enterprise === undefined || offre.enterprise === null) {
                offre.enterprise = {
                    city: "",
                    name: "(Entreprise effacé)"
                }
            }
        });

        demandesCount.value = await getRequestsCount();
        offresCount.value = await getInternshipOfferCount();
        candidatsCount.value = await getCandidatsCount();
        entreprisesCount.value = await getEntreprisesCount();
    });
</script>