<template>
    <div class="demandestages-list">
        <h1>Demandes de stage</h1>
        <RouterLink to="/demande-de-stage-ajout">
            <button class="bouton bouton--jaune">Ajouter une demande</button>
        </RouterLink>

        <div class="form-fiche__encadre">
            <table class="liste-5-colonnes listeStages">
                <thead class="liste__head">
                    <tr class="liste__rangee">
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--1">Poste</th>
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--2">Secteur d'activité</th>
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--3">Région</th>
                        <th class="liste__head__titre-colonne liste__head__titre-colonne--5">Date d'inscription</th>
                    </tr>
                </thead>
                <tbody class="liste__body">
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
                </tbody>
            </table>
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
import { useRouter } from 'vue-router';

const router = useRouter();

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


            toutesDemandes.value.forEach(demande => {
            if(demande.candidate === undefined || demande.candidate === null) {
                demande.candidate = {
                    firstName: "(Candidat effacé)",
                    lastName: ""
                }
            }
        });

        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        }
    });
</script>

<style scoped>

</style>