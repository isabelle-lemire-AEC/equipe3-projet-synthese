<template>
    <div class="pageContainer">
        <h1>Demandes de stage</h1>
        <RouterLink to="/demande-de-stage-ajout">
            <button>Ajouter une demande</button>
        </RouterLink>
        <div class="listeStages">
            <div class="listeStagesHeader">
                <span>Poste</span>
                <span>Secteur d'activité</span>
                <span>Région</span>
                <span>Date d'inscription</span>
            </div>
            <ElementListeStage v-for="demande in toutesDemandes" :key="demande._id" :stage="demande"></ElementListeStage>
        </div>
    </div>
</template>

<script setup>
import ElementListeStage from '../components/elementListeStage.vue'
import { useInternshipRequests } from '../composables/demandes_stages/demandeDeStage.js'
import { useCandidat } from '../composables/candidats/candidat.js'
import { useProvinces } from '../composables/provinces/provinces.js'
import { useInternshipTypes } from '@/composables/types_stage/types_stage.js'
import { ref, onMounted } from 'vue';

const { getAllRequests, editRequest } = useInternshipRequests();
const { getAllCandidats } = useCandidat();
const { getAllProvinces } = useProvinces();
const { getAllInternshipTypes } = useInternshipTypes();

const toutesDemandes = ref([]);

onMounted(async () => {
    try {
        const response = await getAllRequests();
        toutesDemandes.value = response.data;
        console.log("toutesDemandes: ", toutesDemandes);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
});


const demandeDeStageAAjouter = {
  title: "Designer web",
  description: "Bonjour je suis un desinger web à la recherche de travail!",
  candidate: {
    _id: "",
    description: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    city: "",
    skills: [
      ""
    ],
    province: {
      _id: "",
      value: ""
    },
    postalCode: ""
  },
  startDate: "2024-03-19T17:36:02.007Z",
  endDate: "2024-03-19T17:36:02.007Z",
  weeklyWorkHours: 40,
  province: {
    _id: "",
    value: ""
  },
  skills: [
    "Front-end",
    "Design"
  ],
  internshipType: {
    _id: "",
    value: ""
  },
  additionalInformation: "J'aime le Ping-Pong",
  isActive: true
}

const testAPI = async () => {

    // Ici je vais chercher des objets dans la BD afin de construire
    // mon objet demandeDeStageAAjouter, je vais chercher toutes les objets
    // et je prend le premier simplement dans le but de faire des tests et de
    // valider si le call à l'API fonctionne.

    // je vais chercher le premier candidat et je l'assigne dans le 
    // candidat de ma demandeDeStageAAjouter
    const candidats = await getAllCandidats();
    demandeDeStageAAjouter.candidate = candidats.data[0];
    
    // je vais chercher la première province et je l'assigne dans la 
    // province de ma demandeDeStageAAjouter
    const provinces = await getAllProvinces();
    demandeDeStageAAjouter.province = provinces.data[0];
    
    // je vais chercher le premier type de stage et je l'assigne dans le 
    // type de stage de ma demandeDeStageAAjouter
    const internshipTypes = await getAllInternshipTypes();
    demandeDeStageAAjouter.internshipType = internshipTypes.data[0];
    
    // console.log("demandeDeStageAAjouter: ", demandeDeStageAAjouter);

    // *** IMPORTANT *** enlever les commentaires de la ligne ci-dessous pour ajouter une demande de stage
    // vous pouvez modifier les données de l'objet demandeDeStageAAjouter afin de tester et différencier
    // les différents objets
    // await addRequest(demandeDeStageAAjouter);

    // afin d'afficher dans la console toutes les demandes de stage, incluant celle que l'on vient
    // d'ajouter dans la ligne précédante
    const allRequests = await getAllRequests();

    // *** IMPORTANT *** enlever les commentaires afin de tester l'édition d'une demande de stage
    await editRequest(allRequests.data[0]._id, demandeDeStageAAjouter)

    await getAllRequests();

}

// exécuter la fonction de test des calls API
testAPI();

</script>

<style scoped>

html, body {
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
}

.groupeBtns {
}
</style>