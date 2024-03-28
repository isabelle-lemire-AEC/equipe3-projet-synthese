<!-- TableauDeBord.vue / débuter par Caro, continuer par Isa -->
<template>
    <div class="container">
        <section class="infoRapide flex">
            <div class="infoRapide-demandes flex">
                <i class="fa-solid fa-file-lines"></i>
                <div>
                    <p>Demandes de stage</p>
                    <p>125</p>
                </div>
            </div>
            <div class="infoRapide-offres flex">
                <i class="fa-solid fa-paper-plane"></i>
                <div>
                    <p>Offres de stage</p>
                    <p>58</p>
                </div>
            </div>
            <div class="infoRapide-candidats flex">
                <i class="fa-solid fa-user"></i>
                <div>
                    <p>Candidats</p>
                    <p>125</p>
                </div>
            </div>
            <div class="infoRapide-entreprises flex">
                <i class="fa-solid fa-computer-mouse"></i>
                <div>
                    <p>Entreprises</p>
                    <p>125</p>
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
                <button @click="validerToutesLesDemandes">Valider toutes les demandes</button> <!-- non fonctionnel -->
            </div>
            <div>
                <div class="flex">
                    <p>Poste</p>
                    <p>Etablissement</p>
                    <p>Date</p>
                    <p>Actions</p>
                </div>
                <div v-if="demandes.length > 0">
                    <TBListeDemandeStageAttente 
                        v-for="demande in demandes" 
                        :key="demande._id" 
                        :demande="demande" 
                        @viewDetails="navigateToDemandeDetails"
                        @editRequest="navigateToDemandeEdit"
                    />
                </div>
                <div v-else>
                    <p>Il n'y a pas de demande de stage en attente de validation</p>
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
                <button>Valider toutes les offres</button>
            </div>

            <div>
                <div class="flex">
                    <p>Poste</p>
                    <p>Ville</p>
                    <p>Date</p>
                    <p>Action</p>
                </div>
                <TBListeOffreStageAttente></TBListeOffreStageAttente>
                <TBListeOffreStageAttente></TBListeOffreStageAttente>
                <TBListeOffreStageAttente></TBListeOffreStageAttente>
                <TBListeOffreStageAttente></TBListeOffreStageAttente>

            </div>
            
        </section>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useInternshipRequests } from '../composables/demandes_stages/demandeDeStage';

    import TBListeDemandeStageAttente from '../components/TBListeDemandeStageAttente.vue'
    import TBListeOffreStageAttente from '../components/TBListeOffreStageAttente.vue'

    const { getAllNotActiveRequests, updateRequestStatus } = useInternshipRequests();
    const demandes = ref([]);

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
        try {
            await Promise.all(demandes.value.map(async (demande) => {
                await updateRequestStatus(demande._id, true);
                demande.isActive = true;
            }));
        } catch (error) {
            console.error("Erreur lors de la validation des demandes :", error);
        }
    };

    onMounted(async () => {
        demandes.value = await getAllNotActiveRequests();
    });

</script>

<style scoped>
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

</style>