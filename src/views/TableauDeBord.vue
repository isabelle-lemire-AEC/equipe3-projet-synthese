<!-- TableauDeBord.vue / débuter par Caro, continuer par Isa -->
<template>
    <div class="container">
        <section class="infoRapide flex">
            <div class="infoRapide-demandes flex">
                <i class="fa-solid fa-file-lines"></i>
                <div>
                    <p>Demandes de stage</p>
                    <p>{{ demandesCount }}</p>
                </div>
            </div>
            <div class="infoRapide-offres flex">
                <i class="fa-solid fa-paper-plane"></i>
                <div>
                    <p>Offres de stage</p>
                    <p>{{ offresCount }}</p>
                </div>
            </div>
            <div class="infoRapide-candidat-entreprise flex" >
                <div class="infoRapide-candidats">
                    <i class="fa-solid fa-user"></i>
                    <div>
                        <p>Candidats</p>
                        <p>{{ candidatsCount }}</p>
                    </div>
                </div>
                <div class="infoRapide-entreprises flex">
                    <i class="fa-solid fa-computer-mouse"></i>
                    <div>
                        <p>Entreprises</p>
                        <p>{{ entreprisesCount }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Demande de stage -->
        <section class="dernieresDemandes">
            <div class="flex">
                <div>
                    <h2>Dernières <span>demandes</span> de stage</h2>
                    <h4>En attente de validation</h4>
                </div>
                <button @click="validerToutesLesDemandes()">Valider toutes les demandes</button>
            </div>
            <div>
                <div class="flex">
                    <p>Poste</p>
                    <p>Etablissement</p>
                    <p>Date</p>
                    <p>Actions</p>
                </div>

                <div v-if="demandes && afficherDemandes">
                    <ElementListeStage v-for="demande in demandes"
                        :key="demande._id"
                        :posteTitre="demande.title"
                        :posteNom="demande.candidate.firstName+' '+demande.candidate.lastName"
                        :region="demande.province.value"
                        :date="demande.startDate"
                        :id="demande._id"
                        :isDemande="true"
                        :isTableauDeBord="true"
                        :isActive="demande.isActive"></ElementListeStage>
                </div>
            </div>
        </section>

        <hr style="margin: 25px 0;"> <!-- à deleter, seulement pour faire section -->

        <!-- Offre de stage -->
        <section class="dernieresOffres">
            <div class="flex">
                <div>
                    <h2>Dernières <span>offres</span> de stage</h2>
                    <h4>En attente de validation</h4>
                </div>
                <button @click="validerToutesLesOffres()">Valider toutes les offres</button>
            </div>

            <div>
                <div class="flex">
                    <p>Poste</p>
                    <p>Ville</p>
                    <p>Date</p>
                    <p>Action</p>
                </div>
                <div v-if="offres && afficherOffres">
                    <ElementListeStage v-for="offre in offres"
                        :key="offre._id"
                        :posteTitre="offre.title"
                        :posteNom="offre.enterprise.name"
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
    import ElementListeStage from '../components/ElementListeStage.vue'
    import { ref, onMounted } from 'vue';
    import { useInternshipRequests } from '../composables/demandes_stages/demandeDeStage.js';
    import { useInternshipOffers } from '../composables/offres_stage/offreDeStage.js';
    import { useCandidat } from '../composables/candidats/candidat.js';
    import { useEntreprise } from '../composables/entreprises/entreprise.js';
    import TBListeDemandeStageAttente from '../components/TBListeDemandeStageAttente.vue';
    import TBListeOffreStageAttente from '../components/TBListeOffreStageAttente.vue';

    const { getAllNotActiveRequests, updateRequestStatus, getRequestsCount, activateRequest } = useInternshipRequests();
    const { getAllOffers, getInternshipOfferCount, activateOffer } = useInternshipOffers();
    const { getCandidatsCount } = useCandidat();
    const { getEntreprisesCount } = useEntreprise();
    const demandes = ref([]);
    const offres = ref([]);
    const demandesCount = ref(null);
    const offresCount = ref(null);
    const candidatsCount = ref(null);
    const entreprisesCount = ref(null);
    const isTableauDeBord = ref(true);
    const afficherDemandes = ref(true);
    const afficherOffres = ref(true);

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
        demandes.value = await getAllNotActiveRequests();
        offres.value = await getAllOffers();
        demandesCount.value = await getRequestsCount();
        offresCount.value = await getInternshipOfferCount();
        candidatsCount.value = await getCandidatsCount();
        entreprisesCount.value = await getEntreprisesCount();
    });

</script>

<!--<style scoped>
 .flex {
    display: flex;
 }

 .infoRapide-demandes,
 .infoRapide-offres,
 .infoRapide-candidats,
 .infoRapide-entreprises {
    background-color: beige;
    padding: 25px;
    margin-right: 25px;
    border-radius: 25px;
 }

</style>-->