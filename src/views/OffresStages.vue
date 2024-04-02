<template>
    <div class="offrestages-list">
        <h1>Offres de stage</h1>
        <RouterLink to="/offre-de-stage-ajout">
          <button class="bouton bouton--rougeOffre">Ajouter une offre de stage</button>
        </RouterLink>

        <div class="form-fiche__encadre">
          <table class="liste-5-colonnes listeStages">
            <thead class="liste__head">
                <tr class="liste__rangee">
                    <th class="liste__head__titre-colonne liste__head__titre-colonne--1">Poste</th>
                    <th class="liste__head__titre-colonne liste__head__titre-colonne--2">Secteur d'activité</th>
                    <th class="liste__head__titre-colonne liste__head__titre-colonne--3">Région</th>
                    <th class="liste__head__titre-colonne liste__head__titre-colonne--5">Date de publication</th>
                </tr>
            </thead>   
            <tbody class="liste__body">
              <ElementListeStage v-for="offre in toutesOffres"
                :key="offre._id"
                :posteTitre="offre.title"
                :posteNom="offre.enterprise.name" 
                :info2="offre.enterprise.city"
                :region="offre.province.value" 
                :date="offre.startDate" 
                :id="offre._id" 
                :isDemande="false"
                :isTableauDeBord="false"
                :isActive="offre.isActive">
              </ElementListeStage>
            </tbody>         
          </table>
        </div>
    </div>
</template>

<script setup>
  import ElementListeStage from '../components/elementListeStage.vue'
  import { useInternshipOffers } from '../composables/offres_stage/offreDeStage';
  import { useProvinces } from '../composables/provinces/provinces.js'
  import { useInternshipTypes } from '@/composables/types_stage/types_stage.js'
  import { ref, onMounted } from 'vue';
  
  const { getAllOffers } = useInternshipOffers();
  const { getAllProvinces } = useProvinces();
  const { getAllInternshipTypes } = useInternshipTypes();

  const toutesOffres = ref([]);

  onMounted(async () => {
    try {
      toutesOffres.value = await getAllOffers();
        console.log("toutesDemandes: ", toutesOffres);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
  });  

  const offreStageListe = {
    title: "string",
    description: "string",
    enterprise: {
      _id: "string",
      image: "string",
      name: "string",
      address: "string",
      postalCode: "string",
      city: "string",
      province: {
        _id: "string",
        value: "string"
      },
      phone: "string",
      email: "string",
      description: "string",
      activitySector: {
        _id: "string",
        value: "string"
      },
      website: "string"
    },
    startDate: "2024-03-26T01:47:05.088Z",
    endDate: "2024-03-26T01:47:05.088Z",
    weeklyWorkHours: 0,
    salary: 0,
    province: {
      _id: "string",
      value: "string"
    },
    requiredSkills: [
      "string"
    ],
    internshipType: {
      _id: "string",
      value: "string"
    },
    paid: "DISCRETIONARY",
    isActive: true
  }

  const testAPI = async () => {

    const provinces = await getAllProvinces();
    offreStageListe.province = provinces.data[0];

    const internshipTypes = await getAllInternshipTypes();
    offreStageListe.internshipType = internshipTypes.data[0];

    const allOffers = await getAllOffers();

    await getAllOffers();
  }

  testAPI();

</script>
  
  
<style scoped>
</style>