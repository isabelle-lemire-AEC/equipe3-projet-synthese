<!-- TableauDeBord.vue -->
<template>
    <div>
        <section class="infoRapide">
            <div class="infoRapide-demandes">
                <div class="icone-infoRapide">
                    <i class="fa-solid fa-file-lines"></i>
                </div>
                <div>
                    <p>Demandes de stage</p>
                    <p class="chiffre">{{ demandesCount }}</p>
                </div>
                
            </div>
            <div class="infoRapide-offres">
                <div class="icone-infoRapide">
                    <i class="fa-solid fa-paper-plane"></i>
                </div>
                <div>
                    <p>Offres de stage</p>
                    <p class="chiffre">{{ offresCount }}</p>
                </div>
            </div>
            <div class="infoRapide-candidat-entreprise" >
                <div class="infoRapide-candidats">
                    <div class="icone-infoRapide">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div>
                        <p class="bulle-candidat">Candidats</p>
                        <p class="chiffre">{{ candidatsCount }}</p>
                    </div>
                </div>
                <div class="infoRapide-entreprises">
                    <div class="icone-infoRapide">
                        <i class="fa-solid fa-computer-mouse bulle-entreprise"></i>
                    </div>
                    <div>
                        <p>Entreprises</p>
                        <p class="chiffre">{{ entreprisesCount }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Demande de stage -->
        <section class="dernieresDemandes">
            <div class="entete-dernieresDemandes-Offres">
                <div>
                    <h2>Dernières <span>demandes</span> de stage</h2>
                    <h4>En attente de validation</h4>
                </div>
                <button class="bouton bouton--turquoise" @click="validerToutesLesDemandes()">Valider toutes les demandes</button>
            </div>
            <div>
                <div class="liste-header">
                    <span>Poste</span>
                    <span>Etablissement</span>
                    <span>Date</span>
                    <span>Actions</span>
                </div>
                

                <div v-if="demandes && afficherDemandes">
                    <ElementListeStage v-for="demande in demandes"
                        :key="demande._id"
                        :posteTitre="demande.title"
                        :posteNom="demande.candidate.firstName+' '+demande.candidate.lastName"
                        :info2="secteurActivite.value"
                        :region="demande.province.value"
                        :date="demande.startDate"
                        :id="demande._id"
                        :isDemande="true"
                        :isTableauDeBord="true"
                        :isActive="demande.isActive"></ElementListeStage>
                </div>
            </div>
        </section>

        <!-- Offre de stage -->
        <section class="dernieresOffres">
            <div class="entete-dernieresDemandes-Offres">
                <div>
                    <h2>Dernières <span>offres</span> de stage</h2>
                    <h4>En attente de validation</h4>
                </div>
                <button class="bouton bouton--turquoise" @click="validerToutesLesOffres()">Valider toutes les offres</button>
            </div>

            <div>
                <div class="liste-header">
                    <span>Poste</span>
                    <span>Ville</span>
                    <span>Date</span>
                    <span>Action</span>
                </div>
                <div v-if="offres && afficherOffres">
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
                        :isActive="offre.isActive"></ElementListeStage>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
    import ElementListeStage from '../components/elementListeStage.vue'
    import { ref, onMounted } from 'vue';
    import { useInternshipRequests } from '../composables/demandes_stages/demandeDeStage.js';
    import { useInternshipOffers } from '../composables/offres_stage/offreDeStage.js';
    import { useCandidat } from '../composables/candidats/candidat.js';
    import { useEntreprise } from '../composables/entreprises/entreprise.js';
    import { useActivitySectors } from '../composables/secteurs_activites/secteurs_activites.js'; 

    const { getAllNotActiveRequests, updateRequestStatus, getRequestsCount, activateRequest } = useInternshipRequests();
    const { getAllOffers, getInternshipOfferCount, activateOffer } = useInternshipOffers();
    const { getCandidatsCount } = useCandidat();
    const { getEntreprisesCount } = useEntreprise();
    const { getAllActivitySectors } = useActivitySectors();

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
        demandes.value.forEach(demande => {
            activateRequest(demande._id);
        });
        afficherDemandes.value = !afficherDemandes.value;
    };

    const validerToutesLesOffres = async () => {
        offres.value.forEach(offre => {
            activateOffer(offre._id);
        });
        afficherOffres.value = !afficherOffres.value;
    };

    onMounted(async () => {
        secteursActivites.value = await getAllActivitySectors();
        secteurActivite.value = secteursActivites.value[Math.floor(Math.random() * secteursActivites.value.length)];
        demandes.value = await getAllNotActiveRequests();
        offres.value = await getAllOffers();
        demandesCount.value = await getRequestsCount();
        offresCount.value = await getInternshipOfferCount();
        candidatsCount.value = await getCandidatsCount();
        entreprisesCount.value = await getEntreprisesCount();
    });

</script>