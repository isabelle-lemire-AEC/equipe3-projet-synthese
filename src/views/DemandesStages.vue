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

/*html, body {
    background-color: rgb(222, 222, 222);
    font-family: Arial, Helvetica, sans-serif;
}

h1 {
    margin: 0 0 3rem 0;
    padding: 0;
}

.pageContainer {
    padding: 2rem;
    margin: 2rem;
}

.listeStagesHeader {
    display: none;
}

.listeStages {
    background-color: white;
    padding: 4rem 2rem 2rem 2rem;
    border-radius: 1rem;
}

.ajouterDemande {
    margin: 0 0 1rem 0;
    padding: 0.8rem;
    border-radius: 0.3rem;
    border: 0px solid white;
    background-color: orange;
    color: white;
}

.iconTemp {
    background-color: orange;
    width: 40px;
    height: 40px;
    border-radius: 0.5rem;
}

.elementStage {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0 0 0;
    padding: 0 0 1rem 0;
    border-bottom: 0.1rem solid rgb(193, 193, 193);
}

.barreVerticale {
    width: 0.3rem;
    background-color: orange;
}

.poste {
    display: flex;
    flex-direction: column;
}*/
</style>