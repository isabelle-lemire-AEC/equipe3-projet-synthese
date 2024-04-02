<template>
    <div class="demandestages-list">
        <h1>Demandes de stage</h1>
        <button class="bouton bouton--jaune" @click="goToDemandesAjout">Ajouter une demande</button>

        <div class="form-fiche__encadre"> 

            <table>
                <thead class="liste__head">
                    <tr class="liste__rangee">
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--1">Poste</th>
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--2">Secteur d'activité</th>
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--3">Région</th>
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--4">Date d'inscritpion</th>
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--5"></th>
                    </tr>
                </thead>

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
                    :isActive="demande.isActive">
                </ElementListeStage>                
            </table>
        </div>            


    </div>
</template>

<script setup>
    import { useInternshipRequests } from '../composables/demandes_stages/demandeDeStage.js'
    import { useCandidat } from '../composables/candidats/candidat.js'
    import { useProvinces } from '../composables/provinces/provinces.js'
    import { useInternshipTypes } from '@/composables/types_stage/types_stage.js'
    import { ref, onMounted } from 'vue';
    import { useActivitySectors } from '../composables/secteurs_activites/secteurs_activites.js'; 
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const { getAllRequests, editRequest } = useInternshipRequests();
    const { getAllCandidats } = useCandidat();
    const { getAllProvinces } = useProvinces();
    const { getAllInternshipTypes } = useInternshipTypes();
    const { getAllActivitySectors } = useActivitySectors();

    import ElementListeStage from '../components/elementListeStage.vue'

    const toutesDemandes = ref([]);
    const secteursActivites = ref([]);
    const secteurActivite = ref(null);

    // Fonction pour naviguer vers la page d'ajout de demandes de stage
    const goToDemandesAjout = () => {
        router.push({
        name: 'DemandeStageAjout'
        });
    };
    
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