<template>
    <div>
        <h1>Demandes de stage</h1>
        <RouterLink to="/demande-de-stage-ajout">
            <button class="bouton bouton--jaune">Ajouter une demande</button>
        </RouterLink>
        <div class="listeStages">
            <div class="liste-header">
                <span>Poste</span>
                <span>Secteur d'activité</span>
                <span>Région</span>
                <span>Date d'inscription</span>
            </div>
            <ElementListeStage v-for="demande in toutesDemandes" 
                :key="demande._id" 
                :posteTitre="demande.title" 
                :posteNom="demande.candidate.firstName+' '+demande.candidate.lastName" 
                :info2="secteurActivite.value"
                :region="demande.province.value" 
                :date="demande.startDate" 
                :id="demande._id" 
                :isDemande="true"
                :isTableauDeBord="false"
                :isActive="demande.isActive"></ElementListeStage>
        </div>
    </div>
</template>

<script setup>
import ElementListeStage from '../components/ElementListeStage.vue'
import { useInternshipRequests } from '../composables/demandes_stages/demandeDeStage.js'
import { useCandidat } from '../composables/candidats/candidat.js'
import { useProvinces } from '../composables/provinces/provinces.js'
import { useInternshipTypes } from '@/composables/types_stage/types_stage.js'
import { ref, onMounted } from 'vue';
import { useActivitySectors } from '../composables/secteurs_activites/secteurs_activites.js'; 

const { getAllRequests, editRequest } = useInternshipRequests();
const { getAllCandidats } = useCandidat();
const { getAllProvinces } = useProvinces();
const { getAllInternshipTypes } = useInternshipTypes();
const { getAllActivitySectors } = useActivitySectors();

const toutesDemandes = ref([]);
const secteursActivites = ref([]);
const secteurActivite = ref(null);

onMounted(async () => {
    secteursActivites.value = await getAllActivitySectors();
    secteurActivite.value = secteursActivites.value[Math.floor(Math.random() * secteursActivites.value.length)];

    try {
        const response = await getAllRequests();
        toutesDemandes.value = response.data;
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
});

</script>

<style scoped>
</style>